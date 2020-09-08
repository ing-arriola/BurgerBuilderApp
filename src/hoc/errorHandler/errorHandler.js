import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";

const errorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    }, []);

    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    }, [reqInterceptor, resInterceptor]);

    const errorDelete = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal closed={errorDelete} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default errorHandler;
