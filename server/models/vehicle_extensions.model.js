const mongoose = require('mongoose');

const vehicleExtensionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [ true, 'please add name']
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: [ true, 'please add company id']
    },
    rate: {
       type: Number,
    },
    cost: {
       type: Number
    },    
    active: {
      type: Boolean,
      default: true,
    },
    offeredByInsuranceCompany: {
      type: Boolean
    },
    hasFixedAmount: {
      type: Boolean
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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

exports.vehicleExtensions = mongoose.model("VehicleExtension", vehicleExtensionsSchema); 