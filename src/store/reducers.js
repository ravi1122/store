import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import counter from "../pages/Counter/reducer";
import { inventory, spinner, cart, favList, common, myOrders } from "./reducer";
import { sessionReducer } from "./session";
import pdp from "../pages/PDP/reducer";
import cartData from "../pages/Cart/reducer";
import myAddresses from "../pages/DeliveryPage/reducer";
import myCards from "../pages/PaymentPage/reducer";

export default (history) =>
  combineReducers({
    counter,
    spinner,
    inventory,
    cart,
    favList,
    common,
    pdp,
    cartData,
    myAddresses,
    myCards,
    myOrders,
    user: sessionReducer,
    router: connectRouter(history),
  });
