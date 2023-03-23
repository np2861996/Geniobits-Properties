import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { msgreducer, propertiesreducer } from "./reducers/reducer";
import authReducer from "./slice/authSlice"

//store for redux
const rootReducer = combineReducers({
    auth: authReducer,
    propertiesreducer:propertiesreducer,
    msgreducer:msgreducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store