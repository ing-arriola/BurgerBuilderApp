import * as types from "./actionTypes";

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
export const auth = (email, password) => {
  console.log(email);
  return (dispatch) => {
    dispatch(authStart());
    //TODO...
  };
};
