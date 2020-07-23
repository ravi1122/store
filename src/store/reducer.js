import _get from "lodash/get";

import {
  SHOW_LOADER,
  HIDE_LOADER,
  GET_PRODTUCT_LIST_REQUEST,
  GET_PRODTUCT_LIST_SUCCESS,
  GET_PRODTUCT_LIST_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  ADD_TO_FAV_REQUEST,
  ADD_TO_FAV_SUCCESS,
  ADD_TO_FAV_FAILURE,
  REMOVE_FROM_FAV_REQUEST,
  REMOVE_FROM_FAV_SUCCESS,
  REMOVE_FROM_FAV_FAILURE,
  COMMON_SORT_ORDER_CHANGE,
  COMMON_PROD_FILTER_CHANGE,
  ON_PURCHASE_ORDER_REQUEST,
  ON_PURCHASE_ORDER_SUCCESS,
  ON_PURCHASE_ORDER_FAILURE,
  SET_USER_CART,
  SET_USER_FAV_LIST,
  SET_USER_ORDERS,
} from "./actionTypes";

const initialInventoryState = {
  inProgress: false,
  data: [],
  err: null,
};

export function inventory(state = initialInventoryState, action) {
  switch (action.type) {
    case GET_PRODTUCT_LIST_REQUEST:
      return { ...state, inProgress: true };
    case GET_PRODTUCT_LIST_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case GET_PRODTUCT_LIST_FAILURE:
      return { ...state, inProgress: false, err: action.payload };
    default:
      return state;
  }
}

export function spinner(state = false, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return state;
  }
}

const initialCartState = {
  inProgress: false,
  data: [],
  err: null,
};
export function cart(state = initialCartState, action) {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, inProgress: true };
    case ADD_TO_CART_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case ADD_TO_CART_FAILURE:
      return { ...state, inProgress: false, err: action.payload };
    case REMOVE_FROM_CART_REQUEST:
      return { ...state, inProgress: true };
    case REMOVE_FROM_CART_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case REMOVE_FROM_CART_FAILURE:
      return { ...state, inProgress: false, err: action.payload };
    case ON_PURCHASE_ORDER_SUCCESS:
      return { ...state, inProgress: false, data: [] };
    case SET_USER_CART:
      return { ...state, inProgress: false, data: action.payload };
    default:
      return state;
  }
}

const initialFavListState = {
  inProgress: false,
  data: [],
  err: null,
};
export function favList(state = initialFavListState, action) {
  switch (action.type) {
    case ADD_TO_FAV_REQUEST:
      return { ...state, inProgress: true };
    case ADD_TO_FAV_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case ADD_TO_FAV_FAILURE:
      return { ...state, inProgress: false, err: action.payload };
    case REMOVE_FROM_FAV_REQUEST:
      return { ...state, inProgress: true };
    case REMOVE_FROM_FAV_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case REMOVE_FROM_FAV_FAILURE:
      return { ...state, inProgress: false, err: action.payload };
    case SET_USER_FAV_LIST:
      return { ...state, inProgress: false, data: action.payload };
    default:
      return state;
  }
}

const initialCommonState = {
  currentSortOrder: 0,
  filterOpts: {},
};
export function common(state = initialCommonState, action) {
  switch (action.type) {
    case COMMON_SORT_ORDER_CHANGE:
      return { ...state, currentSortOrder: action.payload };
    case COMMON_PROD_FILTER_CHANGE:
      return {
        ...state,
        filterOpts: { ...state.filterOpts, ...action.payload },
      };
    default:
      return state;
  }
}

const initialMyOrdersState = {
  inProgress: false,
  data: [],
  err: null,
};
export function myOrders(state = initialMyOrdersState, action) {
  switch (action.type) {
    case ON_PURCHASE_ORDER_REQUEST:
      return { ...state, inProgress: true };
    case ON_PURCHASE_ORDER_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case ON_PURCHASE_ORDER_FAILURE:
      return { ...state, inProgress: false, err: action.payload };
    case SET_USER_ORDERS:
      return { ...state, inProgress: false, data: action.payload };
    default:
      return state;
  }
}
