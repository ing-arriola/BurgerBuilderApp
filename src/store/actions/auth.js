import * as types from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: types.AUTH_START,
  };
};

export const authSuccess = (authDataReceived) => {
  return {
    type: types.AUTH_SUCCESS,
    authData: authDataReceived,
  };
};

export const authFail = (errorReceived) => {
  return {
    type: types.AUTH_FAIL,
    error: errorReceived,
  };
};

//Async
export const auth = (emailReceived, passwordReceived) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: emailReceived,
      password: passwordReceived,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API KEY]",
        authData
      )
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
