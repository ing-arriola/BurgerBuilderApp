import React from "react";
import Burger from "../../../Burger/Burger";
import Button from "../../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>soem text</h1>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      <Button Btntype="Danger">CANCEL</Button>
      <Button Btntype="Success">CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
