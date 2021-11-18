const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  planName:{
    type: String, 
    required: 'Please enter plan name', 
  },
  transaction:{
    type: String, 
    required: 'Please enter transaction id', 
  },
  reference:{
    type: mongoose.Schema.Types.Mixed,
  },
  planCode:{
    type: String, 
  },
  amount: {
    type: Number,
    default: 0
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: 'Plan',
  },
  pending: {
    type: Boolean,
    default: false
  },
  isManual: {
    type: Boolean,
    default: false
  },
  gateway_response: {
    type: String
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
},  {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

module.exports = mongoose.model('Payment', subscriptionSchema);
