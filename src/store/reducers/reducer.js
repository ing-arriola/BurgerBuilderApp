import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 0.8,
  bacon: 0.6,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const newIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(state.ingredients, newIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const removedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const ingredientsWithOneRemoved = updateObject(
        state.ingredients,
        removedIngredient
      );
      const newState = {
        ingredients: ingredientsWithOneRemoved,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(state, newState);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        totalPrice: 2,
        ingredients: {
          salad: action.burgerIngredients.salad,
          bacon: action.burgerIngredients.bacon,
          cheese: action.burgerIngredients.cheese,
          meat: action.burgerIngredients.meat,
        },
        error: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
