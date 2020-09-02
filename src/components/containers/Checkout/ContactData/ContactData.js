import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button/Button";
import axios from "../../../../orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import classes from "./ContactData.css";
import withError from "../../../../hoc/errorHandler/errorHandler";
import * as actions from "../../../../store/actions/index";

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
        validation: { required: "true" },
        valid: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email",
        },
        value: "",
        validation: { required: "true" },
        valid: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street",
        },
        value: "",
        validation: { required: "true" },
        valid: false,
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "zip code",
        },
        value: "",
        validation: { required: "true" },
        valid: false,
      },
      deliverMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Fast", displayValue: "Fast" },
            { value: "Cheap", displayValue: "Cheap" },
          ],
        },
        value: "Fast ",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }

    const order = {
      ingredient: this.props.localIngredients,
      price: this.props.totalPrice,
      order: formData,
    };

    this.props.onOrderBurger(order);
  };

  checkFormField(fieldValue, rules) {
    let valid = false;
    if (rules.required) {
      valid = fieldValue.trim() !== "";
    }
    return valid;
  }

  inputChangeHandler = (e, inputId) => {
    const stateCopy = {
      ...this.state.orderForm,
    };
    const stateElementCopy = {
      ...stateCopy[inputId],
    };
    stateElementCopy.value = e.target.value;
    stateElementCopy.valid = this.checkFormField(
      stateElementCopy.value,
      stateElementCopy.validation
    );
    stateCopy[inputId] = stateElementCopy;
    console.log(stateElementCopy);
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
      <form onSubmit={this.orderHandler}>
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
        <Button Btntype="Success">ORDER</Button>
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

const mapStatetoProps = (state) => {
  return {
    localIngredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  onOrderBurger: (orderData) => dispatch(actions.purchase(orderData));
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withError(ContactData, axios));
