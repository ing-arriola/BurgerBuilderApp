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
      {controls.map((control) => (
        <BuildControl
          added={() => props.ingredientsAdded(control.type)}
          key={control.label}
          label={control.label}
        />
      ))}
    </div>
  );
};

export default BuilControls;
