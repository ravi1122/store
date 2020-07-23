import React, { Component } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { register } from "../../store/session";

// Controlled vs Uncontrolled component - Reactjs.org
// Ref - Reactjs.org
// Redirect - react-router.org
// Spinner - html/css

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
    };

    this.passwordNode = React.createRef();
    this.confirmPasswordNode = React.createRef();
  }

  onChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

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
      this.props.register(formData).then((res) => {
        if (res && res.message) {
          if (res.success) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        }
      });
    }
  };

  onBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { passwordNode, confirmPasswordNode } = this;

    if (passwordNode.value !== confirmPasswordNode.value) {
      toast.error("Password and Confirm password should match");
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center m-3">
        <div className="registration-page">
          <form className="user-form" onSubmit={this.onSubmit}>
            <h2 className="text-center">
              <u>Create Account</u>
            </h2>
            <p className="lead text-center">
              It's free and hardly takes more than 30 seconds.
            </p>

            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="user" />
                </span>
                <input
                  type="text"
                  className="col-10 form-control border-0 shadow-none"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  maxLength="40"
                  minLength="10"
                  required="required"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="paper-plane" />
                </span>
                <input
                  type="email"
                  className="col-10 form-control border-0 shadow-none"
                  placeholder="Email Address"
                  required="required"
                  name="email"
                  maxLength="40"
                  minLength="10"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="lock" />
                </span>
                <input
                  ref={(node) => {
                    this.passwordNode = node;
                  }}
                  type="password"
                  id="password"
                  className="col-10 form-control border-0 shadow-none"
                  name="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="row border-bottom">
                <span className="col-1 pt-2 input-group-addon">
                  <FontAwesomeIcon icon="lock" />
                  <FontAwesomeIcon icon="check" className="confirm-pass-icon" />
                </span>
                <input
                  ref={(node) => {
                    this.confirmPasswordNode = node;
                  }}
                  type="password"
                  className="col-10 form-control border-0 shadow-none"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required="required"
                  onBlur={this.onBlur}
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Sign Up
              </button>
            </div>

            <p className="small text-center">
              By clicking the Sign Up button, you agree to our <br />
              <Link to="/tnc">Terms &amp; Conditions</Link>, and{" "}
              <Link to="/servicePolicies">Privacy Policy</Link>.
            </p>
          </form>

          <div className="text-center">
            Already have an account? <Link to="/login">Login here</Link>.
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn: _get(state.user, "isLoggedIn", false),
  }),
  { register }
)(Registration);
