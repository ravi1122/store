const _size = require("lodash/size");

const jwt = require("../jwt");
const utils = require("../utils");
const reqUtils = require("../requestUtils");

exports.register = (req, res) => {
  const { body } = req;

  if (body.password && body.password === body.confirmPassword) {
    const profile = {
      username: body.username,
      email: body.email,
      userId: utils.uuidv4(),
    };

    utils.readStore((err, store) => {
      if (err) {
        return reqUtils.send500(res);
      }

      const users = store.users || [];
      const existingUser = users.find((u) => u.email && u.email === body.email);

      if (existingUser) {
        return reqUtils.send401(res, "Email is already taken");
      }

      utils.writeToStore(
        {
          ...store,
          users: [...users, { ...profile, password: body.password }],
        },
        (err) => {
          if (err) {
            return reqUtils.send500(res);
          }

          const token = jwt.genToken(profile);

          res.cookie("token", token);

          return reqUtils.send201(
            res,
            "Your profile has been created successfully.",
            profile
          );
        }
      );
    });
  } else {
    return reqUtils.send401(res, "Password and Confirm password should match.");
  }
};

exports.login = (req, res) => {
  const { body } = req;

  if (body.password && body.username) {
    utils.readStore((err, store) => {
      if (err) {
        return reqUtils.send500(res);
      }

      const users = store.users || [];
      const existingUser = users.find(
        (u) => u.username === body.username && u.password === body.password
      );

      if (existingUser) {
        const profile = {
          email: existingUser.email,
          username: existingUser.username,
          userId: existingUser.userId,
        };

        const token = jwt.genToken(profile);

        res.cookie("token", token);

        return reqUtils.send200(
          res,
          "You are logged in successfully.",
          profile
        );
      }

      return reqUtils.send401(res, "Your username and/or password is wrong.");
    });
  } else {
    return reqUtils.send401(res, "Username or Password is missing.");
  }
};

exports.autoLogin = (req, res) => {
  if (req.user) {
    const { query } = req;
    const payload = {
      profile: req.user,
      cartCount: 0,
      myCart: [],
      myCards: [],
      myOrders: [],
      myFavList: [],
      myAddresses: [],
    };

    if (query && query.fetch) {
      const props = query.fetch.split(",");

      if (props.length) {
        utils.getUserMultipleProp(req.user.userId, props, (err, values) => {
          if (err) {
            return reqUtils.send500(res);
          }

          if (props.indexOf("cartCount") > -1) {
            if (props.indexOf("myCart") > -1) {
              values.cartCount = _size(values.myCart);

              return reqUtils.send200(
                res,
                "Auto login success.",
                Object.assign({}, payload, values)
              );
            }

            utils.getUserCart(req.user.userId, (err, myCart) => {
              if (err) {
                return reqUtils.send500(res);
              }

              values.cartCount = _size(myCart);

              return reqUtils.send200(
                res,
                "Auto login success.",
                Object.assign({}, payload, values)
              );
            });
          }

          return reqUtils.send200(
            res,
            "Auto login success.",
            Object.assign({}, payload, values)
          );
        });
      } else {
        return reqUtils.send200(res, "Auto login success.", payload);
      }
    } else {
      return reqUtils.send200(res, "Auto login success.", payload);
    }
  } else {
    return reqUtils.send401(res, "Auto login failed.");
  }
};

exports.forgotPassword = (req, res) => {
  const { body } = req;

  if (body.email) {
    utils.readStore((err, store) => {
      if (err) {
        return reqUtils.send500(res);
      }

      const users = store.users || [];
      const existingUser = users.find((u) => u.email === body.email);

      return reqUtils.send200(
        res,
        "Your temporary profile password is sent to your registered email.",
        existingUser
      );
    });
  } else {
    return reqUtils.send401(res, "Username is missing.");
  }
};

exports.logout = (req, res) => {
  const token = jwt.genExpiredToken(req.user || {});

  res.cookie("token", token);

  return reqUtils.send200(res, "You are logged out successfully.");
};
