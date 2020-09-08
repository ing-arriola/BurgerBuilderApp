import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const showMenuHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar auth={props.notAuth} showMenu={showMenuHandler} />
      <main className={classes.Content}>{props.children}</main>
      <SideDrawer
        auth={props.notAuth}
        show={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    notAuth: state.auth.token === null,
  };
};

export default connect(mapStateToProps)(Layout);
