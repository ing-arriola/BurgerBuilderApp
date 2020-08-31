import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          required
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {" "}
              {opt.displayValue}{" "}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}> {props.label} </label>
      {inputElement}
    </div>
  );
};

export default Input;
