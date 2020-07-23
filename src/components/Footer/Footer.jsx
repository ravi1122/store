import React from "react";
import { Link } from "react-router-dom";

import SocialLinks from "../SocialLinks";
import PartnerLogos from "../PartnerLogos";
import PaymentOptions from "../PaymentOptions";

import { FOOTER, SITE_NAME } from "../../config";

// Task -
// 1. Add Payment options (Refer https://www.flipkart.com/ - Bottom-right corner) - Done
// 2. Partner logos - https://bootsnipp.com/snippets/Q0Z1j - Done
// 3. Newsletter - https://bootsnipp.com/snippets/eoXRa - Done
// 4. Social Links - Done

export default function Footer() {
  const { ADDRESS, INFORMATION, MY_ACCOUNT } = FOOTER;

  return (
    <footer className="footer-section p-2 text-center bg-dark text-white">
      <div className="row partner-logos pt-2 pb-2 border-bottom border-info">
        <PartnerLogos />
      </div>

      <div className="row site-info mt-2 text-sm-center text-md-center text-lg-left text-xl-left border-bottom border-info">
        {/* Address */}
        <div className="col-12 col-md-6 col-lg-4 mt-md-2 mt-sm-2 footer-left">
          <h6>Coutact Us</h6>
          <ul>
            <li>Address: {ADDRESS.address}</li>
            <li>Phone: {ADDRESS.phone}</li>
            <li>Email: {ADDRESS.email}</li>
            <li>
              <SocialLinks offsetClasses="offset-4 offset-sm-4  offset-md-4 offset-lg-0 offset-xl-0" />
            </li>
          </ul>
        </div>
        {/* Info */}
        <div className="col-6 col-md-3 col-lg-2 mt-md-2 mt-sm-2 footer-widget">
          <h6>Information</h6>
          <ul>
            {INFORMATION.map((info) => (
              <li key={info.key}>
                {/* Traditional way */}
                {/* <a href={info.link}>{info.label}</a> */}
                {/* React router way */}
                <Link to={info.link}>{info.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* My Account */}
        <div className="col-6 col-md-3 col-lg-2 mt-md-2 mt-sm-2 footer-widget">
          <h6>My Account</h6>
          <ul>
            {MY_ACCOUNT.map((info) => (
              <li key={info.key}>
                <a href={info.link}>{info.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mt-md-2 mt-sm-2 newsletter f6">
          <h6>Subscribe to our Newsletter</h6>
          <div className="input-group mb-3 px-3 px-sm-0">
            <input
              type="text"
              className="form-control f6"
              placeholder="Recipient's email"
            />
            <div className="input-group-append">
              <span className="input-group-text f6" id="basic-addon2">
                SUBSCRIBE
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row copyright-n-payment mt-2">
        <div className="col-12 col-sm-6 text-center text-sm-left text-muted f6 mt-2">
          Copyright ©{new Date().getFullYear()},{" "}
          <span className="font-pacifico text-white">{SITE_NAME}</span>, All
          rights reserved
        </div>
        {/* TODO: Refactor this as PartnerLogs */}
        <div className="col-12 col-sm-6 text-center text-sm-right mt-2">
          <PaymentOptions />
        </div>
      </div>
    </footer>
  );
}
