import React from "react";
import classes from "./BurgerIngredients.css";
const BurgerIngredients = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
    case "meat":
      ingredient = <div className={classes.Meat}></div>;
    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
    case "bacon":
      ingredient = <div className={classes.Bacon}></div>;
    case "salad":
      ingredient = <div className={classes.Salad}></div>;
    default:
      ingredient = null;
  }
  return ingredient;
};

export default BurgerIngredients;
