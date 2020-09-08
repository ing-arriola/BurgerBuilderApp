import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../../store/actions/index";

const Auth = (props) => {
  const [controls, setControls] = useState({
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
  });

  const [isSignUp, setIsSignUp] = useState(true); //I think the user has already an account created on firebase

  useEffect(() => {
    if (!props.building && props.authRedirPath !== "/") {
      props.onChangeAuthPath();
    }
  }),
    [];

  const checkFormField = (fieldValue, rules) => {
    let valid = false;
    if (rules.required) {
      valid = fieldValue.trim() !== "";
    }
    return valid;
  };

  const inputChangeHandler = (e, controlName) => {
    const controlsUpdated = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: e.target.value,
        valid: checkFormField(e.target.value, controls[controlName].validation),
      },
    };
    setControls(controlsUpdated);
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.email.value, isSignUp);
  };

  const switchAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const elementsForms = [];
  for (let element in controls) {
    elementsForms.push({
      id: element,
      setup: controls[element],
    });
  }

  let form = elementsForms.map((field) => (
    <Input
      key={field.id}
      elementType={field.setup.elementType}
      elementConfig={field.setup.elementConfig}
      value={field.setup.value}
      change={(e) => inputChangeHandler(e, field.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let beRedirected = null;
  if (props.isAuth) {
    beRedirected = <Redirect to={props.authRedirPath} />;
  }

  return (
    <div>
      <div classes={classes.alignSignIn}>
        {beRedirected}
        <Button clicked={switchAuthMode} Btntype="Auth">
          {isSignUp ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>
      <div className={classes.Auth}>
        {errorMessage}
        <p>{isSignUp ? "SIGN IN" : "SIGN UP"}</p>
        <form onSubmit={submitForm}>
          {form}
          <Button Btntype="AuthSuccess">Submit</Button>
        </form>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirPath: state.auth.authRedirPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, signUp) =>
      dispatch(actions.auth(email, password, signUp)),
    onChangeAuthPath: () => dispatch(actions.setAuthRedirPath("/")),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Auth);
