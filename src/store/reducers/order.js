import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (actionTypes) {
    case actionTypes.PURCHASE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
