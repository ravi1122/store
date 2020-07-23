// Settimeout
// Promise
// HTTP status codes
import _map from "lodash/map";

const delay = 2;

export function fetchService(url, opts = {}) {
  const req = {
    method: opts.method || "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  if (opts.data) {
    req.body = JSON.stringify(opts.data);
  }

  if (opts.query) {
    const params = _map(
      Object.keys(opts.query),
      (k) => `${k}=${encodeURIComponent(opts.query[k])}`
    );

    if (params.length) url += `?${params.join("&")}`;
  }

  return fetch(url, req).then((res) => res.json());
}

export function register(profile) {
  return fetchService("/api/register", { method: "POST", data: profile });
}

export function login(profile) {
  return fetchService("/api/login", { method: "POST", data: profile });
}

export function autoLogin(query) {
  return fetchService("/api/autoLogin", { query });
}

export function logout() {
  return fetchService("/api/logout");
}

export function forgotPassword(profile) {
  return fetchService("/api/forgotPassword", { method: "POST", data: profile });
}

export function getSlpData(query) {
  return fetchService("/api/inventory", { query });
}

export function addToCart(product) {
  return fetchService("/api/addToCart", { method: "POST", data: product });
}

export function removeFromCart(product) {
  return fetchService("/api/removeFromCart", { method: "POST", data: product });
}

export function addToFavList(product) {
  return fetchService("/api/addToFavList", { method: "POST", data: product });
}

export function removeFromFavList(product) {
  return fetchService("/api/removeFromFavList", {
    method: "POST",
    data: product,
  });
}

export function getPropductDetails(sku) {
  return fetchService(`/api/productDetails/${sku}`);
}

export function getCartData() {
  return fetchService("/api/getCartData");
}

export function updateItemQuantity({ sku, updatedQty }) {
  return fetchService("/api/updateItemQuantity", {
    method: "PUT",
    data: { sku, updatedQty },
  });
}

export function getAddresses() {
  return fetchService("/api/addresses");
}

export function saveNewAddress(address) {
  return fetchService("/api/addresses", { method: "POST", data: address });
}

export function updateAddress(address) {
  return fetchService("/api/addresses", { method: "PUT", data: address });
}

export function deleteAddress(address) {
  return fetchService(`/api/addresses/${address.key}`, { method: "DELETE" });
}

export function getCards() {
  return fetchService("/api/cards");
}

export function saveNewCard(card) {
  return fetchService("/api/cards", { method: "POST", data: card });
}

export function updateCard(card) {
  return fetchService("/api/cards", { method: "PUT", data: card });
}

export function deleteCard(card) {
  return fetchService(`/api/cards/${card.key}`, { method: "DELETE" });
}

export function onPurchaseOrder(order) {
  return fetchService("/api/placeOrder", { method: "POST", data: order });
}

export function onSelectDelveryAddress(address) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem("deliveryAddress", JSON.stringify(address));

      return resolve({
        status: 200,
        data: address,
      });
    }, delay);
  });
}

export function setPaymentMethod(card) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem("paymentMethod", JSON.stringify(card));

      return resolve({
        status: 200,
        data: card,
      });
    }, delay);
  });
}
