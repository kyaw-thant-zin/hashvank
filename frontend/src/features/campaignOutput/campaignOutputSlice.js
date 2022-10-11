import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import campaignOutputService from './campaignOutputService'

const initialState = {
    campaigns: [],
    campaignOutputTablePagiPage: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isCreated: false,
    isUpdatedVisibility: false,
    isUpdatedLinkUrl: false,
    isUpdatedPriority: false,
}

// fetch campaigns and campaignOutput
export const index = createAsyncThunk('campaignOutput/index', async (_, thunkAPI) => {
    try {
        const res = await campaignOutputService.index()
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// update tiktok video visibility
export const updateVisibility = createAsyncThunk('campaignOutput/update', async (camapignData, thunkAPI) => {
    try {
        const res = await campaignOutputService.updateVisibility(camapignData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// update tiktok video visibility
export const updateLinkUrl = createAsyncThunk('campaignOutput/update/linkUrl', async (camapignData, thunkAPI) => {
    try {
        const res = await campaignOutputService.updateLinkUrl(camapignData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// update tiktok video priority
export const updatePriority = createAsyncThunk('campaignOutput/update/priority', async (camapignData, thunkAPI) => {
    try {
        const res = await campaignOutputService.updatePriority(camapignData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// Slice
export const campaignOutputSlice = createSlice({
    name: 'campaignOutput',
    initialState,
    reducers: {
        reset: (state) => {
            state.campaignOutputTablePagiPage = 0
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
            state.isCreated = false
        },
        visibilityReset: (state) => {
            state.isUpdatedVisibility = false
        },
        linkUrlReset: (state) => {
            state.isUpdatedLinkUrl = false
        },
        priorityReset: (state) => {
            state.isUpdatedPriority = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(index.pending, (state) => {
                state.isLoading = true
                state.isCreated = false
                state.isSuccess = false
            })
            .addCase(index.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.campaigns = action.payload
                state.isCreated = false
                state.isUpdatedVisibility = false
            })
            .addCase(index.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.campaigns = []
                state.isCreated = false
                state.message = action.payload
            })
            .addCase(updateVisibility.pending, (state) => {
                state.isLoading = true
                state.isCreated = false
                state.isSuccess = false
                state.isUpdatedVisibility = false
            })
            .addCase(updateVisibility.fulfilled, (state, action) => {
                state.message = action.payload
                state.isUpdatedVisibility = true
            })
            .addCase(updateLinkUrl.pending, (state) => {
                state.isLoading = true
                state.isCreated = false
                state.isSuccess = false
                state.isUpdatedLinkUrl = false
            })
            .addCase(updateLinkUrl.fulfilled, (state, action) => {
                state.message = action.payload
                state.isUpdatedLinkUrl = true
            })
            .addCase(updatePriority.pending, (state) => {
                state.isLoading = true
                state.isCreated = false
                state.isSuccess = false
                state.isUpdatedPriority = false
            })
            .addCase(updatePriority.fulfilled, (state, action) => {
                state.message = action.payload
                state.isUpdatedPriority = true
            })
    }
})

export const { reset, visibilityReset, linkUrlReset, priorityReset } = campaignOutputSlice.actions
export default campaignOutputSlice.reducer