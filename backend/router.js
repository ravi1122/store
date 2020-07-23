const middlewares = require("./middleware");

const sessionCtrl = require("./controllers/session");
const bnsCtrl = require("./controllers/browseAndShop");
const userCtrl = require("./controllers/user");

module.exports = function (app) {
  // Sessions
  app.get("/api/autoLogin", middlewares.checkAuth, sessionCtrl.autoLogin);
  app.get("/api/logout", middlewares.checkAuth, sessionCtrl.logout);
  app.post("/api/register", sessionCtrl.register);
  app.post("/api/login", sessionCtrl.login);
  app.post("/api/forgotPassword", sessionCtrl.forgotPassword);

  // BrowseAndShop
  app.get("/api/inventory", bnsCtrl.inventory);
  app.get("/api/productDetails/:sku", bnsCtrl.productDetails);

  // User
  app.post("/api/addToCart", middlewares.checkAuth, userCtrl.addToCart);
  app.post(
    "/api/removeFromCart",
    middlewares.checkAuth,
    userCtrl.removeFromCart
  );
  app.post("/api/addToFavList", middlewares.checkAuth, userCtrl.addToFavList);
  app.post(
    "/api/removeFromFavList",
    middlewares.checkAuth,
    userCtrl.removeFromFavList
  );
  app.get("/api/getCartData", middlewares.checkAuth, userCtrl.getCartData);
  app.put(
    "/api/updateItemQuantity",
    middlewares.checkAuth,
    userCtrl.updateItemQuantity
  );

  app.get("/api/addresses", middlewares.checkAuth, userCtrl.getAddresses);
  app.post("/api/addresses", middlewares.checkAuth, userCtrl.saveAddresses);
  app.put("/api/addresses", middlewares.checkAuth, userCtrl.updateAddresses);
  app.delete(
    "/api/addresses/:addrId",
    middlewares.checkAuth,
    userCtrl.deleteAddress
  );

  app.get("/api/cards", middlewares.checkAuth, userCtrl.getCards);
  app.post("/api/cards", middlewares.checkAuth, userCtrl.saveCards);
  app.put("/api/cards", middlewares.checkAuth, userCtrl.updateCards);
  app.delete("/api/cards/:cardId", middlewares.checkAuth, userCtrl.deleteCards);

  app.post("/api/placeOrder", middlewares.checkAuth, userCtrl.placeOrder);
};
