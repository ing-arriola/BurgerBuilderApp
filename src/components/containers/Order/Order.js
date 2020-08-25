import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  const ingredient = [];
  //I mapped the ingredients objects into an array of objects to get an unique ID for each item
  for (let item in props.ingredients) {
    ingredient.push({ name: item, amount: props.ingredients[item] });
  }
  return (
    <div className={classes.Order}>
      {ingredient.map((item) => (
        <span
          key={item.name}
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          {item.name}:{item.amount}
        </span>
      ))}

      <p>
        Price: <strong>USD{Number.parseFloat(props.price).toFixed(2)}</strong>{" "}
      </p>
    </div>
  );
};

export default Order;
