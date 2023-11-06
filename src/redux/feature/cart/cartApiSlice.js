import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const cartsAdapter = createEntityAdapter({})

const initialState = cartsAdapter.getInitialState()

export const cartsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCarts: builder.query({
            query: () => '/cart',
            transformResponse: responseData => cartsAdapter.setAll(initialState, responseData),
            providesTags: (result, error, arg) => [                
                { type: 'Cart', id: 'LIST' },
                ...result ? result?.ids.map(id => ({ type: 'Carts', id })) : []
            ]
        }),
        getSingleCart: builder.query({            
            query: data => `/cart/${data}`
        }),
        addToCart: builder.mutation({
            query: (data) => ({
                url: `/cart/${data?.cartId}/addToCart`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        }),
        removeEntry: builder.mutation({
            query: (data) => ({
                url: `/cart/${data.cartId}/entry`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Cart', id: arg.id }
            ]
        })
    })
})

export const {
    useGetCartsQuery,
    useLazyGetSingleCartQuery,
    useAddToCartMutation,
    useRemoveEntryMutation
} = cartsApiSlice

export const selectCartsResult = cartsApiSlice.endpoints.getCarts.select()

const selectCartsData = createSelector(
    selectCartsResult,
    cartsResust => cartsResust.data
)

export const {
    selectAll: selectAllCarts,
    selectById: selectCartsById,
    selectIds: selectCartsIds
} = cartsAdapter.getSelectors(state => selectCartsData(state) ?? initialState)