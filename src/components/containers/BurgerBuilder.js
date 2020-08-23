import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../Burger/BuildConrols/BuilControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
import axios from "../../orders";
import Spinner from "../UI/Spinner/Spinner";
import errorHandler from "../../hoc/errorHandler/errorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 0.8,
  bacon: 0.6,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://burgerbuilder-96fd2.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
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

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
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
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  render() {
    //If some ingredient's amount is 0, then it will be necessary to disable its button
    const disabledInfo = {
      ...this.state.ingredients,
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

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      order = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelled={this.purchaseCancelHandler}
          goAhead={this.purchaseContinueHandler}
          price={this.state.totalPrice}
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

export default errorHandler(BurgerBuilder, axios);
