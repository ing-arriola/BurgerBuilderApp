import * as actionTypes from "./actionTypes";
import axios from "../../orders";
import * as actions from "../../store/actions/index";
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
        console.log(res.data);
        dispatch(purchaseSuccess(res.data.name, orderData));
        //this.props.history.push("/");
      })
      .catch((err) => {
        dispatch(purchaseFail(err));
        console.log(err);
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
