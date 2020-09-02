import * as actionTypes from "./actionTypes";
import axios from "../../orders";

//Synchronous actions
export const purchaseSuccess = (id, orderDataReceived) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderDataReceived,
  };
};
export const purchaseFail = (errorReceived) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: errorReceived,
  };
};

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START,
  };
};

//Asynchronous

export const purchase = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseStart());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        dispatchEvent(purchaseSuccess(res.data, orderData));
        //this.props.history.push("/");
      })
      .catch((err) => {
        dispatch(purchaseFail(err));
        console.log(err);
      });
  };
};
