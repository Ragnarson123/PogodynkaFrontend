import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "@/redux/weatherSlice";
import { logger } from "redux-logger/src";
import authReducer from './authSlice';


const store = configureStore({
  reducer: {
    weather: weatherSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
