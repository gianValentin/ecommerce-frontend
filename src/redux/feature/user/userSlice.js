import { IDLE } from "@/constans/status";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSession: null,
    status: IDLE // open_login - open_register - closed
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserSession: (state, action) => {
            state.userSession = action.payload
        },
        removeUserSession: (state, action) => {
            state.userSession = null
        }
    }
})

export const {
    setUserSession,
    removeUserSession
} = userSlice.actions

export default userSlice.reducer

export const selectUserSession = state => state.user.userSession