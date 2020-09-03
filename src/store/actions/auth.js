import * as types from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: types.AUTH_START,
  };
};

export const authSuccess = (tokenReceived, idReceived) => {
  return {
    type: types.AUTH_SUCCESS,
    token: tokenReceived,
    id: idReceived,
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
    const apiKey = "apikey";
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;

    if (doSignIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        apiKey;
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
