import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSessionUser: builder.query({
            query: () => '/user/session'
        }),
    })
})

export const {
    useLazyGetSessionUserQuery
} = userApiSlice