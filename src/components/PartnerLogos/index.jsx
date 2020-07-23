import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PARTNERS } from "../../config";

export default function PartnerLogos() {
  return PARTNERS.map((partner) => (
    <div className="col-3 col-md-2 col-lg-1 mt-md-2 mt-sm-2" key={partner.key}>
      <FontAwesomeIcon icon={partner.icon} size="2x" />
    </div>
  ));
}
