import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _get from "lodash/get";

import Placeholder from "../Svgs/Placeholder";
import Colors from "../Colors";
import Sizes from "../Sizes";
import Prices from "../Prices";
import AddToFavList from "../AddToFavList";

import { addToCart, removeFromCart } from "../../store/actions";

class ProductCard extends Component {
  addToCart = (event) => {
    event.preventDefault();

    if (this.props.isLoggedIn) {
      this.props.addToCart({
        sku: event.currentTarget.getAttribute("data-sku"),
        quantity: 1,
      });
    } else {
      const { pathname, search } = this.props.location;

      this.props.history.push({
        pathname: "/login",
        state: { pathname, search },
      });
    }
  };

  removeFromCart = (event) => {
    event.preventDefault();

    this.props.removeFromCart({
      sku: event.currentTarget.getAttribute("data-sku"),
    });
  };

  render() {
    const { product, isInCart } = this.props;

    return (
      <div className="card product-card text-center p-1 m-1">
        <AddToFavList skuId={product.sku} />
        <div className="overflow-hidden">
          <div className="card-image-top">
            <Placeholder text={product.name} textFontSize="2rem" />
          </div>
        </div>
        <div className="card-body text-dark text-left">
          <h5 className="card-title">{product.name}</h5>
          <div className="row">
            <div className="d-inline-block ml-3">Colors: </div>
            <Colors colors={product.colors} />
          </div>
          <div className="row">
            <div className="d-inline-block ml-3">Sizes: </div>
            <Sizes sizes={product.sizes} />
          </div>
          <div className="row">
            <Prices price={product.price} salePrice={product.salePrice} />
          </div>
          <p className="card-text">{product.description}</p>
          <div className="row actions justify-content-between">
            <button
              onClick={this.addToCart}
              data-sku={product.sku}
              className="btn btn-primary col-5 mx-1"
            >
              Add To Cart
            </button>
            {isInCart && (
              <button
                onClick={this.removeFromCart}
                data-sku={product.sku}
                className="btn btn-primary col-5 mx-1"
              >
                Remove From Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ isLoggedIn: _get(state.user, "isLoggedIn", false) }),
  { addToCart, removeFromCart }
)(withRouter(ProductCard));
