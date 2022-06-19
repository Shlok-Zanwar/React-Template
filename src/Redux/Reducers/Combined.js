import { combineReducers } from "redux";
import authReducer from "./AuthReducer";


const combinedReducer = combineReducers({
    authReducer,
})

export default combinedReducer;