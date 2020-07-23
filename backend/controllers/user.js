const _compact = require("lodash/compact");
const _map = require("lodash/map");

const utils = require("../utils");
const reqUtils = require("../requestUtils");

const debug = utils.debug("userCtrl");

exports.addToCart = function (req, res) {
  const { body, user } = req;

  if (user && body) {
    utils.addToCart(user.userId, body, (err, myCart) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(
          res,
          "Item successfully added to cart.",
          myCart
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.removeFromCart = function (req, res) {
  const { body, user } = req;

  if (user && body) {
    utils.removeFromCart(user.userId, body, (err, myCart) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(
          res,
          "Item successfully removed from cart.",
          myCart
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.addToFavList = function (req, res) {
  const { body, user } = req;

  if (user && body) {
    utils.addToFavList(user.userId, body, (err, myFavList) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(
          res,
          "Item successfully added to favorite list.",
          myFavList
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.removeFromFavList = function (req, res) {
  const { body, user } = req;

  if (user && body) {
    utils.removeFromFavList(user.userId, body, (err, myFavList) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(
          res,
          "Item successfully removed from favorite list.",
          myFavList
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.getCartData = function (req, res) {
  const { user } = req;

  if (user) {
    utils.getUserCart(user.userId, (err, myCart, store) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        const products = store.products;
        const _myCart = myCart.map((item) => {
          const product = products.find((p) => p.sku === item.sku);

          if (product) {
            return {
              ...product,
              quantity: item.quantity,
              availableQuantity: product.quantity,
            };
          }
        });

        return reqUtils.send200(res, "User cart.", _compact(_myCart));
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.getAddresses = function (req, res) {
  const { user } = req;

  if (user) {
    utils.getUserAddresses(user.userId, (err, myAddresses) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(res, "User addresses.", myAddresses);
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.saveAddresses = function (req, res) {
  const { user, body } = req;

  if (user && body) {
    body.key = utils.uuidv4();

    utils.saveUserAddresses(user.userId, body, (err, myAddresses) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(
          res,
          "Address saved successfully.",
          myAddresses
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.updateAddresses = function (req, res) {
  const { user, body } = req;

  if (user && body) {
    utils.updateUserAddresses(user.userId, body, (err, myAddresses) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(
          res,
          "Address updated successfully.",
          myAddresses
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.deleteAddress = function (req, res) {
  const { user, params } = req;

  if (user && params) {
    utils.deleteUserAddresses(
      user.userId,
      { key: params.addrId },
      (err, myAddresses) => {
        if (err) {
          debug(err);

          return reqUtils.send500(res);
        } else {
          return reqUtils.send200(
            res,
            "Address deleted successfully.",
            myAddresses
          );
        }
      }
    );
  } else {
    return reqUtils.send500(res);
  }
};

exports.getCards = function (req, res) {
  const { user } = req;

  if (user) {
    utils.getUserCards(user.userId, (err, myCards) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(res, "User cards.", myCards);
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.saveCards = function (req, res) {
  const { user, body } = req;

  if (user && body) {
    body.key = utils.uuidv4();

    utils.saveUserCards(user.userId, body, (err, myCards) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(res, "Card saved successfully.", myCards);
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.updateCards = function (req, res) {
  const { user, body } = req;

  if (user && body) {
    utils.updateUserCards(user.userId, body, (err, myCards) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(res, "Card saved successfully.", myCards);
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.deleteCards = function (req, res) {
  const { user, params } = req;

  if (user && params) {
    utils.deleteUserCards(
      user.userId,
      { key: params.cardId },
      (err, myCards) => {
        if (err) {
          debug(err);

          return reqUtils.send500(res);
        } else {
          return reqUtils.send200(res, "Card saved successfully.", myCards);
        }
      }
    );
  } else {
    return reqUtils.send500(res);
  }
};

exports.placeOrder = function (req, res) {
  const { user, body } = req;

  if (user && body) {
    body.key = utils.uuidv4();

    utils.placeOrder(user.userId, body, (err, myOrders) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        return reqUtils.send200(res, "Order placed successfully.", myOrders);
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};

exports.updateItemQuantity = function (req, res) {
  const { user, body } = req;

  if (user && body) {
    utils.getUserCart(user.userId, (err, myCart, store) => {
      if (err) {
        debug(err);

        return reqUtils.send500(res);
      } else {
        const newMyCart = [];
        const cartData = _map(myCart, (product) => {
          const _product = store.products.find(
            (item) => item.sku === product.sku
          );

          if (body.sku === product.sku) {
            newMyCart.push({
              sku: body.sku,
              quantity: body.updatedQty,
            });

            return {
              ..._product,
              availableQuantity: _product.quantity,
              quantity: body.updatedQty,
            };
          }

          newMyCart.push(product);

          return {
            ..._product,
            availableQuantity: _product.quantity,
            quantity: product.quantity,
          };
        });

        return utils.setUserProp(
          user.userId,
          store,
          "carts",
          newMyCart,
          (err) => {
            if (err) {
              debug(err);

              return reqUtils.send500(res);
            }

            return reqUtils.send200(
              res,
              "Item quantity updated successfully.",
              cartData
            );
          }
        );
      }
    });
  } else {
    return reqUtils.send500(res);
  }
};
