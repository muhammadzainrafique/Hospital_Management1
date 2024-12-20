import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
    },
    middleware:def=> def().concat(apiSlice.middleware),
    devTools:true
})