import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _get from "lodash/get";
import _range from "lodash/range";
import _isEmpty from "lodash/isEmpty";

import Sizes from "../../components/Sizes";
import Colors from "../../components/Colors";
import Prices from "../../components/Prices";
import AddToFavList from "../../components/AddToFavList";
import Placeholder from "../../components/Svgs/Placeholder";

import { getPropductDetails } from "./actions";

import { addToCart, removeFromCart } from "../../store/actions";

class PDP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isQtyOpen: false,
      selectedQty: 1,
      selectedSku: null,
    };
  }
  componentDidMount() {
    const skuId = _get(this.props, "match.params.skuId");

    if (skuId) this.props.getPropductDetails(skuId);
  }

  addToCart = (event) => {
    event.preventDefault();

    const { selectedQty } = this.state;

    this.props.addToCart({
      sku: event.currentTarget.getAttribute("data-sku"),
      quantity: selectedQty,
    });
  };

  removeFromCart = (event) => {
    event.preventDefault();

    this.props.removeFromCart({
      sku: event.currentTarget.getAttribute("data-sku"),
    });
  };

  toggleQuantityDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({ isQtyOpen: !pS.isQtyOpen }));
  };

  onChangeQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedQty = Number(e.currentTarget.getAttribute("data-qty"));

    this.setState({
      isQtyOpen: false,
      selectedQty,
    });
  };

  onChangeSku = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedSku = Number(e.currentTarget.getAttribute("data-sku"));

    this.setState({
      selectedSku,
    });
  };

  render() {
    const { product, cart } = this.props;

    if (_isEmpty(product)) return null;

    const { isQtyOpen, selectedQty } = this.state;
    const isInCart = !!cart.find(({ sku }) => sku === product.sku);

    return (
      <div className="pdp-page">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="row" style={{ height: "20rem" }}>
              <div className="col-2"></div>
              <div className="col-10">
                <Placeholder
                  width="200"
                  height="300"
                  text={product.name}
                  textFontSize="2rem"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="row mt-2 ml-2">
              <h3>{product.name}</h3>
            </div>
            <div className="row mt-2  ml-2">
              <div className="d-inline-block ml-3">Colors: </div>
              <Colors
                colors={product.colors}
                onClick={this.onChangeSku}
                sku={product.sku}
              />
            </div>
            <div className="row mt-2">
              <div className="d-inline-block ml-3">Sizes: </div>
              <Sizes
                sizes={product.sizes}
                onClick={this.onChangeSku}
                sku={product.sku}
              />
            </div>
            <div className="row mt-2">
              <Prices price={product.price} salePrice={product.salePrice} />
            </div>
            <div className="row mt-2">
              <div>Quantity:</div>
              <div className={cx("dropdown", { show: isQtyOpen })}>
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  onClick={this.toggleQuantityDropdown}
                >
                  {selectedQty}
                </button>
                <ul
                  className={cx("dropdown-menu quantity", { show: isQtyOpen })}
                >
                  {_range(1, product.quantity + 1, 1).map((i) => (
                    <li
                      className="dropdown-item"
                      key={i}
                      data-qty={i}
                      onClick={this.onChangeQuantity}
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row actions">
              <div className="col-12 mt-2">
                <div className="row">
                  <AddToFavList skuId={product.sku} />
                  &nbsp;
                  <span>Add to Favorite</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <button
                  onClick={this.addToCart}
                  data-sku={product.sku}
                  className="btn btn-primary offset-1 col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5"
                >
                  Add To Cart
                </button>
              </div>

              {isInCart && (
                <div className="col-12 mt-2">
                  <button
                    onClick={this.removeFromCart}
                    data-sku={product.sku}
                    className="btn btn-primary offset-1 col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5"
                  >
                    Remove From Cart
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 p-4">
            <span className="card-text">{product.description}</span>&nbsp;
            <span className="card-text">{product.description}</span>&nbsp;
            <span className="card-text">{product.description}</span>&nbsp;
            <span className="card-text">{product.description}</span>&nbsp;
            <span className="card-text">{product.description}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ product: state.pdp.data, cart: state.cart.data }),
  {
    getPropductDetails,
    addToCart,
    removeFromCart,
  }
)(PDP);
