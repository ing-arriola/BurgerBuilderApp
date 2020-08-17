import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.response.use(null, (err) => {
        this.setState({ error: err });
      });
    }

    render() {
      return (
        <Aux>
          <Modal>Whoooops!!! Something went wrong :(</Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorHandler;
