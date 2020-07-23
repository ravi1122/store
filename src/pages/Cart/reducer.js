import {
  GET_CART_DATA_REQUEST,
  GET_CART_DATA_SUCCESS,
  GET_CART_DATA_FAILURE,
  UPDATE_PROD_QUANTITY_REQUEST,
  UPDATE_PROD_QUANTITY_SUCCESS,
  UPDATE_PROD_QUANTITY_FAILURE,
} from "./actions";

import { ON_PURCHASE_ORDER_SUCCESS } from "../../store/actionTypes";

const initCartDataState = {
  inProgress: false,
  data: [],
  error: null,
};
export default function cartData(state = initCartDataState, action) {
  switch (action.type) {
    case GET_CART_DATA_REQUEST:
      return { ...state, inProgress: true };
    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case GET_CART_DATA_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    case UPDATE_PROD_QUANTITY_REQUEST:
      return { ...state, inProgress: true };
    case UPDATE_PROD_QUANTITY_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case UPDATE_PROD_QUANTITY_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    // On purchase empty your cart
    case ON_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: [],
      };
    default:
      return state;
  }
}
