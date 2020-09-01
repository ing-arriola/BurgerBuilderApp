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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    //ingredients: null,
    //totalPrice: 2,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    /*axios
      .get("https://burgerbuilder-96fd2.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });*/
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
    this.setState({ purchasable: sum > 0 });
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    /*
    
      });*/
    const queryParams = [];
    for (let ingredient in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(ingredient)}=${
          this.state.ingredients[ingredient]
        }`
      );
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
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

    let burger = this.state.error ? (
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
            purchasable={this.state.purchasable}
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
    if (this.state.loading) {
      order = <Spinner />;
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
    localIngredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispathtoProps = (dispatch) => {
  return {
    onIngredientAdded: (name) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
    onIngredientRemoved: (name) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name }),
  };
};

export default connect(
  mapStatetoProps,
  mapDispathtoProps
)(errorHandler(BurgerBuilder, axios));
