import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./feature/api/apiSlice";
import authReducer from "./feature/auth/authSlice"
import cartReducer from "./feature/cart/cartSlice"
import userReducer from "./feature/user/userSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
    key: 'ecommerce',
    storage: storage,
    blacklist: [apiSlice.reducerPath]
}

export const rootReducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(apiSlice.middleware)
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)