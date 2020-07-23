import { getPropductDetails as _getPropductDetails } from "../../server";

export const GET_PRODUCT_DETAILS_SUCCESS = "GET_PRODUCT_DETAILS_SUCCESS";
export const GET_PRODUCT_DETAILS_FAILURE = "GET_PRODUCT_DETAILS_FAILURE";
export const GET_PRODUCT_DETAILS_REQUEST = "GET_PRODUCT_DETAILS_REQUEST";

export function getPropductDetails(sku) {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    return _getPropductDetails(sku)
      .then((resp) => {
        dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: GET_PRODUCT_DETAILS_FAILURE, payload: err.error });
      });
  };
}
