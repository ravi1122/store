import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cx from "classnames";
import _get from "lodash/get";
import _map from "lodash/map";
import _remove from "lodash/remove";
import _isEqual from "lodash/isEqual";
import _unionBy from "lodash/unionBy";
import _intersection from "lodash/intersection";

import {
  getProducts,
  onChangeSortingOrder,
  onChangeProdFilter,
} from "../../store/actions";

import FilterCard from "../../components/FilterCard";
import ProductCard from "../../components/ProductCard";
import Carousel from "../../components/Carousel";

import { getSorted } from "../../utils";

import { SIZES, COLORS } from "../../db";
import { SORT_ORDERS } from "../../config";

const slides = [
  {
    image: "https://source.unsplash.com/1600x900/?product",
    label: "Slide 1",
    description: "Slide 1 description",
  },
  {
    image: "https://source.unsplash.com/1080x800/?product",
    label: "Slide 2",
    description: "Slide 2 description",
  },
  {
    image: "https://source.unsplash.com/1200x600/?product",
    label: "Slide 3",
    description: "Slide 3 description",
  },
];

class Home extends Component {
  constructor(props) {
    super(props);

    const currentSortOrder = props.common.currentSortOrder || 0;
    const sortMeta = SORT_ORDERS[currentSortOrder];

    this.state = {
      isSortMenuOpen: false,
      currentSortOrder: currentSortOrder,
      filterOpts: props.common.filterOpts,
      inventory: getSorted(
        props.inventory || [],
        sortMeta.prop,
        sortMeta.order
      ),
      openFilters: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.common.currentSortOrder !== state.currentSortOrder ||
      state.inventory.length === 0
    ) {
      const sortMeta = SORT_ORDERS[props.common.currentSortOrder];

      return {
        inventory: getSorted(
          props.inventory || [],
          sortMeta.prop,
          sortMeta.order
        ),
        currentSortOrder: props.common.currentSortOrder,
      };
    }

    if (!_isEqual(props.common.filterOpts, state.filterOpts)) {
      const filteredSizes = props.common.filterOpts.size;
      const filteredBySize = props.inventory.filter((item) => {
        return (
          _intersection(filteredSizes, _map(item.sizes, "short")).length > 0
        );
      });

      const filteredColors = props.common.filterOpts.color;
      const filteredByColor = props.inventory.filter((item) => {
        return (
          _intersection(filteredColors, _map(item.colors, "name")).length > 0
        );
      });

      return {
        filterOpts: props.common.filterOpts,
        inventory: _unionBy(filteredBySize, filteredByColor, "sku"),
      };
    }

    return {
      inventory: props.inventory,
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  toggleSortMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({ isSortMenuOpen: !pS.isSortMenuOpen }));
  };

  onChangeSortOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentSortOrder = Number(
      e.currentTarget.getAttribute("data-sort-index")
    );

    this.setState({ isSortMenuOpen: false }, () => {
      this.props.onChangeSortingOrder(currentSortOrder);
    });
  };

  onSelectFilter = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    const type = e.currentTarget.getAttribute("data-type");
    const value = e.currentTarget.getAttribute("data-value");
    const { filterOpts } = this.props.common;
    let newValue = filterOpts[type] || [];

    if (newValue.includes(value)) {
      _remove(newValue, (n) => n === value);

      this.props.onChangeProdFilter({ [type]: newValue });
    } else {
      newValue = [...newValue, value];

      this.props.onChangeProdFilter({ [type]: newValue });
    }
  };

  onClickFilterHeader = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const type = e.currentTarget.getAttribute("data-filter");

    this.setState((pS) => {
      const openFilters = [...pS.openFilters];

      if (openFilters.includes(type)) {
        _remove(openFilters, (n) => n === type);
      } else {
        openFilters.push(type);
      }

      return { openFilters };
    });
  };

  render() {
    const { cart, common } = this.props;

    const cartItemsSku = _map(cart, "sku");

    const {
      isSortMenuOpen,
      currentSortOrder,
      inventory,
      openFilters,
    } = this.state;
    const selectedFilters = {
      size: _get(common, "filterOpts.size", []),
      color: _get(common, "filterOpts.color", []),
    };

    return (
      <div className="home-page">
        <div className="row d-flex justify-content-end mr-5">
          <div className="dropdown">
            <button
              className={cx("btn btn-secondary dropdown-toggle", {
                show: isSortMenuOpen,
              })}
              type="button"
              onClick={this.toggleSortMenu}
            >
              {SORT_ORDERS[currentSortOrder].label}
            </button>
            <div
              className={cx("dropdown-menu", {
                show: isSortMenuOpen,
              })}
              aria-labelledby="dropdownMenuButton"
            >
              {SORT_ORDERS.map((item, index) => (
                <span
                  className="dropdown-item"
                  key={item.key}
                  data-sort-index={index}
                  onClick={this.onChangeSortOrder}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="row mt-4 ml-4">
              <FilterCard
                type="size"
                title="Sizes"
                rows={SIZES}
                valProp="short"
                labelProp="long"
                isExpandable
                selectedFilters={selectedFilters.size}
                onSelectFilter={this.onSelectFilter}
                isOpen={openFilters.includes("size")}
                onClickHeader={this.onClickFilterHeader}
              />
            </div>
            <div className="row mt-4 ml-4">
              <FilterCard
                type="color"
                title="Colors"
                rows={COLORS}
                valProp="name"
                labelProp="name"
                isExpandable
                selectedFilters={selectedFilters.color}
                onSelectFilter={this.onSelectFilter}
                isOpen={openFilters.includes("color")}
                onClickHeader={this.onClickFilterHeader}
              />
            </div>
          </div>
          <div className="col-10">
            {/* <div className="row my-4">
              <Carousel slides={slides} />
            </div> */}
            <div className="row my-4">
              {inventory.map((product) => (
                <Link
                  className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 silent-link"
                  key={product.sku}
                  to={product.landingPageUrl}
                >
                  <ProductCard
                    product={product}
                    isInCart={cartItemsSku.includes(product.sku)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    inventory: _get(state, ["inventory", "data"], []),
    cart: _get(state, ["cart", "data"], []),
    common: state.common,
  }),
  {
    getProducts,
    onChangeSortingOrder,
    onChangeProdFilter,
  }
)(Home);
