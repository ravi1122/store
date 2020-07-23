import React from "react";
import _get from "lodash/get";
import _range from "lodash/range";
import _last from "lodash/last";
import _size from "lodash/size";
import _map from "lodash/map";
import _sampleSize from "lodash/sampleSize";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cx from "classnames";

import Placeholder from "../../components/Svgs/Placeholder";
import Colors from "../../components/Colors";
import Prices from "../../components/Prices";
import AddToFavList from "../../components/AddToFavList";

import { WEEK_DAYS_SHORT, LIST_OF_MONTHS } from "../../db";

import { formatCurrency, uuidv4 } from "../../utils";

import { onPurchaseOrder } from "../../store/actions";

function formatDateToReadble(d) {
  return `${WEEK_DAYS_SHORT[d.getDay()]} ${
    LIST_OF_MONTHS[d.getDay()].short
  } ${d.getDate()}, ${d.getFullYear()}`;
}

function ConfirmationPage(props) {
  const {
    myOrders,
    cartData,
    cards,
    addresses,
    paymentMethod,
    deliveryAddress,
  } = props;
  const lastOrder = _last(myOrders) || {};
  const { items } = lastOrder;
  const itemCount = _size(items);
  const date = new Date();
  const fromDate = new Date(new Date().setDate(date.getDate() + 2));
  const formDateReadable = formatDateToReadble(fromDate);
  const toDate = new Date(new Date().setDate(date.getDate() + 5));
  const toDateReadable = formatDateToReadble(toDate);

  const selectedCard = cards.find((c) => c.key === paymentMethod);
  const selectedAddress = addresses.find((a) => a.key === deliveryAddress);

  React.useEffect(() => {
    if (selectedCard && selectedAddress) {
      props.onPurchaseOrder({
        orderId: uuidv4(),
        purchasedOn: formatDateToReadble(date),
        deliveredOn: toDateReadable,
        items: cartData,
        paymentMethod: selectedCard,
        deliveryAddress: selectedAddress,
      });
    }
  }, [selectedCard, selectedAddress]);

  let total = 0;
  for (let i = 0; i < itemCount; i++) {
    total += items[i].salePrice * items[i].quantity;
  }

  return (
    <div className="cart-page row mb-4">
      <div className="col-10 offset-1">
        <div className="card">
          <div className="card-header">Order Confirmation</div>
          <ul
            className="list-group list-group-flush"
            style={{ listStyle: "none" }}
          >
            <li className="list-group-item py-4 mx-auto">
              <span className="rounded-pill border border-primary py-3 px-2 bg-info">
                Your order placed successfully. All your {itemCount} items will
                be delivered to <span className="f4">{formDateReadable}</span>{" "}
                address on or before{" "}
                <span className="f4">{toDateReadable}</span> date.
              </span>
            </li>
            <li>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">Order Items</h6>
                  <ul className="list-group list-group-flush">
                    {_map(items, (item, index) => {
                      const color = _sampleSize(item.colors, 1)[0];
                      const { quantity, availableQuantity } = item;

                      return (
                        <li className="list-group-item" key={item.sku}>
                          <div
                            className={cx(
                              "p-2 row d-flex justify-content-between align-items-center"
                            )}
                            key={item.sku}
                          >
                            <div className="col-4 col-sm-4 col-md-2 col-lg-2 col-xl-2">
                              <Link to={item.landingPageUrl}>
                                <Placeholder height="100" />
                              </Link>
                            </div>
                            <div className="col-5 col-sm-5 col-md-3 col-lg-3 col-xl-3">
                              <Link to={item.landingPageUrl}>{item.name}</Link>
                            </div>
                            <div className="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                              <Colors sku={item.sku} colors={[color]} />
                              <span>{color.name}</span>
                            </div>
                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                              <span>{quantity}</span>
                            </div>
                            <div className="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                              <Prices
                                price={item.price}
                                salePrice={item.salePrice}
                                addLineBreak
                              />
                            </div>
                            <div className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2">
                              <AddToFavList skuId={item.sku} displayInline />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                    <li className="list-group-item" key={itemCount}>
                      <div className="card mt-2">
                        <div className="card-header d-flex justify-content-between">
                          <span>Order Total:</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {selectedAddress && (
              <li>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Delivery Address</h6>
                    <p className="card-text">
                      {`${selectedAddress.inputAddressName}, ${selectedAddress.inputAddressLine1}, ${selectedAddress.inputCity}, ${selectedAddress.inputPostalCode}`}
                    </p>
                  </div>
                </div>
              </li>
            )}
            {selectedCard && (
              <li>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Payment Details</h6>
                    <p className="card-text">
                      {`${
                        selectedCard.inputCardHolderName
                      }, XXX*******XX${selectedCard.inputCardNumber.substr(
                        -4
                      )}`}
                    </p>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    cards: _get(state, "myCards.data", []),
    cartData: _get(state, "cartData.data", []),
    myOrders: _get(state, "myOrders.data", []),
    addresses: _get(state, "myAddresses.data", []),
    paymentMethod: _get(state, "myCards.paymentMethod.key"),
    deliveryAddress: _get(state, "myAddresses.deliveryAddress.key"),
  }),
  { onPurchaseOrder }
)(ConfirmationPage);
