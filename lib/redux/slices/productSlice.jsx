import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    status: "idle",
    error: null
}

export const getProducts = createAsyncThunk("getProducts", async () => {
    try {
        const response = await fetch("https://api-test.innoloft.com/product/6781/")
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetState: (state) => {
            state.products = []
            state.status = "idle"
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.products = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = []
                state.status = "failed"
                state.error = action.error.message
            })
    },
})

export const { resetState } = productSlice.actions
export default productSlice.reducer