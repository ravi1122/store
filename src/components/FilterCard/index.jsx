import React from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterCard({
  type,
  title,
  rows,
  selectedFilters,
  onSelectFilter,
  valProp,
  labelProp,
  isExpandable,
  isOpen,
  onClickHeader,
}) {
  const headerProps = {
    className: "card-header bg-primary d-flex justify-content-between",
  };

  if (isExpandable && onClickHeader) {
    headerProps.onClick = onClickHeader;
    headerProps["data-filter"] = type;
  }

  return (
    <div className="card filter-card">
      <div {...headerProps}>
        <span>{title}</span>
        {isExpandable && (
          <span className="d-flex align-items-center">
            <FontAwesomeIcon icon={isOpen ? "minus" : "plus"} />
          </span>
        )}
      </div>
      <ul
        className={cx("list-group", {
          expandable: isExpandable,
          show: isExpandable && isOpen,
        })}
      >
        {rows.map((item, index) => (
          <li className="list-group-item" key={item.key || item[valProp]}>
            <div className="custom-control custom-radio">
              <input
                type="checkbox"
                id={`customRadio-${type}-${index}`}
                name="customRadio"
                data-type={type}
                data-value={item[valProp]}
                checked={selectedFilters.includes(item[valProp])}
                onChange={onSelectFilter}
                className="custom-control-input"
              />
              <label
                className="custom-control-label"
                htmlFor={`customRadio-${type}-${index}`}
              >
                {item[labelProp]}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
