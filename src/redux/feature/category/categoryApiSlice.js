import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const categoriesAdapter = createEntityAdapter({})

const initialState = categoriesAdapter.getInitialState()

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: (arg) => ({
                url: '/categories',
                params: { ...arg }
            }),
            transformResponse: responseData => categoriesAdapter.setAll(initialState, responseData),
            providesTags: (result, error, arg) => [
                { type: 'Category', id: 'LIST' },
                ...(result ? result?.ids.map(id => ({ type: 'Category', id })) : [])
            ]
        })
    })
})

export const {
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery
} = categoriesApiSlice

export const selectCategoriesResult = categoriesApiSlice.endpoints.getCategories.select()

const selectCategoriesData = createSelector(
    selectCategoriesResult,
    categoriesResust => categoriesResust.data
)

export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoriesIds,

} = categoriesAdapter.getSelectors(state => selectCategoriesData(state) ?? initialState)