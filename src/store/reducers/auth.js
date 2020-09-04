import * as types from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case types.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.token,
        userId: action.id,
        error: null,
        loading: false,
      });
    case types.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    case types.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null,
      });
    case types.SET_AUTH_REDIR_PATH:
      return updateObject(state, { authRedirPath: action.path });
    default:
      return state;
  }
};

export default reducer;
