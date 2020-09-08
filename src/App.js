import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import asynComponents from "./hoc/asyncComponent/asynComponent";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder";
import Logout from "./components/containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const asynCheckout = asynComponents(() => {
  return import("./components/containers/Checkout/Checkout");
});
const asynOrders = asynComponents(() => {
  return import("./components/containers/Orders/burgerBuilder");
});
const asynAuth = asynComponents(() => {
  return import("./components/containers/Auth/Auth");
});

const App = (props) => {
  useEffect(() => {
    props.onCheckAuthState();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={asynAuth} />
      <Route path="/" component={BurgerBuilder} />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asynCheckout} />
        <Route path="/orders" component={asynOrders} />
        <Logout path="/logout" component={Logout} />
        <Route path="/auth" component={asynAuth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
