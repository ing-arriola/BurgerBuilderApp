import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../UI/Button/Button";
import axios from "../../../../orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import classes from "./ContactData.css";
import withError from "../../../../hoc/errorHandler/errorHandler";
import * as actions from "../../../../store/actions/index";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
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
      valid: true,
      validation: {},
    },
  });

  const orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElement in orderForm) {
      formData[formElement] = orderForm[formElement].value;
    }

    const order = {
      ingredient: props.localIngredients,
      price: props.totalPrice,
      order: formData,
      userId: props.id,
    };

    props.onOrderBurger(order, props.token);
  };

  const checkFormField = (fieldValue, rules) => {
    let valid = false;
    if (rules.required) {
      valid = fieldValue.trim() !== "";
    }
    return valid;
  };

  const inputChangeHandler = (e, inputId) => {
    const stateCopy = {
      ...orderForm,
    };
    const stateElementCopy = {
      ...stateCopy[inputId],
    };
    stateElementCopy.value = e.target.value;
    stateElementCopy.valid = checkFormField(
      stateElementCopy.value,
      stateElementCopy.validation
    );
    stateCopy[inputId] = stateElementCopy;

    setOrderForm(stateCopy);
  };

  const elementsForms = [];
  for (let element in orderForm) {
    elementsForms.push({
      id: element,
      setup: orderForm[element],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      <label>Your name:</label>
      {elementsForms.map((field) => (
        <Input
          key={field.id}
          elementType={field.setup.elementType}
          elementConfig={field.setup.elementConfig}
          value={field.setup.value}
          change={(e) => inputChangeHandler(e, field.id)}
        />
      ))}
      <Button Btntype="Success">ORDER</Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    localIngredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    id: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchase(orderData, token)),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withError(ContactData, axios));
