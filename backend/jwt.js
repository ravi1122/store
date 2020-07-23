const jwt = require("jsonwebtoken");
const config = require("./config");

exports.genToken = function (profile) {
  return jwt.sign(profile, config.JWT_SECRET, {
    expiresIn: "1d",
    noTimestamp: true,
  });
};

exports.genExpiredToken = function (profile) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) - 60 * 60,
      data: profile,
    },
    config.JWT_SECRET,
    { noTimestamp: true }
  );
};
