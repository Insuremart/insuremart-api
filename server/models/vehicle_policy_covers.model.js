const mongoose = require('mongoose');

const vehiclePolicyCoversSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [ true, 'please add name']
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: [ true, 'please add company']
    },
    active: {
      type: Boolean,
      default: true,
    },
    offers: {
      private: {
        type: Number,
      },
      commercial: {
        type: Number,
      },
      motorcycle: {
        type: Number,
      },
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

exports.vehiclePolicyCovers = mongoose.model(
  'VehiclePolicyCover',
  vehiclePolicyCoversSchema
);
