import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    trl: [],
    updatedProduct: [],
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

export const getTrl = createAsyncThunk("getTrl", async () => {
    try {
        const response = await fetch("https://api-test.innoloft.com/trl/")
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

export const updateProductDetails = createAsyncThunk("updateProduct", async (data) => {
    const { productName, productDesc } = data
    try {
        const response = await fetch("https://api-test.innoloft.com/product/6781/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": productName,
                "description": productDesc
            })
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

export const updateProductVideo = createAsyncThunk("updateProductVideo", async (data) => {
    const { productVideo } = data
    try {
        const response = await fetch("https://api-test.innoloft.com/product/6781/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "video": productVideo,
            })
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

export const updateProductOfferDetails = createAsyncThunk("updateProductOfferDetails", async (data) => {
    const { productTech, productBusiness, productTrl, productCosts } = data
    try {
        const response = await fetch("https://api-test.innoloft.com/product/6781/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "categories": productTech,
                "businessModels": productBusiness,
                "trl": productTrl,
                "investmentEffort": productCosts
            })
        })
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
            state.trl = []
            state.updatedProduct = []
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
            .addCase(getTrl.pending, (state) => {
                state.trl = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getTrl.fulfilled, (state, action) => {
                state.trl = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getTrl.rejected, (state, action) => {
                state.trl = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(updateProductDetails.pending, (state) => {
                state.updatedProduct = []
                state.status = "loading"
                state.error = null
            })
            .addCase(updateProductDetails.fulfilled, (state, action) => {
                state.updatedProduct = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(updateProductDetails.rejected, (state, action) => {
                state.updatedProduct = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(updateProductVideo.pending, (state) => {
                state.updatedProduct = []
                state.status = "loading"
                state.error = null
            })
            .addCase(updateProductVideo.fulfilled, (state, action) => {
                state.updatedProduct = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(updateProductVideo.rejected, (state, action) => {
                state.updatedProduct = []
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(updateProductOfferDetails.pending, (state) => {
                state.updatedProduct = []
                state.status = "loading"
                state.error = null
            })
            .addCase(updateProductOfferDetails.fulfilled, (state, action) => {
                state.updatedProduct = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(updateProductOfferDetails.rejected, (state, action) => {
                state.updatedProduct = []
                state.status = "failed"
                state.error = action.error.message
            })
    },
})

export const { resetState } = productSlice.actions
export default productSlice.reducer