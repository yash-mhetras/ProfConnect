import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authreducer'
import postReducer from './reducer/postreducer'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        posts:postReducer
    }
})