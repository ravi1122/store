import React from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SOCIAL_MEDIA_PROFILES } from "../../config";

export default function SocialLinks({ offsetClasses = "" }) {
  return (
    <div className="footer-social row">
      {SOCIAL_MEDIA_PROFILES.map((site, index) => (
        <a
          key={site.key}
          href={site.link}
          className={cx("col-1", { [offsetClasses]: index === 0 })}
        >
          <FontAwesomeIcon className="text-white" icon={site.icon} />
        </a>
      ))}
    </div>
  );
}
