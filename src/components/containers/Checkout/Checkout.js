import React, { Component } from "react";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 2,
      cheese: 1,
      bacon: 2,
    },
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;