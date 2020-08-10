import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../Burger/BuildConrols/BuilControls";
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };
  render() {
    return (
      <div>
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls />
        </Aux>
      </div>
    );
  }
}

export default BurgerBuilder;
