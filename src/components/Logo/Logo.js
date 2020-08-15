import React from "react";
import burgerLogo from "../../Assets/Images/burger-logo.png";
import classses from "./Logo.css";
const Logo = (props) => {
  return (
    <div className={classses.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="A burger" />
    </div>
  );
};

export default Logo;
