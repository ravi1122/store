import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _map from "lodash/map";
import _range from "lodash/range";
import _isEmpty from "lodash/isEmpty";

import CardForm from "../../components/CardForm";

import {
  getCards,
  saveNewCard,
  updateCard,
  deleteCard,
  setPaymentMethod,
} from "./actions";

import { isValidCardNumber } from "../../utils";

// Hooks
// https://dmitripavlutin.com/react-usestate-hook-guide/

function PaymentPage(props) {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [updateCardForm, setUpdateCardForm] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formError, setFormError] = useState({
    inputCardHolderName: "",
    inputCardNumber: "",
    inputExpiryMonth: "",
    inputExpiryYear: "",
    inputCVV: "",
  });

  React.useEffect(() => {
    props.getCards();
  }, []);

  const onClickUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardKey = e.currentTarget.getAttribute("data-key");
    setUpdateCardForm(cardKey);
    setShowAddCardForm(false);
  };

  const onClickShowCardForm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowAddCardForm(true);
    setUpdateCardForm(null);
  };

  const onSelectPaymentMethod = (e) => {
    // e.preventDefault();
    e.stopPropagation();

    const cardId = e.currentTarget.id;

    setSelectedPayment(cardId);
    props.setPaymentMethod({ key: cardId });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = { key: updateCardForm };
    const formErrors = {};

    for (let field of e.currentTarget) {
      if (field.type !== "submit") {
        switch (field.id) {
          case "inputCardHolderName":
            formData[field.id] = field.value;
            if (field.value.length === 0) {
              formErrors.inputCardHolderName = "Please provide name";
            }
            break;
          case "inputCardNumber":
            formData[field.id] = field.value.replace(/[^\d]/g, "");
            if (!isValidCardNumber(field.value)) {
              formErrors.inputCardNumber = "Please provide valid card number";
            }
            break;
          case "inputExpiryMonth":
            formData[field.id] = field.value;
            if (field.value.length === 0) {
              formErrors.inputExpiryMonth = "Please provide valid expiry month";
            }
            break;
          case "inputExpiryYear":
            formData[field.id] = field.value;
            if (field.value.length === 0) {
              formErrors.inputExpiryYear = "Please provide valid expiry year";
            }
            break;
          case "inputCVV":
            formData[field.id] = field.value;
            if (field.value.length !== 3) {
              formErrors.inputCVV = "Please provide valid CVV number";
            }
            break;
          default:
            formData[field.id] =
              field.type === "checkbox" ? field.checked : field.value;
        }
      }
    }

    if (_isEmpty(formErrors)) {
      setShowAddCardForm(false);
      setUpdateCardForm(null);

      formData.key ? props.updateCard(formData) : props.saveNewCard(formData);
    } else {
      setFormError(formErrors);
    }
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cardKey = e.currentTarget.getAttribute("data-key");

    props.deleteCard({ key: cardKey });
  };

  const { myCards } = props;

  return (
    <div className="cart-page row mb-4">
      <div className="col-10 offset-1">
        <div className="card">
          <div className="card-header">Payment Methods</div>
          <ul className="list-group list-group-flush">
            {myCards.map((card) => (
              <li className="list-group-item" key={card.key}>
                <div className="input-group">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      id={card.key}
                      onChange={onSelectPaymentMethod}
                      checked={selectedPayment === card.key}
                    />
                  </div>
                  <label
                    htmlFor={card.key}
                    style={{ width: "calc(100% - 40px)" }}
                  >
                    {`${
                      card.inputCardHolderName
                    }, XXX*******XX${card.inputCardNumber.substr(-4)}`}
                    {updateCardForm !== card.key && (
                      <>
                        <button
                          className="btn btn-secondary float-right"
                          onClick={onClickDelete}
                          data-key={card.key}
                          disabled={card.inputSaveCard ? "disabled" : null}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary float-right mr-1"
                          onClick={onClickUpdate}
                          data-key={card.key}
                        >
                          Update
                        </button>
                      </>
                    )}
                  </label>
                </div>
                {updateCardForm === card.key && (
                  <CardForm
                    onSubmit={onSubmit}
                    card={card}
                    formError={formError}
                  />
                )}
              </li>
            ))}
            {showAddCardForm ? (
              <li className="list-group-item">
                <CardForm onSubmit={onSubmit} isNew formError={formError} />
              </li>
            ) : (
              <li className="list-group-item actions d-flex align-items-end">
                <span className="btn btn-primary" onClick={onClickShowCardForm}>
                  Add new card
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="col-2 offset-10 mt-2">
        {selectedPayment ? (
          <Link className="btn btn-primary" to="/confirmation">
            Pay Now
          </Link>
        ) : (
          <span className="btn btn-secondary disabled">Pay Now</span>
        )}
      </div>
    </div>
  );
}

export default connect((state) => ({ myCards: state.myCards.data }), {
  getCards,
  saveNewCard,
  updateCard,
  deleteCard,
  setPaymentMethod,
})(PaymentPage);
