const jwt = require('jsonwebtoken');
const { response } = require('../lib/http');
exports.validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = { expiresIn: '30d', issuer: 'aramidev' };
    const secret = 'oluwafemi-olasubomi';
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, secret, options);

      req.user = result._doc || result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (error) {
      // Throw an error just in case anything goes wrong with verification
      return response({ res, message: `${error}`, code: 401 });
    }
  } else {
    return response({
      res,
      message: `Authentication error. Token required.`,
      code: 500,
    });
  }
};
exports.validateAdmin = (req, res, next) => {
  const { userType } = req.user;

  if (userType !== 'ADMIN')
    return response({
      res,
      message: `Authentication error. Token required.`,
      code: 500,
    });

  next();
};
