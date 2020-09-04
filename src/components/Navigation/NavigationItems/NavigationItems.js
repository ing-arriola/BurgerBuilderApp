import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.authenticated ? null : (
        <NavigationItem link="/orders">Orders</NavigationItem>
      )}
      {props.authenticated ? (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/Logout">Log out</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
