const { requestSuccessful, requestFailed } = require('../lib/http');
const moment = require('moment');
const { one, eight } = require('../lib/plans');
const agenda = require('../agenda');
const Subscription = require('../models/vehicle_policy_covers.model');

exports.createMotorPolicy = async (req, res) => {
  const { body, user } = req;
  existsOr404(body, 'Body should not be empty');

  const claim = new Claims(body);
  const motorPolicy = await MotorPolicy.findOne({
    registrationNumber: claim.registrationNumber,
    policyHolder: user,
  });
  claim.asset = motorPolicy;
  claim.policyHolder = user;
  claim.save();

  return response({
    res,
    message: 'success',
    data: { success: true, claim: claim._id },
  });
};

