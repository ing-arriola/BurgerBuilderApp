import React from "react";
import Burger from "../../../Burger/Burger";
import Button from "../../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div>
      <h1>soem text</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger">CANCEL</Button>
      <Button btnType="Success">CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
