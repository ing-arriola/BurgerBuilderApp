import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../Order/Order";
//import errorHandler from "../../../hoc/errorHandler/errorHandler";
import * as actions from "../../../store/actions/index";
import Spinner from "../../UI/Spinner/Spinner";

const Orders = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.id);
  }, [props.token, props.id]);

  let orders = <Spinner />;

  if (!props.loading) {
    const data = props.orders;
    orders = data.map((ord) => (
      <Order key={ord.id} price={ord.price} ingredients={ord.ingredient} />
    ));
  }

  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    id: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, id) => dispatch(actions.fetchOrders(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
