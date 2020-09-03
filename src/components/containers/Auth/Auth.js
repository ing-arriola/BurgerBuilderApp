import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

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

  inputChangeHandler = (e, id) => {
    console.log(e);
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
      <div>
        <form>
          {form}
          <Button Btntype="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
