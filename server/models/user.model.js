const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      required: 'Please enter phone number',
    },
    groupLeader: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    plan: {
      type: mongoose.Schema.ObjectId,
      ref: 'Plan',
    },
    subscription: {
      type: mongoose.Schema.ObjectId,
      ref: 'Subscription',
    },
    profile_url: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: 'Please enter email',
    },
    bio: {
      type: String,
      default: '',
    },
    userType: {
      type: String,
      enum: ['SUBSCRIBER', 'PROVIDER', 'ADMIN'],
      default: 'SUBSCRIBER'
    },
    password: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    idCard: {
      type: String,
      default: '',
    },
    utilityBill: {
      type: String,
      default: '',
    },
    hasSubscription: {
      type: Boolean,
      default: false,
    },
    ip: {
      type: String,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    channel: {
      type: String,
      default: '',
    },
    otp: {
      type: String,
      default: null,
    },
    authorization: {
      isAuthorized: {
        type: Boolean,
        default: false,
      },
      authorizedProvider: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      authorizedTill: String,
    },
    is_bot: {
      type: String,
      default: '',
    },
    language_code: {
      type: String,
      default: '',
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
 
module.exports = mongoose.model('User', UserSchema);
