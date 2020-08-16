import React, { Component } from "react";
import Aux from "../Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  showMenuHandler = () => {
    let menuState = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !menuState });
  };

  render() {
    return (
      <Aux>
        <Toolbar showMenu={this.showMenuHandler} />
        <main className={classes.Content}>{this.props.children}</main>
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
      </Aux>
    );
  }
}

export default Layout;
