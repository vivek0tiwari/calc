import React from "react";
import PropTypes from "prop-types";

export const Button = ({ label, children, ...props }) => {
  const handleClick = (event) => {
    if (props.disabled) {
      return event.preventDefault();
    }

    if (props.onClick) {
      return props.onClick(event, props.value);
    }
  };
  return (
    <button {...props} onClick={handleClick}>
      {children || label}
    </button>
  );
};
Button.prototype = {
  onClick: PropTypes.func,
  label: PropTypes.string,
};
