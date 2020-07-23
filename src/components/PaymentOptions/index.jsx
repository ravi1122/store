import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PAYMENT_OPTIONS } from "../../config";

export default function PaymentOptions() {
  return PAYMENT_OPTIONS.map((opts) => (
    <FontAwesomeIcon
      className="payment-cc"
      icon={opts.icon}
      size="2x"
      key={opts.key}
    />
  ));
}
