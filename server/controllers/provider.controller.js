const Payments = require('../models/payments.model');
const Subscription = require('../models/vehicle_policy_covers.model');
const History = require('../models/vehicle_policy_covers.model');
const { requestSuccessful, requestFailed, sendSMS } = require('../lib/http');
const { createSubscription } = require('./subscription.controller');
const User = require('../models/user.model');
const moment = require('moment');

exports.sendOTP = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const otp = Math.floor(Math.random() * 100000).toString();

    // // integrate sms notifications
    sendSMS(user.phone, `Dear ${user.fullname}, your otp is ${otp}`);

    console.log(`Dear ${user.fullname}, your otp is ${otp}`);

    await user.updateOne({ otp });

    return requestSuccessful(
      res,
      { success: true },
      `sendOTP successful: sent ${otp} to ${user.fullname}`
    );
  } catch (error) {
    return requestFailed(res, 'request failure: sendOTP' + error, 500);
  }
};
exports.verifyOTP = async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;

  try {
    const user = await User.findById(id);
    const subscription = await Subscription.findOne({
      subscriber: id,
      active: true,
    });
    let verified = false;

    if (!user.otp) {
      throw new Error('No OTP Was sent');
    }

    if (user.otp != otp) {
      throw new Error('Incorrect OTP');
    }
    verified = true;
    const authorization = {
      isAuthorized: true,
      authorizedProvider: req.user._id,
      authorizedTill: moment().add(1, 'days').format(),
    };
    await user.updateOne({ otp: null, authorization });

    return requestSuccessful(
      res,
      { verified, user, subscription },
      `verifyOTP successful:  ${user.fullname}`
    );
  } catch (error) {
    return requestFailed(res, 'request failure: verifyOTP' + error, 500);
  }
};
exports.reopenSubscriber = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const subscription = await Subscription.findOne({
      subscriber: id,
      active: true,
    });
    let verified = true;

    return requestSuccessful(
      res,
      { verified, user, subscription },
      `reopenSubscriber successful:  ${user.fullname}`
    );
  } catch (error) {
    return requestFailed(res, 'request failure: reopenSubscriber' + error, 500);
  }
};

exports.saveRecords = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { benefits, update, history: sessionHistory } = req.body;

  try {
    const user = await User.findById(id);
    await Subscription.findOne({
      subscriber: id,
      active: true,
    }).updateOne({ benefits });
    sessionHistory.provider = _id;
    sessionHistory.subscriber = id;

    if (update) {
      const history = await History.findById(update).updateOne({
        benefits: sessionHistory.benefits,
      });
    } else {
      const history = await History(sessionHistory);
      history.save();
    }

    return requestSuccessful(
      res,
      { success: true },
      `saveRecords successful:  ${user.fullname}`
    );
  } catch (error) {
    return requestFailed(res, 'saveRecords failure: ' + error, 500);
  }
};
