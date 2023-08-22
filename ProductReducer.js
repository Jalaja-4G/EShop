import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInput : "",
    orderedProduct : {}
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        processSearchInput (state, action) {
            console.log(action)
            state.searchInput = action.payload
        },
        createOrder (state, action) {
            state.orderedProduct = action.payload
        }
    }
})

export const {processSearchInput, createOrder} = productsSlice.actions
export default productsSlice.reducer