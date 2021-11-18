const { sendSMS, requestSuccessful, requestFailed } = require('../lib/http');
const moment = require('moment');
const Subscription = require('../models/vehicle_policy_covers.model');
const MotorPolicy = require('../models/motor_policy.model');
const User = require('../models/user.model');

exports.createSubscription = async (user, plan, others) => {
  try {
    await Subscription.findOne({
      subscriber: user._id,
      active: true,
    }).updateOne({ active: false });
    await User.findById(user._id).updateOne({ hasSubscription: true });
    const config = {
      ...others,
      plan: plan._id,
      planName: plan.planName,
      benefits: plan.benefits,
      policyNumber: user.policyNumber,
      cost: plan.subscriptionAmount,
      subscriber: user._id,
      policyNumber: user.policyNumber,
      active: true,
      expiryDate: moment().add(30, 'days').format(),
    };
    const subscription = new Subscription(config);

    subscription.save();

    return subscription;
  } catch (error) {
    return console.error(error);
  }
};
exports.getSubscription = async (req, res) => {
  const { _id } = req.user;
  try {
    const subscription = await Subscription.findOne({
      subscriber: _id,
      active: true,
    });
    const plan = await Plan.findOne({
      subscriber: _id,
      active: true,
    });

    return requestSuccessful(
      res,
      { subscription, plan },
      `called getSubscription: ${_id}`
    );
  } catch (error) {
    return requestFailed(res, 'getSubscription failure: ' + error, 500);
  }
};
exports.cancelSubscription = async (req, res) => {
  const { id } = req.body;
  try {
    const subscription = await Subscription.findById(id).updateOne({
      active: false,
    });

    return requestSuccessful(
      res,
      { ...subscription },
      `user ${_id} has retried subscription plan`
    );
  } catch (error) {
    return requestFailed(res, 'cancelSubscription failure: ' + error, 500);
  }
};

const cancelSubscriptions = async () => {
  const subscription = await Subscription.find({ active: true });
  if (!moment(subscription.expiryDate).isAfter(moment().format())) {
    subscription.updateOne({
      active: false,
    });
  }
};

// functiion to deactivate a plan when theyy expire
// function to alert users of impending plan end
