import _get from "lodash/get";
import { push } from "connected-react-router";

import {
  login as _login,
  logout as _logout,
  register as _register,
  autoLogin as _autoLogin,
} from "../server";

import {
  SHOW_LOADER,
  HIDE_LOADER,
  USER_AUTO_LOGIN_REQUEST,
  USER_AUTO_LOGIN_SUCCESS,
  USER_AUTO_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  SET_USER_CART,
  SET_USER_CARDS,
  SET_USER_ORDERS,
  SET_USER_FAV_LIST,
  SET_USER_ADDRESSES,
  USER_UPDATE_CART_COUNT,
} from "./actionTypes";

export const autoLogin = (query) => {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: USER_AUTO_LOGIN_REQUEST });

    return _autoLogin(query)
      .then((resp) => {
        if (resp.status === 200) {
          const res = _get(resp, ["data"], {});

          dispatch({
            type: USER_AUTO_LOGIN_SUCCESS,
            payload: { profile: res.profile, cartCount: res.cartCount },
          });
          dispatch({ type: SET_USER_CART, payload: _get(res, ["myCart"], []) });
          dispatch({
            type: SET_USER_CARDS,
            payload: _get(res, ["myCards"], []),
          });
          dispatch({
            type: SET_USER_ORDERS,
            payload: _get(res, ["myOrders"], []),
          });
          dispatch({
            type: SET_USER_FAV_LIST,
            payload: _get(res, ["myFavList"], []),
          });
          dispatch({
            type: SET_USER_ADDRESSES,
            payload: _get(res, ["myAddresses"], []),
          });
        } else {
          dispatch({
            type: USER_AUTO_LOGIN_FAILURE,
            payload: { message: resp.message },
          });
        }
      })
      .catch((err) => {
        dispatch({ type: USER_AUTO_LOGIN_FAILURE, payload: err });
      })
      .then(() => {
        dispatch({ type: HIDE_LOADER });
      });
  };
};

export const login = (profile) => {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: USER_LOGIN_REQUEST });

    return _login(profile)
      .then((resp) => {
        const res = _get(resp, "data", {});

        if (resp.status === 200) {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: res });

          // Return data for toast
          return { success: true, message: resp.message };
        } else {
          dispatch({ type: USER_LOGIN_FAILURE, payload: res });

          // Return data for toast
          return { success: false, message: resp.message };
        }
      })
      .catch((err) => {
        dispatch({ type: USER_LOGIN_FAILURE, payload: err });

        // Return data for toast
        return { success: false, message: err.message };
      })
      .then((r) => {
        dispatch({ type: HIDE_LOADER });

        // Return data for toast
        return r;
      });
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: USER_LOGOUT_REQUEST });

    return _logout()
      .then((resp) => {
        const res = _get(resp, "data", {});

        if (resp.status === 200) {
          dispatch({ type: USER_LOGOUT_SUCCESS, payload: res });

          // Reset all user-specific states
          dispatch({ type: SET_USER_CART, payload: [] });
          dispatch({ type: SET_USER_CARDS, payload: [] });
          dispatch({ type: SET_USER_ORDERS, payload: [] });
          dispatch({ type: SET_USER_FAV_LIST, payload: [] });
          dispatch({ type: SET_USER_ADDRESSES, payload: [] });

          // Return data for toast
          return { success: true, message: resp.message };
        } else {
          dispatch({ type: USER_LOGOUT_FAILURE, payload: res });

          // Return data for toast
          return { success: false, message: resp.message };
        }
      })
      .catch((err) => {
        dispatch({ type: USER_LOGOUT_FAILURE, payload: err });

        // Return data for toast
        return { success: false, message: err.message };
      })
      .then((r) => {
        dispatch(push("/")); // Redirect user to home page on logout
        dispatch({ type: HIDE_LOADER });

        // Return data for toast
        return r;
      });
  };
};
export const register = (profile) => {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: USER_REGISTER_REQUEST });

    return _register(profile)
      .then((resp) => {
        const res = _get(resp, "data", {});

        if (resp.status === 201) {
          dispatch({ type: USER_REGISTER_SUCCESS, payload: res });

          // Return data for toast
          return { success: true, message: resp.message };
        } else {
          dispatch({ type: USER_REGISTER_FAILURE, payload: res });

          // Return data for toast
          return { success: false, message: resp.message };
        }
      })
      .catch((err) => {
        dispatch({ type: USER_REGISTER_FAILURE, payload: err });

        // Return data for toast
        return { success: false, message: err.message };
      })
      .then((r) => {
        dispatch({ type: HIDE_LOADER });

        // Return data for toast
        return r;
      });
  };
};

const initUserState = {
  inProgress: false,
  isLoggedIn: false,
  cartCount: 0,
  profile: {},
  message: "",
  err: null,
};
export function sessionReducer(state = { ...initUserState }, action) {
  switch (action.type) {
    case USER_AUTO_LOGIN_REQUEST:
      return { ...state, inProgress: true };
    case USER_AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        profile: _get(action.payload, "profile", {}),
        cartCount: _get(action.payload, "cartCount", 0),
        message: "", // DON'T SHOW AUTO LOGIN MESSAGE
      };
    case USER_AUTO_LOGIN_FAILURE:
      return {
        ...state,
        inProgress: false,
        message: _get(action.payload, "message", ""),
      };

    case USER_LOGIN_REQUEST:
      return { ...initUserState, inProgress: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        profile: _get(action.payload, "profile", {}),
        cartCount: _get(action.payload, "cartCount", 0),
        message: _get(action.payload, "message", ""),
      };
    case USER_LOGIN_FAILURE:
      return {
        ...initUserState,
        inProgress: false,
        message: _get(action.payload, "message", ""),
      };

    case USER_LOGOUT_REQUEST:
      return { ...state, inProgress: true };
    case USER_LOGOUT_SUCCESS:
      return {
        ...initUserState,
        inProgress: false,
        message: _get(action.payload, "message", ""),
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        inProgress: false,
        message: _get(action.payload, "message", ""),
      };

    case USER_REGISTER_REQUEST:
      return { ...state, inProgress: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        profile: _get(action.payload, "profile", {}),
        message: _get(action.payload, "message", ""),
        cartCount: 0,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...initUserState,
        inProgress: false,
        message: _get(action.payload, "message", ""),
      };
    case USER_UPDATE_CART_COUNT:
      return {
        ...state,
        cartCount: action.payload,
      };
    default:
      return state;
  }
}
