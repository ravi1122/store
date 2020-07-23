import React from "react";
import _get from "lodash/get";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SITE_NAME, SITE_LOGO } from "../../config";
import { Link, Redirect } from "react-router-dom";
import { autoLogin } from "../../store/session";

function SeesionHeader(props) {
  React.useEffect(() => {
    if (!props.isLoggedIn) props.autoLogin();
  }, []);

  if (props.isLoggedIn) {
    return <Redirect to={props.redirectTo} />;
  }

  return (
    <div className="row bg-white pl-3">
      <Link className="navbar-brand font-pacifico" to="/">
        <FontAwesomeIcon icon={SITE_LOGO} size="2x" color="green" />
        <span className="site-name">{SITE_NAME}</span>
      </Link>
    </div>
  );
}

export default connect(
  (state) => ({
    redirectTo: _get(state.router, "location.state", {
      pathname: "/",
      search: "",
    }),
    isLoggedIn: _get(state.user, "isLoggedIn", false),
  }),
  { autoLogin }
)(SeesionHeader);
