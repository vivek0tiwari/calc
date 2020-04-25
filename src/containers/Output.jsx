import React from "react";
import PropTypes from "prop-types";
export const Output = ({ value, className, isSciMode, onChangeMode }) => {
  return (
    <div>
      <input
        type="checkbox"
        value={isSciMode}
        onChange={onChangeMode}
        name="mode"
      ></input>
      <label> Scientific Mode</label>
      <input
        type="text"
        disabled
        value={value}
        className={className || "output"}
      ></input>
    </div>
  );
};
Output.prototype = {
  value: PropTypes.string,
  className: PropTypes.string,
};
