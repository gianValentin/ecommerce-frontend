"use client";

import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { productsApiSlice } from '@/redux/feature/product/productApiSlice'
import { ordersApiSlice } from './feature/order/orderApiSlice';

/* store.dispatch(productsApiSlice.endpoints.getProducts.initiate()) */

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}