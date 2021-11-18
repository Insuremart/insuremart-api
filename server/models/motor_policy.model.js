const mongoose = require('mongoose');
const { vehicleExtensionsSchema } = require('./vehicle_extensions.model');
const { vehiclePolicyCoversSchema } = require('./vehicle_policy_covers.model');
const ImagesSchema = new mongoose.Schema({
  vehicleSide: String,
  url: String,
});
const MotorPolicySchema = new mongoose.Schema(
  {
    policyHolder: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    policyCover: {
      type: mongoose.Schema.ObjectId,
      ref: 'VehiclePolicyCover',
    },
    addOn: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'VehicleExtension',
      },
    ],
    basicPremium: {
      type: Number,
      default: 1,
    },
    totalPremium: {
      type: Number,
      default: 1,
    },
    policyPeriod: {
      type: Number,
      default: 1,
    },
    promo: {
      type: Number,
      default: 0,
    },
    policyNumber: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sumInsured: {
      type: String,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
    },
    vehicleMake: {
      type: String,
    },
    insuranceClass: {
      type: String,
    },
    vehicleModel: {
      type: String,
    },
    manufactureYear: {
      type: String,
      required: true,
    },
    colourOfVehicle: {
      type: String,
    },
    valueOfvehicle: {
      type: Number,
    },
    extensions: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    chassisNumber: {
      type: String,
    },
    engineNumber: {
      type: String,
    },
    images: {
      type: [ImagesSchema],
    },
    active: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: String,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      Enum: ['AWAITING_APPROVAL', 'REJECTED', 'ACCEPTED', 'PROCESSING_PAYMENT'],
      default: 'AWAITING_APPROVAL',
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model('MotorPolicy', MotorPolicySchema);
