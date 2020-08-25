import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  const ingredient = [];
  for (let item in props.ingredients) {
    ingredient.push(`${item}:${props.ingredients[item]}`);
  }
  return (
    <div className={classes.Order}>
      <span>
        {" "}
        {ingredient.map((item) => (
          <i key={item}>{item}</i>
        ))}
      </span>
      <p>
        Price: <strong>USD{Number.parseFloat(props.price).toFixed(2)}</strong>{" "}
      </p>
    </div>
  );
};

export default Order;
