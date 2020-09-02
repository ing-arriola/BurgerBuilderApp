import React, { Component } from "react";
import Order from "../Order/Order";
import axios from "../../../orders";
import errorHandler from "../../../hoc/errorHandler/errorHandler";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((ans) => {
        const ordersFromDb = [];
        for (let key in ans.data) {
          ordersFromDb.push({
            ...ans.data[key],
            id: key,
          });
        }
        console.log(ordersFromDb);
        this.setState({ loading: false, orders: ordersFromDb });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const data = this.state.orders;
    const listItems = data.map((ord) => (
      <Order key={ord.id} price={ord.price} ingredients={ord.ingredient} />
    ));
    return <div>{listItems}</div>;
  }
}

export default Orders;
