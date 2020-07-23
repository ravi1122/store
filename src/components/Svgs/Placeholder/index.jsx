import React from "react";
import _sampleSize from "lodash/sampleSize";

const _colors = [
  "#007bff",
  "#6610f2",
  "#6f42c1",
  "#e83e8c",
  "#dc3545",
  "#fd7e14",
  "#ffc107",
  "#28a745",
  "#20c997",
  "#17a2b8",
];

export default function Placeholder({
  text = "",
  textFontSize = "5rem",
  colors,
  width = 800,
  height = 400,
}) {
  const clrs = colors || _sampleSize(_colors, 3);

  return (
    <svg
      className="d-block w-100"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
    >
      <title>{text}</title>

      <rect width="100%" height="100%" fill={clrs[0]}></rect>
      <rect x="10%" y="10%" width="80%" height="80%" fill={clrs[1]}></rect>
      <text
        className="font-pacifico"
        x="50%"
        y="50%"
        fill={clrs[2]}
        fontSize={textFontSize}
        textAnchor="middle"
      >
        {text}
      </text>
    </svg>
  );
}
