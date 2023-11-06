import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const ordersAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.createAt).toISOString().localeCompare(new Date(a.createAt).toISOString())
})

const initialState = ordersAdapter.getInitialState()

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/order',
            transformResponse: responseData => ordersAdapter.setAll(initialState, responseData),
            providesTags: (result, error, arg) => [
                { type: 'Order', id: 'LIST' },
                ...result ? result?.ids.map(id => ({ type: 'Order', id })) : []
            ]
        }),
        getSingleOrder: builder.query({
            query: data => `/order/${data}`
        }),
        placeOrder: builder.mutation({
            query: () => ({
                url: `/order/placeOrder`,
                method: 'POST'
            }),
            invalidatesTags: [
                { type: 'Order', id: "LIST" }
            ]
        })
    })
})

export const {
    useGetOrdersQuery,
    useGetSingleOrderQuery,
    useLazyGetSingleOrderQuery,
    usePlaceOrderMutation
} = ordersApiSlice

export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select()

const selectOrdersData = createSelector(
    selectOrdersResult,
    ordersResust => ordersResust.data
)

export const {
    selectAll: selectAllOrders,
    selectById: selectOrdersById,
    selectIds: selectOrdersIds
} = ordersAdapter.getSelectors(state => selectOrdersData(state) ?? initialState)