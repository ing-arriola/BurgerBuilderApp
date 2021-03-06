import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationsItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToogle/DrawerToogle";
const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.showMenu} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationsItems authenticated={props.auth} />
      </nav>
    </header>
  );
};

export default Toolbar;
