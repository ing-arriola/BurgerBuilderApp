import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../Burger/BuildConrols/BuilControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
import axios from "../../orders";
import Spinner from "../UI/Spinner/Spinner";
import errorHandler from "../../hoc/errorHandler/errorHandler";
import * as burgerActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onIngredientsInit();
  }

  updatePurchaseState = (ingredients) => {
    //Here first of all I access the copy of the ingredents and I turned this object into an array
    //with Object.keys but that return the name of the ingredients but actually I need the number of each ingredient
    //So I map every element in the first array (names) into the ingredients object to get the number of each ingredients
    //finally I add all the ingredients with reduce to know if the customer has been purchased some ingredients wich will turn
    //the burger into a purchasable element :)
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((total, el) => {
        return total + el;
      });
    return sum > 0;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    //If some ingredient's amount is 0, then it will be necessary to disable its button
    const disabledInfo = {
      ...this.props.localIngredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let order = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.localIngredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.localIngredients} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.localIngredients)}
            price={this.props.totalPrice}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      order = (
        <OrderSummary
          ingredients={this.props.localIngredients}
          cancelled={this.purchaseCancelHandler}
          goAhead={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    return (
      <div>
        <Aux>
          <Modal
            show={this.state.purchasing}
            closed={this.purchaseCancelHandler}
          >
            {order}
          </Modal>
          {burger}
        </Aux>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    localIngredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispathtoProps = (dispatch) => {
  return {
    onIngredientAdded: (name) => dispatch(burgerActions.addIngredient(name)),
    onIngredientRemoved: (name) =>
      dispatch(burgerActions.removeIngredients(name)),
    onIngredientsInit: () => dispatch(burgerActions.initialIngredients()),
  };
};

export default connect(
  mapStatetoProps,
  mapDispathtoProps
)(errorHandler(BurgerBuilder, axios));
