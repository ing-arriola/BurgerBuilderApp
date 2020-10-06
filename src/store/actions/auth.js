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

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: types.AUTH_LOGOUT,
  };
};

export const setAuthRedirPath = (pathReceived) => {
  return {
    type: types.SET_AUTH_REDIR_PATH,
    path: pathReceived,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token, localStorage.getItem("userId")));
    }
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

    let secret;

    if (process.env.NODE_ENV !== "production") {
      secret = process.env.REACT_APP_FIREBASE;
      console.log(process.env);
    } else {
      secret = process.env.FIREBASE_SECRET;
    }
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_FIREBASE);
    const apiKey = secret;
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
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
