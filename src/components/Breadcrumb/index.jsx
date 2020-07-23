import React from "react";
import cx from "classnames";
import { Link, withRouter } from "react-router-dom";
import _compact from "lodash/compact";

import { DEFAULT_BREADCRUMBS, BREADCRUMBS } from "../../config";

function Breadcrumb({ match }) {
  const breadsKey = _compact(match.path.split("/")).join("");
  const breads = BREADCRUMBS[breadsKey] || DEFAULT_BREADCRUMBS;
  const lastBreadIndex = breads.length - 1;

  return (
    <nav className="breadcrumb-container">
      <ol className="breadcrumb">
        {breads.map((bread, index) => (
          <li
            className={cx("breadcrumb-item", {
              active: bread.isActive,
            })}
            key={bread.key}
          >
            {lastBreadIndex === index ? (
              <span>{bread.label}</span>
            ) : (
              <Link
                to={bread.link}
                className={cx("breadcrumb-item", {
                  active: bread.isActive,
                })}
              >
                {bread.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default withRouter(Breadcrumb);
