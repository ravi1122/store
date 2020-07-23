import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFound() {
  return (
    <div className="error-page w-80 mx-auto text-center">
      <div className="not-found">
        <h1 className="code font-pacifico">404</h1>
        <h2 className="message text-uppercase">
          Oops, The Page you are looking for can't be found!
        </h2>

        <form className="notfound-search position-relative">
          <input className="search-field" type="text" placeholder="Search..." />
          <button
            className="position-absolute search-btn text-center border-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <a href="/">
          <FontAwesomeIcon icon="chevron-left" /> Return To Homepage
        </a>
      </div>
    </div>
  );
}
