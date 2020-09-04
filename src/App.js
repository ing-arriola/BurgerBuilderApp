import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder";
import Checkout from "./components/containers/Checkout/Checkout";
import Orders from "./components/containers/Orders/burgerBuilder";
import Auth from "./components/containers/Auth/Auth";
import Logout from "./components/containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Auth path="/auth" component={Auth} />
            <Logout path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
