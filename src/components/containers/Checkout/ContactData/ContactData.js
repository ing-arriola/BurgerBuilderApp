import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import axios from "../../../../orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import classes from "./ContactData.css";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
        },
        value: "",
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
        },
        value: "",
      },
      deliverMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Fast", displayValue: "Fast" },
            { value: "Cheap", displayValue: "Cheap" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.price,
    };

    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    let form = (
      <form>
        <label>Your name:</label>
        <Input type="text" name="name" />
        <label>Your email:</label>
        <Input type="email" name="email" />
        <label>Stret:</label>
        <Input type="text" name="street" />
        <label>Postal Code:</label>
        <Input type="text" name="pcode" />
        <Button Btntype="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
