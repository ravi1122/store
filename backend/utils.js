const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const utils = {
  debug: (file) => (...a) => console.log(`${file} :- `, ...a),
  userPropsMap: {
    myCart: "carts",
    myCards: "cards",
    myOrders: "orders",
    myFavList: "favLists",
    myAddresses: "addresses",
  },
};

const debug = utils.debug("utils");

utils.uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

/**
 * store={
 *  products: [],
 *  users: [{username, email, password, userId }],
 *  carts: {
 *    <userId>: [items]
 *  },
 *  orders: {
 *    <userId>: [items]
 *  },
 *  favLists: {
 *    <userId>: [items]
 *  },
 *  addresses: {
 *    <userId>: [items]
 *  },
 *  cards: {
 *    <userId>: [items]
 *  },
 *
 * }
 */
const dbPath = path.join(__dirname, "db.json");

// Base utils
utils.readStore = (cb) => {
  return fs.readFile(dbPath, (err, data) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    try {
      data = JSON.parse(data);

      return cb(null, data);
    } catch (err) {
      debug(err);
      return cb(err);
    }
  });
};
utils.writeToStore = (data, cb) => {
  return fs.writeFile(dbPath, JSON.stringify(data), cb);
};

// Read utils // getters
utils.getUserProp = (userId, prop, cb) => {
  return utils.readStore((err, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const userProp = _.get(store, [prop, userId], []);

    return cb(null, userProp, store);
  });
};
utils.getUserMultipleProp = (userId, props, cb) => {
  return utils.readStore((err, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const userProps = {};
    for (let i = 0; i < props.length; i++) {
      const storeProp = utils.userPropsMap[props[i]];

      if (storeProp) {
        userProps[props[i]] = _.get(store, [storeProp, userId], []);
      } else {
        userProps[props[i]] = [];
      }
    }

    return cb(null, userProps, store);
  });
};

utils.getUserCart = (userId, cb) => {
  return utils.getUserProp(userId, "carts", cb);
};

utils.getUserFavList = (userId, cb) => {
  return utils.getUserProp(userId, "favLists", cb);
};

utils.getUserAddresses = (userId, cb) => {
  return utils.getUserProp(userId, "addresses", cb);
};

utils.getUserCards = (userId, cb) => {
  return utils.getUserProp(userId, "cards", cb);
};

utils.getUserOrders = (userId, cb) => {
  return utils.getUserProp(userId, "orders", cb);
};

// Write utils
utils.setUserProp = (userId, store, prop, value, cb) => {
  try {
    const newStore = _.set(store, [prop, userId], value);

    return utils.writeToStore(newStore, (err) => {
      if (err) {
        debug(err);
        return cb(err);
      }

      return cb(null, value);
    });
  } catch (err) {
    debug(err);
    return cb(err);
  }
};

utils.addToCart = (userId, item, cb) => {
  return utils.getUserCart(userId, (err, cart, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const myCart = [...cart];
    let found = false;

    for (let i = 0; i < myCart.length; i++) {
      if (myCart[i].sku === item.sku) {
        const _qty = myCart[i].quantity + (item.quantity || 1);

        myCart[i].quantity = _qty;

        found = true;
        break;
      }
    }

    if (!found) {
      myCart.push(item);
    }

    return utils.setUserProp(userId, store, "carts", myCart, cb);
  });
};

utils.removeFromCart = (userId, item, cb) => {
  return utils.getUserCart(userId, (err, cart, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const myCart = [];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].sku !== item.sku) {
        myCart.push(cart[i]);
      }
    }

    return utils.setUserProp(userId, store, "carts", myCart, cb);
  });
};

utils.addToFavList = (userId, item, cb) => {
  return utils.getUserFavList(userId, (err, favList, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const myFavList = [...favList, item.sku];

    return utils.setUserProp(userId, store, "favLists", myFavList, cb);
  });
};

utils.removeFromFavList = (userId, item, cb) => {
  return utils.getUserFavList(userId, (err, favList, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const myFavList = [];
    for (let i = 0; i < favList.length; i++) {
      if (favList[i] !== item.sku) {
        myFavList.push(favList[i]);
      }
    }

    return utils.setUserProp(userId, store, "favLists", myFavList, cb);
  });
};

utils.saveUserAddresses = (userId, address, cb) => {
  return utils.getUserAddresses(userId, (err, myAddr, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    let myAddresses = [...myAddr];
    if (address.gridCheckDefault) {
      myAddresses = myAddr.map((addr) => ({
        ...addr,
        gridCheckDefault: false,
      }));
    }

    myAddresses.push(address);

    return utils.setUserProp(userId, store, "addresses", myAddresses, cb);
  });
};

utils.updateUserAddresses = (userId, address, cb) => {
  return utils.getUserAddresses(userId, (err, myAddr, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const myAddresses = myAddr.map((oldAddr) => {
      if (oldAddr.key === address.key) {
        return Object.assign(oldAddr, address);
      }

      return {
        ...oldAddr,
        gridCheckDefault: address.gridCheckDefault
          ? false
          : oldAddr.gridCheckDefault,
      };
    });

    return utils.setUserProp(userId, store, "addresses", myAddresses, cb);
  });
};

utils.deleteUserAddresses = (userId, address, cb) => {
  return utils.getUserAddresses(userId, (err, myAddress, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const newAddrs = myAddress.filter((oldAddr) => {
      return oldAddr.key !== address.key;
    });

    return utils.setUserProp(userId, store, "addresses", newAddrs, cb);
  });
};

utils.saveUserCards = (userId, card, cb) => {
  return utils.getUserCards(userId, (err, myCards, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    let newMyCards = [...myCards];
    if (card.inputSaveCard) {
      newMyCards = newMyCards.map((addr) => ({
        ...addr,
        inputSaveCard: false,
      }));
    }

    newMyCards.push(card);

    return utils.setUserProp(userId, store, "cards", newMyCards, cb);
  });
};

utils.updateUserCards = (userId, card, cb) => {
  return utils.getUserCards(userId, (err, myCards, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const newMyCards = myCards.map((oldCard) => {
      if (oldCard.key === card.key) {
        return Object.assign({}, oldCard, card);
      }

      return oldCard;
    });

    return utils.setUserProp(userId, store, "cards", newMyCards, cb);
  });
};

utils.deleteUserCards = (userId, card, cb) => {
  return utils.getUserCards(userId, (err, myCards, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const newCards = myCards.filter((oldCard) => {
      return oldCard.key !== card.key;
    });

    return utils.setUserProp(userId, store, "cards", newCards, cb);
  });
};

utils.placeOrder = (userId, order, cb) => {
  return utils.getUserOrders(userId, (err, myOrders, store) => {
    if (err) {
      debug(err);
      return cb(err);
    }

    const newOrders = [...myOrders, order];

    return utils.setUserProp(userId, store, "orders", newOrders, (err) => {
      if (err) {
        debug(err);
        return cb(err);
      }

      return utils.setUserProp(userId, store, "carts", [], (err) => {
        return cb(err, newOrders);
      });
    });
  });
};

module.exports = utils;
