import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../../store/actions/index";

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
        elementType: "password",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        value: "",
        validation: { required: "true", minlength: 8 },
        valid: false,
      },
    },
    isSignUp: true,
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

  submitForm = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.email.value,
      this.state.isSignUp
    );
  };

  switchAuthMode = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
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
        <p>{this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</p>
        <form onSubmit={this.submitForm}>
          {form}
          <Button Btntype="AuthSuccess">Submit</Button>
        </form>
        <Button clicked={this.switchAuthMode} Btntype="Danger">
          {this.state.isSignUp ? "SWITCH TO SIGN UP" : "SWITCH TO SIGN IN"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, signUp) =>
      dispatch(actions.auth(email, password, signUp)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
