import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
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
