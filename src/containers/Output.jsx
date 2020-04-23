import React from "react";
import PropTypes from "prop-types";
export const Output = ({ value, className }) => (
  <input
    type="text"
    disabled
    value={value}
    className={className || "output"}
  ></input>
);
Output.prototype = {
  value: PropTypes.string,
  className: PropTypes.string,
};
