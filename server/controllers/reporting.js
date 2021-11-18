const Error = require('../models/errors.model');
const Interaction = require('../models/interactions.model');
const codeBits = require('../lib/http');

exports.errorLogging = async (req, res) => {
  const error = await Error(req.body);
  error.save();

  codeBits.sendMessageToAdmin('System Error Logged: ' + req.body.message);
  return res.status(200).send({ success: true });
};

exports.interaction = async (req, res) => {
  const interaction = await Interaction(req.body);
  interaction.save();

  codeBits.sendMessageToAdmin('User Logged An Interaction ' + req.body.action);
  return res.status(200).send({ success: true });
};
