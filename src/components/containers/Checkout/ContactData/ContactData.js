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
          placeholder: "name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street",
        },
        value: "",
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "zip code",
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

  inputChangeHandler = (e, inputId) => {
    const stateCopy = {
      ...this.state.orderForm,
    };
    const stateElementCopy = {
      ...stateCopy[inputId],
    };
    stateElementCopy.value = e.target.value;
    stateCopy[inputId] = stateElementCopy;
    this.setState({ orderForm: stateCopy });
  };

  render() {
    const elementsForms = [];
    for (let element in this.state.orderForm) {
      elementsForms.push({
        id: element,
        setup: this.state.orderForm[element],
      });
    }
    console.log(elementsForms[0].setup.elementType);
    let form = (
      <form>
        <label>Your name:</label>
        {elementsForms.map((field) => (
          <Input
            key={field.id}
            elementType={field.setup.elementType}
            elementConfig={field.setup.elementConfig}
            value={field.setup.value}
            change={(e) => this.inputChangeHandler(e, field.id)}
          />
        ))}
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
