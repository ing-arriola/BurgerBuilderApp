import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder";
class App extends Component {
  render() {
    return (
      <div>
        <BurgerBuilder />
      </div>
    );
  }
}

export default App;
