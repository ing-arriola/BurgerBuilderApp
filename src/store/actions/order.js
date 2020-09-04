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

export const purchase = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
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

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err,
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`/orders.json${queryParams}`)
      .then((ans) => {
        const ordersFromDb = [];
        for (let key in ans.data) {
          ordersFromDb.push({
            ...ans.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(ordersFromDb));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
