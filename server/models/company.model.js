const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [ true, 'please add company name']
    },
    logo: {
      type: String,
      required: [ true, 'please add company logo']
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    priority_email: {
      type: String,
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

module.exports = mongoose.model('Company', CompanySchema);
