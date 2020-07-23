import React, { Component } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { login } from "../../store/session";

class Login extends Component {
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
      this.props
        .login(formData)
        .then((resp) => {
          if (resp && resp.message) {
            if (resp.success) {
              toast.success(resp.message);
            } else {
              toast.error(resp.message);
            }
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            toast.error(err.data.message);
          }
        });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center m-3">
        <div className="login-page">
          <form className="user-form align-middle" onSubmit={this.onSubmit}>
            <h2 className="text-center">
              <u>Login to Account</u>
            </h2>
            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="user" />
                </span>
                <input
                  type="text"
                  className="col-10 form-control border-0 shadow-none"
                  name="username"
                  placeholder="Username"
                  required="required"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="lock" />
                </span>
                <input
                  type="password"
                  className="col-10 form-control border-0 shadow-none"
                  name="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Log In
              </button>
            </div>
            <p className="small text-center">
              By clicking the Sign Up button, you agree to our <br />
              <Link to="/tnc">Terms &amp; Conditions</Link>, and{" "}
              <Link to="/servicePolicies">Privacy Policy</Link>.
            </p>
          </form>
          <div className="text-center">
            Don't have an account? <Link to="/register">Register here</Link>.
          </div>
          <div className="text-center">
            Forgot your password? <Link to="/forgotPassword">Recover here</Link>
            .
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
