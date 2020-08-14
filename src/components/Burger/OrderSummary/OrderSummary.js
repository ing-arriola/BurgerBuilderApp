import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

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
      <Button Btntype="Danger" clicked={props.cancelled}>
        CANCEL
      </Button>

      <Button Btntype="Success" clicked={props.goAhead}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
