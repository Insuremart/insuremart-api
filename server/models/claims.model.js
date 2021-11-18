const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  purpose: {
    type: String,
  },
});
const dischargeDetailsSchema = new mongoose.Schema({
  payeeName: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  accountName: {
    type: String,
  },
  bankSortCode: {
    type: String,
  },
  bankBranch: {
    type: String,
  },
});
const claimsSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.ObjectId,
      ref: 'MotorPolicy',
    },
    policyHolder: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      Enum: [
        'AWAITING_DOC',
        'REJECTED',
        'AWAITING_OFFER_DECISION',
        'OFFER_REJECTED',
        'OFFER_ACCEPTED',
        'PROCESSING_PAYMENT',
        'SETTLED',
      ],
      default: 'AWAITING_DOC',
    },
    dv: {
      type: String,
    },
    policyNumber: {
      type: String,
    },
    dateOfIncident: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    rejectionReason: {
      type: String,
    },
    receipts: [ImageSchema],
    typeOfLoss: {
      type: String,
    },
    mechanicContactNumber: {
      type: String,
    },
    description: {
      type: String,
    },
    askingRepairAmount: {
      type: String,
    },
    approvedAmount: {
      type: String,
    },
    dischargeDetails: dischargeDetailsSchema
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

module.exports = mongoose.model('claims', claimsSchema);
