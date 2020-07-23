import {
  getCartData as _getCartData,
  updateItemQuantity as _updateItemQuantity,
} from "../../server";

import { SHOW_LOADER, HIDE_LOADER } from "../../store/actionTypes";

export const GET_CART_DATA_REQUEST = "GET_CART_DATA_REQUEST";
export const GET_CART_DATA_SUCCESS = "GET_CART_DATA_SUCCESS";
export const GET_CART_DATA_FAILURE = "GET_CART_DATA_FAILURE";

export const UPDATE_PROD_QUANTITY_REQUEST = "UPDATE_PROD_QUANTITY_REQUEST";
export const UPDATE_PROD_QUANTITY_SUCCESS = "UPDATE_PROD_QUANTITY_SUCCESS";
export const UPDATE_PROD_QUANTITY_FAILURE = "UPDATE_PROD_QUANTITY_FAILURE";

export function getCartData() {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: GET_CART_DATA_REQUEST });

    return _getCartData()
      .then((resp) => {
        dispatch({ type: GET_CART_DATA_SUCCESS, payload: resp.data });
        dispatch({ type: HIDE_LOADER });
      })
      .catch((err) => {
        dispatch({ type: GET_CART_DATA_FAILURE, payload: err.error });
        dispatch({ type: HIDE_LOADER });
      });
  };
}

export function updateItemQuantity(data) {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER });
    dispatch({ type: UPDATE_PROD_QUANTITY_REQUEST });

    return _updateItemQuantity(data)
      .then((resp) => {
        dispatch({ type: UPDATE_PROD_QUANTITY_SUCCESS, payload: resp.data });
        dispatch({ type: HIDE_LOADER });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_PROD_QUANTITY_FAILURE, payload: err.error });
        dispatch({ type: HIDE_LOADER });
      });
  };
}
