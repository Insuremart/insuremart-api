const VehicleExtension = require('../models/vehicle_extensions.model');
const VehiclePolicyCover = require('../models/vehicle_policy_covers.model');
const Error = require('../models/errors.model');
const Claims = require('../models/claims.model');
const Company = require('../models/company.model');
const MotorPolicy = require('../models/motor_policy.model');
const {
  requestFailed,
  sendSMS,
  pick,
  CustomError,
  response,
  existsOr404,
} = require('../lib/http');
const { getDocuments } = require('../lib/model');
const { fileClaim } = require('../lib/emails');

exports.addCompany = async (req, res) => {
  const { body } = req;

  const company = new Company(body);
  await company.save();

  const message = 'Company added successfully';
  return response({
    res,
    message,
    data: { company: company._id },
  });
};
exports.editCompany = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  await Company.updateOne({ _id: id }, payload);

  const message = 'Company updated successfully';
  return response({
    res,
    message,
  });
};
exports.getCompanies = async (req, res) => {
  return getDocuments({
    req,
    res,
    Model: Company,
  });
};
exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  await Company.deleteOne({ _id: id });

  return response({
    res,
    message: 'Company deleted successfully',
  });
};

exports.addExtension = async (req, res) => {
  const { body } = req;
  const vehicleExtension = new VehicleExtension(body);
  await vehicleExtension.save();

  const message = 'Vehicle Extension added successfully';
  return response({
    res,
    message,
    data: { vehicleExtension: vehicleExtension._id },
  });
};
exports.editExtension = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const vehicleExtension = await VehicleExtension.findOne({ _id: id });
  existsOr404(vehicleExtension, 'VehicleExtension not found');

  const data = await vehicleExtension.updateOne(payload);

  const message = 'VehicleExtension updated successfully';
  return response({
    res,
    message,
    data,
  });
};

exports.addPolicyCover = async (req, res) => {
  const { body } = req;

  const vehiclePolicyCover = new VehiclePolicyCover(body);
  await vehiclePolicyCover.save();

  const message = 'VehiclePolicyCover added successfully';
  return response({
    res,
    message,
    data: { vehiclePolicyCover: vehiclePolicyCover._id },
  });
};

exports.editPolicyCover = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const vehiclePolicyCover = await VehiclePolicyCover.findOne({ _id: id });
  existsOr404(vehiclePolicyCover, 'VehiclePolicyCover not found');

  const data = await vehiclePolicyCover.updateOne(payload);

  const message = 'VehiclePolicyCover updated successfully';
  return response({
    res,
    message,
    data,
  });
};
