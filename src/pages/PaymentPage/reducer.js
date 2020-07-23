import {
  SAVE_NEW_CARD_REQUEST,
  SAVE_NEW_CARD_SUCCESS,
  SAVE_NEW_CARD_FAILURE,
  UPDATE_CARD_REQUEST,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  SELECT_PAYMENT_METHOD_REQUEST,
  SELECT_PAYMENT_METHOD_SUCCESS,
  SELECT_PAYMENT_METHOD_FAILURE,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILURE,
} from "./actions";

import { SET_USER_CARDS } from "../../store/actionTypes";

const initAddrState = {
  inProgress: false,
  paymentMethod: null,
  data: [],
  err: null,
};

export default function myCards(state = initAddrState, action) {
  switch (action.type) {
    case SAVE_NEW_CARD_REQUEST:
      return { ...state, inProgress: true };
    case SAVE_NEW_CARD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case SAVE_NEW_CARD_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case UPDATE_CARD_REQUEST:
      return { ...state, inProgress: true };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case UPDATE_CARD_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case DELETE_CARD_REQUEST:
      return { ...state, inProgress: true };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case DELETE_CARD_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case DELETE_CARD_REQUEST:
      return { ...state, inProgress: true };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case DELETE_CARD_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case SET_USER_CARDS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case SELECT_PAYMENT_METHOD_REQUEST:
      return { ...state, inProgress: true };
    case SELECT_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        paymentMethod: action.payload,
      };
    case SELECT_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    case GET_CARDS_REQUEST:
      return {
        ...state,
        inProgress: true,
      };
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.payload,
      };
    case GET_CARDS_FAILURE:
      return {
        ...state,
        inProgress: false,
        err: action.payload,
      };
    default:
      return state;
  }
}
