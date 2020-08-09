import React, { Component } from "react";
import classes from "./BurgerIngredients.css";
import PropTypes from "prop-types";

class BurgerIngredients extends Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
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
  }
}

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
