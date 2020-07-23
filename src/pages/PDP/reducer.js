import {
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_REQUEST,
} from "./actions";

const initPdpState = {
  inProgress: false,
  data: {},
  error: null,
};
export default function pdp(state = initPdpState, action) {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return { ...state, inProgress: true };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return { ...state, inProgress: false, data: action.payload };
    case GET_PRODUCT_DETAILS_FAILURE:
      return { ...state, inProgress: false, error: action.payload };
    default:
      return state;
  }
}
