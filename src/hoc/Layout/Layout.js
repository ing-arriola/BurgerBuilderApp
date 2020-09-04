import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    let toggleState = !this.state.showSideDrawer;
    this.setState({ showSideDrawer: toggleState });
  };

  showMenuHandler = () => {
    let menuState = this.state.showSideDrawer;
    this.setState({ showSideDrawer: !menuState });
  };

  render() {
    return (
      <Aux>
        <Toolbar auth={this.props.notAuth} showMenu={this.showMenuHandler} />
        <main className={classes.Content}>{this.props.children}</main>
        <SideDrawer
          auth={this.props.notAuth}
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notAuth: state.auth.token == null,
  };
};

export default connect(mapStateToProps)(Layout);
