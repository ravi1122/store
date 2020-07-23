import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _map from "lodash/map";
import _range from "lodash/range";

import CardForm from "../../components/CardForm";

import { saveNewCard, updateCard, deleteCard } from "./actions";

class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddCardForm: false,
      updateCardForm: null,
    };
  }

  onClickShowCardForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ showAddCardForm: true, updateCardForm: null });
  };

  onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardKey = e.currentTarget.getAttribute("data-key");

    this.props.deleteCard({ key: cardKey });
  };

  onClickUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardKey = e.currentTarget.getAttribute("data-key");

    this.setState({ updateCardForm: cardKey });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = { key: this.state.updateCardForm };

    for (let field of e.currentTarget) {
      if (field.type !== "submit") {
        formData[field.id] =
          field.type === "checkbox" ? field.checked : field.value;
      }
    }

    this.setState({ showAddCardForm: false, updateCardForm: null }, () => {
      formData.key
        ? this.props.updateCard(formData)
        : this.props.saveNewCard(formData);
    });
  };

  render() {
    const { myCards } = this.props;
    const { showAddCardForm, updateCardForm } = this.state;

    return (
      <div className="cart-page row mb-4">
        <div className="col-10 offset-1">
          <div className="card">
            <div className="card-header">Payment Methods</div>
            <ul className="list-group list-group-flush">
              {myCards.map((card) => (
                <li className="list-group-item" key={card.key}>
                  {`${card.inputCardHolderName}, ${card.inputCardNumber}`}
                  <br />

                  {updateCardForm === card.key ? (
                    <CardForm onSubmit={this.onSubmit} card={card} />
                  ) : (
                    <>
                      <button
                        className="btn btn-secondary float-right"
                        onClick={this.onClickDelete}
                        data-key={card.key}
                        disabled={card.inputSaveCard ? "disabled" : null}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary float-right mr-1"
                        onClick={this.onClickUpdate}
                        data-key={card.key}
                      >
                        Update
                      </button>
                    </>
                  )}
                </li>
              ))}
              {showAddCardForm ? (
                <li className="list-group-item">
                  <CardForm onSubmit={this.onSubmit} isNew />
                </li>
              ) : (
                <li className="list-group-item actions d-flex align-items-end">
                  <span
                    className="btn btn-primary"
                    onClick={this.onClickShowCardForm}
                  >
                    Add new card
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="col-1 offset-10 mt-2">
          <Link className="btn btn-primary" to="/">
            Pay
          </Link>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ myCards: state.myCards.data }), {
  saveNewCard,
  updateCard,
  deleteCard,
})(PaymentPage);
