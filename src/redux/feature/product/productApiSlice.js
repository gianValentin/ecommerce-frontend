import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: (arg) => ({
                url: '/product',
                params: { ...arg }
            }),
            transformResponse: responseData => productsAdapter.setAll(initialState, responseData),
            providesTags: (result, error, arg) => [
                { type: 'Product', id: 'LIST' },
                ...(result ? result?.ids.map(id => ({ type: 'Product', id })) : [])
            ]
        }),
        getSingleProduct: builder.query({
            query: productId => `/product/${productId}`,

        })
    })
})

export const {
    useGetProductsQuery,
    useLazyGetProductsQuery,
    useGetSingleProductQuery
} = productsApiSlice

export const selectProductsResult = productsApiSlice.endpoints.getProducts.select()

const selectProductsData = createSelector(
    selectProductsResult,
    productsResust => productsResust.data
)

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductsIds,

} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState)