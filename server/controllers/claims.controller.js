const Claims = require('../models/claims.model');
const MotorPolicy = require('../models/motor_policy.model');
const {
  requestFailed,
  sendSMS,
  pick,
  CustomError,
  response,
  existsOr404,
} = require('../lib/http');
const { fileClaim } = require('../lib/emails');
const moment = require('moment');

exports.createClaim = async (req, res) => {
  const { body, user } = req;
  existsOr404(body, 'Body should not be empty');

  const claim = new Claims(body);
  const motorPolicy = await MotorPolicy.findOne({
    registrationNumber: claim.registrationNumber,
    policyHolder: user,
  }).populate('company');
  existsOr404(
    motorPolicy,
    'Motor policy not found please check registration number'
  );

  claim.asset = motorPolicy;
  claim.policyHolder = user;
  await claim.save();

  fileClaim({ claim, motorPolicy, user });

  return response({
    res,
    message: 'success',
    data: { success: true, claim: claim._id },
  });
};

exports.getClaims = async (req, res) => {
  const { _id } = req.user;
  existsOr404(_id, 'id is required');

  const data = await Claims.find({ policyHolder: _id });
  return response({ res, message: 'success', data });
};
exports.updateClaim = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  existsOr404(body, 'Body should not be empty');
  existsOr404(id, 'id is required');

  const claims = await Claims.findOne({ _id: id });
  existsOr404(claims, 'claim not found');

  const parts = [
    'dateOfIncident',
    'typeOfLoss',
    'receipts',
    'typeOfLoss',
    'mechanicContactNumber',
    'description',
  ];

  const payload = pick(body, parts);

  const data = await claims.updateOne(payload);
  return response({
    res,
    message: 'success',
    data,
  });
};

exports.updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  existsOr404(id, 'Claim not found');
  existsOr404(status, 'Please attach a status');

  const claims = await Claims.findOne({ _id: id });
  existsOr404(claims, 'Claim not found');

  const parts = [
    'status',
    'dv',
    'approvedAmount',
    'rejectionReason',
    'dischargeDetails',
  ];

  const payload = pick(req.body, parts);
  const data = await claims.updateOne(payload);

  return response({
    res,
    message: 'success',
    data,
  });
};
exports.deleteClaim = async (req, res) => {
  const { id } = req.params;
  existsOr404(id, 'id is required');

  await Claims.deleteOne({ _id: id });
  return response({ res, message: 'success' });
};
