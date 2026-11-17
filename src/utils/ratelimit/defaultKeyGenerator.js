const { ipKeyGenerator } = require("express-rate-limit");

const defaultKeyGenerator = (req) => {
  // identify by authenticated user ID, otherwise IP
  return req.user?.id || ipKeyGenerator(req.ip);
};

module.exports = defaultKeyGenerator;
