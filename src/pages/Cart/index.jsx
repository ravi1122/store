import React, { Component } from "react";
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

import { removeFromCart } from "../../store/actions";
import { getCartData, updateItemQuantity } from "./actions";

import { formatCurrency } from "../../utils";

class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeQtyMenu: null,
    };
  }

  componentDidMount() {
    this.props.getCartData();
  }

  removeFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sku = e.currentTarget.getAttribute("data-sku");
    this.props.removeFromCart({ sku }).then(this.props.getCartData);
  };

  onMouseEnterQty = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sku = e.currentTarget.getAttribute("data-sku");

    this.setState({ activeQtyMenu: sku });
  };

  onMouseLeaveQty = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ activeQtyMenu: null });
  };

  onUpdateQantity = (e) => {
    const updatedQty = Number(e.currentTarget.getAttribute("data-qty"));
    const sku = e.currentTarget.getAttribute("data-sku");

    this.setState({ activeQtyMenu: null }, () => {
      this.props.updateItemQuantity({ sku, updatedQty });
    });
  };

  render() {
    const { cartData } = this.props;
    const itemCount = cartData.length;
    const { activeQtyMenu } = this.state;

    if (itemCount === 0) {
      return (
        <div className="cart-page row mb-4">
          <div className="col-10 offset-1">
            <div className="card">
              <div className="card-header text-center">
                You cart is empty.
                <br />
                <Link to="/">Click to continue shoping.</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const total = cartData.reduce((acc, current) => {
      acc += current.salePrice * current.quantity;

      return acc;
    }, 0.0);

    return (
      <div className="cart-page row mb-4">
        <div className="col-10 offset-1">
          <div className="card">
            <div className="card-header">Cart Items</div>
            <div className="cart-item-container">
              {cartData.map((item, index) => {
                const color = _sampleSize(item.colors, 1)[0];
                const { quantity, availableQuantity } = item;

                return (
                  <div
                    className={cx(
                      "p-2 row d-flex justify-content-between align-items-center border-secondary",
                      { "border-bottom": itemCount !== index + 1 }
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
                      <div
                        className="dropdown"
                        data-sku={item.sku}
                        onMouseEnter={this.onMouseEnterQty}
                        onMouseLeave={this.onMouseLeaveQty}
                      >
                        <button
                          className={cx("btn btn-secondary dropdown-toggle", {
                            show: activeQtyMenu === item.sku,
                          })}
                          type="button"
                        >
                          {quantity}
                        </button>
                        <div
                          className={cx("dropdown-menu", {
                            show: activeQtyMenu === item.sku,
                          })}
                          aria-labelledby="dropdownMenuButton"
                        >
                          {_range(1, availableQuantity + 1, 1).map(
                            (menuItem, index) => (
                              <span
                                className="dropdown-item"
                                key={index}
                                data-qty={menuItem}
                                data-sku={item.sku}
                                onClick={this.onUpdateQantity}
                              >
                                {menuItem}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                      <Prices
                        price={item.price}
                        salePrice={item.salePrice}
                        addLineBreak
                      />
                    </div>
                    <div className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2">
                      <span
                        onClick={this.removeFromCart}
                        data-sku={item.sku}
                        className="btn btn-primary mx-2"
                      >
                        Remove
                      </span>
                      &nbsp;
                      <AddToFavList skuId={item.sku} displayInline />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card mt-2">
            <div className="card-header d-flex justify-content-between">
              <span>Cart Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="col-1 offset-10 mt-2">
          <Link className="btn btn-primary" to="/delivery">
            Continue
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cart: _get(state, "cart.data", []),
    cartData: _get(state, "cartData.data"),
  }),
  {
    removeFromCart,
    getCartData,
    updateItemQuantity,
  }
)(CartPage);
