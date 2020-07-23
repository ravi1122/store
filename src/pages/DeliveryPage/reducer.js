import {
  SAVE_NEW_ADDRESS_REQUEST,
  SAVE_NEW_ADDRESS_SUCCESS,
  SAVE_NEW_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  SELECT_DELIVERY_ADDRESS_REQUEST,
  SELECT_DELIVERY_ADDRESS_SUCCESS,
  SELECT_DELIVERY_ADDRESS_FAILURE,
  USER_GET_ADDRESSES_REQUEST,
  USER_GET_ADDRESSES_SUCCESS,
  USER_GET_ADDRESSES_FAILURE,
} from "./actions";

import { SET_USER_ADDRESSES } from "../../store/actionTypes";

const initAddrState = {
  inProgress: false,
  data: [],
  deliveryAddress: null,
  err: null,
};

export default function myAddresses(state = initAddrState, action) {
  switch (action.type) {
    case SAVE_NEW_ADDRESS_REQUEST:
      return { ...state, inProgress: true };
    case SAVE_NEW_ADDRESS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case SAVE_NEW_ADDRESS_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, inProgress: true };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case DELETE_ADDRESS_REQUEST:
      return { ...state, inProgress: true };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case SET_USER_ADDRESSES:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case SELECT_DELIVERY_ADDRESS_REQUEST:
      return { ...state, inProgress: true };
    case SELECT_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        deliveryAddress: action.payload,
      };
    case SELECT_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case USER_GET_ADDRESSES_REQUEST:
      return {
        ...state,
        inProgress: true,
      };
    case USER_GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case USER_GET_ADDRESSES_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    default:
      return state;
  }
}
