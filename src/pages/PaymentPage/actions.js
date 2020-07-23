import {
  getCards as _getCards,
  saveNewCard as _saveNewCard,
  updateCard as _updateCard,
  deleteCard as _deleteCard,
  setPaymentMethod as _setPaymentMethod,
} from "../../server";

export const GET_CARDS_REQUEST = "GET_CARDS_REQUEST";
export const GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS";
export const GET_CARDS_FAILURE = "GET_CARDS_FAILURE";

export const SAVE_NEW_CARD_REQUEST = "SAVE_NEW_CARD_REQUEST";
export const SAVE_NEW_CARD_SUCCESS = "SAVE_NEW_CARD_SUCCESS";
export const SAVE_NEW_CARD_FAILURE = "SAVE_NEW_CARD_FAILURE";

export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST";
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE";

export const DELETE_CARD_REQUEST = "DELETE_CARD_REQUEST";
export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export const DELETE_CARD_FAILURE = "DELETE_CARD_FAILURE";

export const SELECT_PAYMENT_METHOD_REQUEST = "SELECT_PAYMENT_METHOD_REQUEST";
export const SELECT_PAYMENT_METHOD_SUCCESS = "SELECT_PAYMENT_METHOD_SUCCESS";
export const SELECT_PAYMENT_METHOD_FAILURE = "SELECT_PAYMENT_METHOD_FAILURE";

export const getCards = () => {
  return (dispatch) => {
    dispatch({ type: GET_CARDS_REQUEST });

    return _getCards()
      .then((resp) => {
        dispatch({ type: GET_CARDS_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: GET_CARDS_FAILURE, payload: resp.error });
      });
  };
};
export const saveNewCard = (card) => {
  return (dispatch) => {
    dispatch({ type: SAVE_NEW_CARD_REQUEST });

    return _saveNewCard(card)
      .then((resp) => {
        dispatch({ type: SAVE_NEW_CARD_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: SAVE_NEW_CARD_FAILURE, payload: resp.error });
      });
  };
};

export const updateCard = (card) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_CARD_REQUEST });

    return _updateCard(card)
      .then((resp) => {
        dispatch({ type: UPDATE_CARD_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_CARD_FAILURE, payload: resp.error });
      });
  };
};

export const deleteCard = (card) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CARD_REQUEST });

    return _deleteCard(card)
      .then((resp) => {
        dispatch({ type: DELETE_CARD_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: DELETE_CARD_FAILURE, payload: resp.error });
      });
  };
};
export const setPaymentMethod = (card) => {
  return (dispatch) => {
    dispatch({ type: SELECT_PAYMENT_METHOD_REQUEST });

    return _setPaymentMethod(card)
      .then((resp) => {
        dispatch({ type: SELECT_PAYMENT_METHOD_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: SELECT_PAYMENT_METHOD_FAILURE, payload: resp.error });
      });
  };
};
