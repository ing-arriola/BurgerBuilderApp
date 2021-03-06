import React, { useState, useEffect } from "react";
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

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    props.onIngredientsInit();
  }, []);

  const updatePurchaseState = (ingredients) => {
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

  const purchasingHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onAuthRedirect("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onPurchase();
    props.history.push("/checkout");
  };

  //If some ingredient's amount is 0, then it will be necessary to disable its button
  const disabledInfo = {
    ...props.localIngredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let order = null;

  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.localIngredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.localIngredients} />
        <BuildControls
          ingredientsAdded={props.onIngredientAdded}
          ingredientsRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.localIngredients)}
          price={props.totalPrice}
          ordered={purchasingHandler}
          auth={props.isAuth}
        />
      </Aux>
    );
    order = (
      <OrderSummary
        ingredients={props.localIngredients}
        cancelled={purchaseCancelHandler}
        goAhead={purchaseContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <div>
      <Aux>
        <Modal show={purchasing} closed={purchaseCancelHandler}>
          {order}
        </Modal>
        {burger}
      </Aux>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    localIngredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispathtoProps = (dispatch) => {
  return {
    onIngredientAdded: (name) => dispatch(burgerActions.addIngredient(name)),
    onIngredientRemoved: (name) =>
      dispatch(burgerActions.removeIngredients(name)),
    onIngredientsInit: () => dispatch(burgerActions.initialIngredients()),
    onPurchase: () => dispatch(burgerActions.purchaseInit()),
    onAuthRedirect: (path) => dispatch(burgerActions.setAuthRedirPath(path)),
  };
};

export default connect(
  mapStatetoProps,
  mapDispathtoProps
)(errorHandler(BurgerBuilder, axios));
