import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../auth/authSlice'
import { removeUserSession } from '../user/userSlice'
import { removeCart } from '../cart/cartSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const access_token = getState().auth.access_token
        if (access_token) {
            headers.set("authorization", `Bearer ${access_token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403 && api.getState()?.auth?.access_token) {

        const refresh_token = api.getState().auth.refresh_token
        api.dispatch(setCredentials({ access_token: refresh_token }))

        const refreshResult = await baseQuery(
            { credentials: 'include', url: 'auth/refresh-token', method: 'POST' },
            api,
            extraOptions
        )

        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            await baseQuery(
                { credentials: 'include', url: 'auth/logout', method: 'GET' },
                api,
                extraOptions
            )

            api.dispatch(logOut())
            api.dispatch(removeUserSession())
            api.dispatch(removeCart())
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api', //optional
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'Auth', 'Cart', 'User', 'Order', 'Category'],
    endpoints: builder => ({})
})
