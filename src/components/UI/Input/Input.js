import React from "react";

const Input = (props) => {
  let inputElement = null;

  switch (props.inputType) {
    case "input":
      inputElement = <input {...props} />;
    case "textarea":
      inputElement = <textarea {...props} />;
    default:
      inputElement = <input {...props} />;
  }

  return (
    <div>
      <label> {props.label} </label>
      {inputElement}
    </div>
  );
};

export default Input;
