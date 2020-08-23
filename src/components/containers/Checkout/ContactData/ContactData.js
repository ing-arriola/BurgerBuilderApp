import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import axios from "../../../../orders";
import classes from "./ContactData.css";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
    purchasing: true,
  };

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Jaime Arriola",
      },
    };

    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
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
          <Button Btntype="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
