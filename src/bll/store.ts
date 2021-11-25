import { usersReducer } from './usersReducer';
import { authReducer } from './authReducer';
import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
   auth: authReducer,
   users: usersReducer,
})

//this is type of rootreducer function by itself
export type RootReducerType = typeof rootReducer;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;