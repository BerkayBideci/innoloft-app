import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    configuration: [],
    status: "idle",
    error: null
}

export const getConfiguration = createAsyncThunk("getConfiguration", async () => {
    try {
        const response = await fetch(`https://api-test.innoloft.com/configuration/${process.env.NEXT_PUBLIC_APP_ID || 1}/`)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: (state) => {
            state.configuration = []
            state.status = "idle"
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConfiguration.pending, (state) => {
                state.configuration = []
                state.status = "loading"
                state.error = null
            })
            .addCase(getConfiguration.fulfilled, (state, action) => {
                state.configuration = action.payload
                state.status = "succeeded"
                state.error = null
            })
            .addCase(getConfiguration.rejected, (state, action) => {
                state.configuration = []
                state.status = "failed"
                state.error = action.error.message
            })
    },
})

export const { resetState } = userSlice.actions
export default userSlice.reducer