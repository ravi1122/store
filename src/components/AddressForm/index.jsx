import React from "react";
import _map from "lodash/map";

import { INDIAN_STATES_AND_UTS } from "../../db";

export default function AddressForm({ isNew, address, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-4">
      <div className="form-row">
        <div className="form-group col-12">
          <label htmlFor="inputAddressName">Address name</label>
          <input
            required
            type="text"
            id="inputAddressName"
            className="form-control"
            placeholder="vacation home"
            defaultValue={isNew ? "" : address.inputAddressName}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddressLine1">Address Line 1</label>
        <input
          required
          type="text"
          id="inputAddressLine1"
          className="form-control"
          placeholder="1234 Main St"
          defaultValue={isNew ? "" : address.inputAddressLine1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputAddressLine2">Address Line 2</label>
        <input
          type="text"
          className="form-control"
          id="inputAddressLine2"
          placeholder="Apartment, studio, or floor"
          defaultValue={isNew ? "" : address.inputAddressLine2}
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">City</label>
          <input
            required
            type="text"
            id="inputCity"
            className="form-control"
            defaultValue={isNew ? "" : address.inputCity}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select
            required
            id="inputState"
            className="form-control"
            defaultValue={isNew ? "" : address.inputState}
          >
            <option>Choose state...</option>
            {_map(INDIAN_STATES_AND_UTS, (long, short) => (
              <option value={short} key={short}>
                {long}
              </option>
            ))}

            {/* {Object.keys(INDIAN_STATES_AND_UTS).map((prop) => (
              <option value={prop} key={prop}>
                {INDIAN_STATES_AND_UTS[prop]}
              </option>
            ))} */}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputPostalCode">Postal Code</label>
          <input
            required
            type="text"
            className="form-control"
            id="inputPostalCode"
            defaultValue={isNew ? "" : address.inputPostalCode}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="gridCheckDefault"
            defaultChecked={isNew ? false : address.gridCheckDefault}
          />
          <label className="form-check-label" htmlFor="gridCheckDefault">
            Save as default
          </label>
        </div>
      </div>
      <div className="form-group d-flex align-items-end">
        <button type="submit" className="btn btn-primary">
          {isNew ? "Save" : "Update Address"}
        </button>
      </div>
    </form>
  );
}
