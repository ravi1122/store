import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _map from "lodash/map";

import AddressForm from "../../components/AddressForm";

import {
  getAddresses,
  saveNewAddress,
  updateAddress,
  deleteAddress,
  onSelectDelveryAddress,
} from "./actions";

class DeliveryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewAddrForm: false,
      showUpdateFormFor: null,
      selectedDelveryAddress: null,
    };
  }

  componentDidMount() {
    this.props.getAddresses();
  }

  onClickNewAddr = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState((pS) => ({
      showNewAddrForm: !pS.showNewAddrForm,
      showUpdateFormFor: null,
    }));
  };

  onClickUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const addrId = e.currentTarget.getAttribute("data-key");

    this.setState({ showUpdateFormFor: addrId });
  };

  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const addrId = e.currentTarget.getAttribute("data-key");

    this.props.deleteAddress({ key: addrId });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const addrData = { key: this.state.showUpdateFormFor };

    for (let field of e.currentTarget) {
      if (field.type !== "submit") {
        addrData[field.id] =
          field.type === "checkbox" ? field.checked : field.value;
      }
    }

    this.setState({ showNewAddrForm: false, showUpdateFormFor: null }, () => {
      addrData.key
        ? this.props.updateAddress(addrData)
        : this.props.saveNewAddress(addrData);
    });
  };

  onSelectDelveryAddress = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    const addrId = e.currentTarget.id;

    this.setState({ selectedDelveryAddress: addrId }, () => {
      this.props.onSelectDelveryAddress({ key: addrId });
    });
  };

  render() {
    const {
      showNewAddrForm,
      showUpdateFormFor,
      selectedDelveryAddress,
    } = this.state;
    const { myAddresses } = this.props;
    const continueBtnProps = {
      className: "btn btn-primary",
      to: "/payment",
    };

    if (myAddresses.length === 0) {
      continueBtnProps.onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
    }

    return (
      <div className="cart-page row mb-4">
        <div className="col-10 offset-1">
          <div className="card">
            <div className="card-header">My Addresses</div>
            <ul className="list-group list-group-flush">
              {myAddresses.map((addr) => (
                <li className="list-group-item" key={addr.key}>
                  <div className="input-group">
                    <div className="input-group-text">
                      <input
                        type="checkbox"
                        id={addr.key}
                        onChange={this.onSelectDelveryAddress}
                        checked={selectedDelveryAddress === addr.key}
                      />
                    </div>
                    <label
                      htmlFor={addr.key}
                      style={{ width: "calc(100% - 40px)" }}
                    >
                      {`${addr.inputAddressName}, ${addr.inputAddressLine1}, ${addr.inputCity}, ${addr.inputPostalCode}`}
                      {showUpdateFormFor !== addr.key && (
                        <>
                          <button
                            className="btn btn-secondary float-right"
                            onClick={this.onClickDelete}
                            data-key={addr.key}
                            disabled={addr.gridCheckDefault ? "disabled" : null}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary float-right mr-1"
                            onClick={this.onClickUpdate}
                            data-key={addr.key}
                          >
                            Update
                          </button>
                        </>
                      )}
                    </label>
                  </div>

                  {showUpdateFormFor === addr.key && (
                    <>
                      <br />
                      <AddressForm onSubmit={this.onSubmit} address={addr} />
                    </>
                  )}
                </li>
              ))}
              {showNewAddrForm ? (
                <li className="list-group-item" key={myAddresses.length + 1}>
                  <AddressForm onSubmit={this.onSubmit} isNew />
                </li>
              ) : (
                <li className="list-group-item actions d-flex align-items-end">
                  <span
                    className="btn btn-primary"
                    onClick={this.onClickNewAddr}
                  >
                    Add new address
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="col-1 offset-10 mt-2">
          {selectedDelveryAddress ? (
            <Link {...continueBtnProps}>Continue</Link>
          ) : (
            <span className="disabled btn btn-secondary">Continue</span>
          )}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ myAddresses: state.myAddresses.data }), {
  getAddresses,
  saveNewAddress,
  updateAddress,
  deleteAddress,
  onSelectDelveryAddress,
})(DeliveryPage);
