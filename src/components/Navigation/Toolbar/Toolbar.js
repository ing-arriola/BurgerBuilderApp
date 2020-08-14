import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationsItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo />
      <nav>
        <NavigationsItems />
      </nav>
    </header>
  );
};

export default Toolbar;
