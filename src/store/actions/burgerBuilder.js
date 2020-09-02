import * as actionTypes from "./actionTypes";
import axios from "../../orders";
export const addIngredient = (name) => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName: name };
};
export const removeIngredients = (name) => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: name };
};

//Synchronous
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    burgerIngredients: ingredients,
  };
};

export const fectchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

//Asynchronous
export const initialIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://burgerbuilder-96fd2.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fectchIngredientsFailed());
      });
  };
};
