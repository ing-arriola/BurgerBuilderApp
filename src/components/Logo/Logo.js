import React from "react";
import burgerLogo from "../../Assets/Images/burger-logo.png";
import classses from "./Logo.css";
const Logo = (props) => {
  return (
    <div className={classses.Logo}>
      <img src={burgerLogo} alt="A burger" />
    </div>
  );
};

export default Logo;
