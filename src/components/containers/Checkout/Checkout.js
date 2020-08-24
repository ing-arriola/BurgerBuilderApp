import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const data = new URLSearchParams(this.props.location.search);
    console.log(data.entries());
    const ingredientsTobeAdded = {};
    let price = 0;
    for (let param of data.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredientsTobeAdded[param[0]] = +param[1];
      }
    }
    console.log(ingredientsTobeAdded);
    this.setState({ ingredients: ingredientsTobeAdded, totalPrice: price });
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
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
