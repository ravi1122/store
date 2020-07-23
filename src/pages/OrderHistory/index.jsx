import React from "react";
import _get from "lodash/get";
import _range from "lodash/range";
import _sampleSize from "lodash/sampleSize";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cx from "classnames";

import Placeholder from "../../components/Svgs/Placeholder";
import Colors from "../../components/Colors";
import Prices from "../../components/Prices";
import AddToFavList from "../../components/AddToFavList";

import { formatCurrency } from "../../utils";

function OrderHistoryPage(props) {
  const { myOrders } = props;

  return (
    <div className="cart-page row mb-4">
      <div className="col-10 offset-1">
        <div className="card">
          <div className="card-header">Order History</div>
          <ul
            className="list-group list-group-flush"
            style={{ listStyle: "none" }}
          >
            {[...myOrders].reverse().map((order) => {
              const itemCount = order.items.length;
              const addr = order.deliveryAddress;
              const payment = order.paymentMethod;
              let total = 0;
              for (let i = 0; i < itemCount; i++) {
                total += order.items[i].salePrice * order.items[i].quantity;
              }

              return (
                <li>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title d-flex justify-content-between">
                        <div className="order-id">
                          Order ID: {order.orderId}
                        </div>
                        <div className="order-date">
                          Ordered On: {order.purchasedOn}
                        </div>
                        <div className="delivery-date">
                          Delivered On: {order.deliveredOn}
                        </div>
                      </h6>
                      <ul classsName="list-group list-group-flush">
                        {order.items.map((item, index) => {
                          const color = _sampleSize(item.colors, 1)[0];
                          const { quantity } = item;

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
                                  <Link to={item.landingPageUrl}>
                                    {item.name}
                                  </Link>
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
                                  <AddToFavList
                                    skuId={item.sku}
                                    displayInline
                                  />
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
                        <li className="list-group-item" key={itemCount}>
                          <div className="card mt-2">
                            <div className="card-header d-flex justify-content-between">
                              <span>Delivery Address:</span>

                              <span>{`${addr.inputAddressName}, ${addr.inputAddressLine1}, ${addr.inputCity}, ${addr.inputPostalCode}`}</span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item" key={itemCount}>
                          <div className="card mt-2">
                            <div className="card-header d-flex justify-content-between">
                              <span>Payment Method:</span>
                              <span>
                                {" "}
                                {`${
                                  payment.inputCardHolderName
                                }, XXX*******XX${payment.inputCardNumber.substr(
                                  -4
                                )}`}
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  myOrders: _get(state, "myOrders.data", []),
}))(OrderHistoryPage);
