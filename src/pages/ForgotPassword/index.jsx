import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import _isEmpty from "lodash/isEmpty";

import { forgotPassword } from "../../server";

export default class ForgotPassword extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = {};

    for (let field of e.currentTarget) {
      if (field.type !== "submit") {
        formData[field.name] = field.value;
      }
    }

    if (!_isEmpty(formData)) {
      forgotPassword(formData).then((resp) => {
        if (resp.status === 200) {
          toast.success(resp.data.message);
        }
      });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center m-3">
        <div className="forgot-password-page">
          <form className="user-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">
              <u>Forgot Password</u>
            </h2>
            <p className="lead text-center">
              Enter your registered email id to get the temporary password for
              your account.
            </p>
            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="paper-plane" />
                </span>
                <input
                  type="email"
                  className="col-10 form-control border-0 shadow-none"
                  name="email"
                  placeholder="Email Address"
                  required="required"
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Get temporary password
              </button>
            </div>
          </form>
          <div className="text-center">
            Already have an account? <Link to="/login">Login here</Link>.
          </div>
          <div className="text-center">
            Don't have an account? <Link to="/register">Register here</Link>.
          </div>
        </div>
      </div>
    );
  }
}
