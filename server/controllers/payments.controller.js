const Payments = require('../models/payments.model');
const { requestSuccessful, requestFailed } = require('../lib/http');
const User = require('../models/user.model');
const Subscription = require('../models/vehicle_policy_covers.model');
const Plan = require('../models/motor_policy.model');

const recordPayments = async (subscriber, plan, amount, payment) => {
  try {
    const payments = new Payments({
      ...plan,
      plan,
      amount,
      planName: plan.planName,
      ...payment,
      data: payment,
      subscriber,
    });
    payments.save();
    const durationUsedUp = plan.durationUsedUp + 1;
    await Plan.findOneAndUpdate({ _id: plan._id }, { durationUsedUp });

    return payments;
  } catch (error) {
    console.error(error);
    return null;
  }
};
exports.recordPayments = recordPayments;

exports.recordPayment = async (req, res) => {
  const { user: id, plan, payment, durationPaidFor } = req.body;
  try {
    const user = await User.findOne({ id });

    await recordPayments(
      user,
      plan,
      plan.subscriptionAmount * durationPaidFor,
      payment
    );
    const durationCovered = plan.durationCovered + durationPaidFor;
    await Plan.findOneAndUpdate({ _id: plan._id }, { durationCovered });

    let subscription = await Subscription.findOne({
      plan: plan._id,
      active: true,
    });

    if (!subscription) {
      sendMessageToAdmin(
        `A new subscription has started under ${plan._id} plan`
      );

      const durationUsedUp = plan.durationUsedUp + 1;
      await Plan.findOneAndUpdate({ _id: plan._id }, { durationUsedUp });
      subscription = await createSubscription(user, plan);
    }

    requestSuccessful(res, { success: true, subscription });
  } catch (error) {
    requestFailed(res, error);
  }
};
exports.paymentRecords = async (req, res) => {
  const { _id } = req.user;
  const { limit, page } = req.query;
  const skip = parseInt(limit) * parseInt(page);

  try {
    const payments = await Payments.find({ subscriber: _id })
      .populate('subscriber')
      .sort({ createdAt: -1 })
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 30);

    requestSuccessful(res, { payment_history: payments });
  } catch (error) {
    requestFailed(res, error);
  }
};

exports.paystackWebhook = async (req, res) => {
  const event = req.body.event;
  const body = req.body.data;
  return requestSuccessful(res, { success: true }, `Paystack confirm payment!`);
  // if (event == 'charge.success') {
  //   const planName = body['plan']['name'];
  //   const transactionId = body.reference;
  //   const user = await User.findOne({ email: body.customer.email });
  //   if (user) {
  //     try {
  //       const payments = new Payments({
  //         ...body['plan'],
  //         planName,
  //         transactionId,
  //         subscriber: user._id,
  //         data: req.body,
  //       });
  //       payments.save();

  //       return requestSuccessful(
  //         res,
  //         payments,
  //         `payments record saved successful ${body.customer.email} ----  Event ` +
  //           event
  //       );
  //     } catch (error) {
  //       return requestFailed(
  //         res,
  //         'paystackWebhook failure: ' + event + ' --- ' + error,
  //         500
  //       );
  //     }
  //   } else {
  //     return requestSuccessful(
  //       res,
  //       { success: true },
  //       `paystackWebhook Success ->> failure: user not found ${body.customer.email}`
  //     );
  //   }
  // } else {
  //   return requestSuccessful(
  //     res,
  //     { success: true },
  //     `paystack sent some other event ${event}`
  //   );
  // }
};
