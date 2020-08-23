import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import classes from "./ContactData.css";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <label>Your name:</label>
          <input type="text" name="name" />
          <label>Your email:</label>
          <input type="email" name="email" />
          <label>Stret:</label>
          <input type="text" name="street" />
          <label>Postal Code:</label>
          <input type="text" name="pcode" />
          <Button Btntype="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
