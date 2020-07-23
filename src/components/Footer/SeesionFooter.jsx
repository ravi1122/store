import React from "react";

import { SITE_NAME } from "../../config";

export default function SessionFooter() {
  return (
    <footer className="d-flex justify-content-center align-items-center m-3">
      <span className="text-muted">
        Copyright ©{new Date().getFullYear()},{" "}
        <span className="font-pacifico text-dark">{SITE_NAME}</span>, All rights
        reserved
      </span>
    </footer>
  );
}
