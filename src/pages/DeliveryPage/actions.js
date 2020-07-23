import {
  saveNewAddress as _saveNewAddress,
  updateAddress as _updateAddress,
  deleteAddress as _deleteAddress,
  getAddresses as _getAddresses,
  onSelectDelveryAddress as _onSelectDelveryAddress,
} from "../../server";

export const SAVE_NEW_ADDRESS_REQUEST = "SAVE_NEW_ADDRESS_REQUEST";
export const SAVE_NEW_ADDRESS_SUCCESS = "SAVE_NEW_ADDRESS_SUCCESS";
export const SAVE_NEW_ADDRESS_FAILURE = "SAVE_NEW_ADDRESS_FAILURE";

export const UPDATE_ADDRESS_REQUEST = "UPDATE_ADDRESS_REQUEST";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_FAILURE = "UPDATE_ADDRESS_FAILURE";

export const DELETE_ADDRESS_REQUEST = "DELETE_ADDRESS_REQUEST";
export const DELETE_ADDRESS_SUCCESS = "DELETE_ADDRESS_SUCCESS";
export const DELETE_ADDRESS_FAILURE = "DELETE_ADDRESS_FAILURE";

export const SELECT_DELIVERY_ADDRESS_REQUEST =
  "SELECT_DELIVERY_ADDRESS_REQUEST";
export const SELECT_DELIVERY_ADDRESS_SUCCESS =
  "SELECT_DELIVERY_ADDRESS_SUCCESS";
export const SELECT_DELIVERY_ADDRESS_FAILURE =
  "SELECT_DELIVERY_ADDRESS_FAILURE";

export const USER_GET_ADDRESSES_REQUEST = "USER_GET_ADDRESSES_REQUEST";
export const USER_GET_ADDRESSES_SUCCESS = "USER_GET_ADDRESSES_SUCCESS";
export const USER_GET_ADDRESSES_FAILURE = "USER_GET_ADDRESSES_FAILURE";

export const getAddresses = () => {
  return (dispatch) => {
    dispatch({ type: USER_GET_ADDRESSES_REQUEST });

    return _getAddresses()
      .then((resp) => {
        dispatch({ type: USER_GET_ADDRESSES_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: USER_GET_ADDRESSES_FAILURE, payload: resp.error });
      });
  };
};

export const saveNewAddress = (address) => {
  return (dispatch) => {
    dispatch({ type: SAVE_NEW_ADDRESS_REQUEST });

    return _saveNewAddress(address)
      .then((resp) => {
        dispatch({ type: SAVE_NEW_ADDRESS_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: SAVE_NEW_ADDRESS_FAILURE, payload: resp.error });
      });
  };
};

export const updateAddress = (address) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });

    return _updateAddress(address)
      .then((resp) => {
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: resp.error });
      });
  };
};

export const deleteAddress = (address) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });

    return _deleteAddress(address)
      .then((resp) => {
        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: DELETE_ADDRESS_FAILURE, payload: resp.error });
      });
  };
};

export const onSelectDelveryAddress = (address) => {
  return (dispatch) => {
    dispatch({ type: SELECT_DELIVERY_ADDRESS_REQUEST });

    return _onSelectDelveryAddress(address)
      .then((resp) => {
        dispatch({ type: SELECT_DELIVERY_ADDRESS_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({
          type: SELECT_DELIVERY_ADDRESS_FAILURE,
          payload: resp.error,
        });
      });
  };
};
