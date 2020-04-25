import React from "react";
import PropTypes from "prop-types";
export const Output = ({
  value,
  className,
  isSciMode,
  onChangeMode,
  isDarkTheme,
  onThemeChange,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        value={isDarkTheme}
        onChange={onThemeChange}
        name="theme"
      ></input>
      <label> Change Theme</label>
      <input
        type="checkbox"
        value={isSciMode}
        onChange={onChangeMode}
        name="mode"
      ></input>
      <label> Change Mode</label>
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
