import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 2,
      cheese: 1,
      bacon: 2,
    },
  };

  componentDidMount() {
    const data = new URLSearchParams(this.props.location.search);
    console.log(data.entries());
    const ingredientsTobeAdded = {};
    for (let param of data.entries()) {
      ingredientsTobeAdded[param[0]] = +param[1];
    }
    console.log(ingredientsTobeAdded);
    this.setState({ ingredients: ingredientsTobeAdded });
  }

  checkoutCancelledHandler = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
