import React from "react";
import Aux from "../../../hoc/Aux";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span> :
        {props.ingredients[key]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A burger with:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </Aux>
  );
};

export default OrderSummary;
