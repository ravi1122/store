import React from "react";

// TODO: Show color name as tooltip
export default function Colors({ sku, colors, onClick = () => ({}) }) {
  return (
    <div className="color-container">
      {colors.map((color, index) => {
        return (
          <div
            className="color-swatch"
            key={index}
            onClick={onClick}
            data-sku={sku}
          >
            <div className="color-swatch-outer">
              <div
                className="color-swatch-inner"
                style={{ backgroundColor: color.value }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
