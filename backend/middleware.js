const jwt = require("jsonwebtoken");
const config = require("./config");

// Middleware for auth - gatekeeper for anonymous user
function checkAuth(req, res, next) {
  const { cookies } = req;

  jwt.verify(cookies.token, config.JWT_SECRET, (err, profile) => {
    if (err) {
      return res.send({ status: 401, message: "Invalid Token" });
    }

    req.user = profile;

    next();
  });
}

module.exports = {
  checkAuth,
};
