import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    amount: 1,
    cart: null,
    status: 'idle' // idle - added - removed-entry - listed - opened - standby
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAmount: (state, action) => {
            state.status = 'standby'
            state.amount = action.payload.amount
        },
        setCart: (state, action) => {
            state.status = 'added'
            state.cart = action.payload
        },
        setStatusCart: (state, action) => {
            state.status = action.payload
        },
        removeCart: (state, action) => {
            state.cart = null
        }
    }
})

export const { setAmount, setCart, setStatusCart, removeCart } = cartSlice.actions

export default cartSlice.reducer

export const selectAmount = state => state.cart.amount
export const selectCart = state => state.cart.cart
export const selectStatus = state => state.cart.status
export const selectNumberEntries = state => state.cart.cart?.entries ? state.cart.cart.entries.length : 0