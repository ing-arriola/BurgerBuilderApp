import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../Order/Order";
import axios from "../../../orders";
import errorHandler from "../../../hoc/errorHandler/errorHandler";
import * as actions from "../../../store/actions/index";
import Spinner from "../../UI/Spinner/Spinner";

export class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      const data = this.props.orders;
      orders = data.map((ord) => (
        <Order key={ord.id} price={ord.price} ingredients={ord.ingredient} />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
