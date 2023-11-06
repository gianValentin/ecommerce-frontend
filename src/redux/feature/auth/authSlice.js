import { IDLE } from "@/constans/status";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access_token: null,
    refresh_token: null,
    modal_auth_status: IDLE // open_login - open_register - closed
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { refresh_token, access_token } = action.payload
            state.access_token = access_token
            state.refresh_token = refresh_token
        },
        logOut: (state, action) => {
            state.access_token = null
            state.refresh_token = null
        },
        setModalAuthStatus: (state, action) => {
            state.modal_auth_status = action.payload
        }
    }
})

export const {
    setCredentials,
    logOut,
    setModalAuthStatus
} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = state => state.auth.token
export const selectModalAuthStatus = state => state.auth.modal_auth_status