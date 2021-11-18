const request = require('request');
const axios = require('axios'); 
let telegram_url =process.env.telegram_url;


const error = 'An error occured';

const response = ({ res, code = 200, message = error, data, errors }) =>
  res.status(code).json({ message, data, errors });

class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
 
exports.CustomError = CustomError
exports.response = response
exports.existsOr404 = (data, message) => {
  if (!data) {
    throw new CustomError(message, 404);
  }
};
exports.pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
const sendMessageToAdmin = function (reply) {
  axios
    .post(telegram_url, {
      chat_id: '1188752469',
      text: `Insuremart - ${reply}`,
    })
    .then((response) => {
      console.log('Message posted');
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.sendMessageToAdmin = sendMessageToAdmin;

exports.resolve = action => async (req, res) => {
  try {
    return await action(req, res);
  } catch ({ message, code }) {
    return response({
      res,
      code: code && code >= 400 && code < 600 ? code : 500,
      error: message
    });
  }
};