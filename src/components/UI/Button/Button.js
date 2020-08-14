import React from "react";
import classes from "./Button.css";

const Button = () => {
  <button
    className={[classes.Button, classes[props.Btntype]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>;
};

export default Button;
