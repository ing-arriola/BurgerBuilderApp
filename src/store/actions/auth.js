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
export const auth = (emailReceived, passwordReceived, doSignIn) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: emailReceived,
      password: passwordReceived,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxQsw3sRa8kzoA8Qr-wSUY8_cJxm8R4TY";

    if (doSignIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxQsw3sRa8kzoA8Qr-wSUY8_cJxm8R4TY";
    }
    axios
      .post(url, authData)
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
