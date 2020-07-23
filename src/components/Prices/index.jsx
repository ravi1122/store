import React from "react";

import { formatCurrency } from "../../utils";

export default function Prices({ salePrice = 0, price = 0, addLineBreak }) {
  return (
    <div className="col-12">
      {salePrice < price ? (
        <>
          <span className="sale-price text-danger pr-2">
            {formatCurrency(salePrice)}
          </span>
          {addLineBreak && <br />}
          <del className="price">{formatCurrency(price)}</del>
        </>
      ) : (
        <span className="price">{formatCurrency(price)}</span>
      )}
    </div>
  );
}
