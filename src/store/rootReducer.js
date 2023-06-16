import { combineReducers } from "redux";
import { isAuthReducer } from "./reducers/authReducer";
import { usersReducer } from "./reducers/usersReducer";
import { aboutUsReducer } from "./reducers/aboutUsReducer";
import { contactUsReducer } from "./reducers/contactUsReducer";
import { subscribersReducer } from "./reducers/subscribersReducer";
import { infoReducer } from "./reducers/infoReducer";
import { bannersReducer } from "./reducers/bannersReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
import {orderReducer} from "./reducers/orderReducer"
import {deleveryReducer} from "./reducers/deleveryReducer";
import {footersReducer} from "./reducers/footerReducer";
import {chooseReducer} from "./reducers/chooseReducer";
import {jurisReducer} from "./reducers/jurisReducer";
import {AdminReducer} from "./reducers/adminReducer";
import {videoReducer} from "./reducers/videoReducer";
import {portfolioReducer} from "./reducers/portfolioREducer";

export const rootReducer = combineReducers({
  isAuthReducer,
  usersReducer,
  aboutUsReducer,
  contactUsReducer,
  subscribersReducer,
  infoReducer,
  bannersReducer,
  categoryReducer,
  productReducer,
  orderReducer,
  deleveryReducer,
  footersReducer,
  chooseReducer,
  jurisReducer,
  AdminReducer,
  videoReducer,
  portfolioReducer
});
