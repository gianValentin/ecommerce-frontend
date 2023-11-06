import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: creadentials => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...creadentials }
            })
        }),
        register: builder.mutation({
            query: data => ({
                url: 'auth/register',
                method: 'POST',
                body: { ...data}
            })
        }),
        logout: builder.query({            
            query: data => `/auth/logout`
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyLogoutQuery
} = authApiSlice