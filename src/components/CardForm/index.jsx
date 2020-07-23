import React, { useState } from "react";
import _map from "lodash/map";
import _range from "lodash/range";
import cx from "classnames";

import { LIST_OF_MONTHS } from "../../db";
import { CC_EXPIRY_YEARS } from "../../config";
import { maskCardNumber } from "../../utils";

export default function CardForm({ onSubmit, isNew, card, formError = {} }) {
  const currentYear = new Date().getFullYear();

  const [cardNumber, setCardNumber] = useState(
    isNew ? "" : card.inputCardNumber
  );

  function onChange(e) {
    const oVal = e.currentTarget.value;
    const card = oVal.replace(/[^\d]/g, "");

    setCardNumber(maskCardNumber(card));
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <div className="form-row">
        <div className="form-group col-12">
          <label htmlFor="inputCardHolderName">Name on card</label>
          <input
            required
            type="text"
            id="inputCardHolderName"
            className={cx("form-control", {
              "border border-danger": formError.inputCardHolderName,
            })}
            placeholder="e.g. Will Smith"
            defaultValue={isNew ? "" : card.inputCardHolderName}
          />
          {formError.inputCardHolderName && (
            <span className="error text-danger">
              {formError.inputCardHolderName}
            </span>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputCardNumber">Card number</label>
        <input
          required
          type="text"
          id="inputCardNumber"
          className={cx("form-control", {
            "border border-danger": formError.inputCardNumber,
          })}
          placeholder="1234 5678 1234 5678"
          value={cardNumber}
          maxLength="19"
          onChange={onChange}
        />
        {formError.inputCardNumber && (
          <span className="error text-danger">{formError.inputCardNumber}</span>
        )}
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="inputExpiryMonth">Expiry Month</label>
          <select
            required
            id="inputExpiryMonth"
            className={cx("form-control", {
              "border border-danger": formError.inputExpiryMonth,
            })}
          >
            <option>Choose month...</option>
            {_map(LIST_OF_MONTHS, ({ short }) => (
              <option value={short} key={short}>
                {short}
              </option>
            ))}
          </select>
          {formError.inputExpiryMonth && (
            <span className="error text-danger">
              {formError.inputExpiryMonth}
            </span>
          )}
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputExpiryYear">Expiry Year</label>
          <select
            required
            id="inputExpiryYear"
            className={cx("form-control", {
              "border border-danger": formError.inputExpiryYear,
            })}
          >
            <option>Choose year...</option>
            {_map(
              _range(currentYear, currentYear + CC_EXPIRY_YEARS + 1),
              (yy) => (
                <option value={yy} key={yy}>
                  {yy}
                </option>
              )
            )}
          </select>
          {formError.inputExpiryYear && (
            <span className="error text-danger">
              {formError.inputExpiryYear}
            </span>
          )}
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputCVV">CVV</label>
          <input
            required
            type="password"
            id="inputCVV"
            maxLength="3"
            minLength="3"
            className={cx("form-control", {
              "border border-danger": formError.inputCVV,
            })}
          />
          {formError.inputCVV && (
            <span className="error text-danger">{formError.inputCVV}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="inputSaveCard"
            defaultChecked={isNew ? "" : card.inputSaveCard}
          />
          <label className="form-check-label" htmlFor="inputSaveCard">
            Save card as default
          </label>
        </div>
      </div>
      <div className="form-group d-flex align-items-end">
        <button type="submit" className="btn btn-primary">
          {isNew ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
}
