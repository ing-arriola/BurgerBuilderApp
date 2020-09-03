import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        value: "",
        validation: { required: "true", minlength: 8 },
        valid: false,
      },
    },
  };

  checkFormField(fieldValue, rules) {
    let valid = false;
    if (rules.required) {
      valid = fieldValue.trim() !== "";
    }
    return valid;
  }

  inputChangeHandler = (e, controlName) => {
    const controlsUpdated = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkFormField(
          e.target.value,
          this.state.controls[controlName].validation
        ),
      },
    };
    this.setState({ controls: controlsUpdated });
  };

  render() {
    const elementsForms = [];
    for (let element in this.state.controls) {
      elementsForms.push({
        id: element,
        setup: this.state.controls[element],
      });
    }

    const form = elementsForms.map((field) => (
      <Input
        key={field.id}
        elementType={field.setup.elementType}
        elementConfig={field.setup.elementConfig}
        value={field.setup.value}
        change={(e) => this.inputChangeHandler(e, field.id)}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button Btntype="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
