import React from "react";
import BuildControl from "../BuildControl/BuildControl";
import classes from "./BuilControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuilControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        {" "}
        <strong>Current Price: {props.price.toFixed(2)}</strong>{" "}
      </p>
      {controls.map((control) => (
        <BuildControl
          added={() => props.ingredientsAdded(control.type)}
          removed={() => props.ingredientsRemoved(control.type)}
          key={control.label}
          label={control.label}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button disabled={!props.purchasable} className={classes.OrderButton}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuilControls;
