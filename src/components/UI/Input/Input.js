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
    case "password":
      inputElement = (
        <input
          className={classes.InputElement}
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          {...props.elementConfig}
          required
        ></input>
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
