// REDUX
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// SERVICE
import campaignService from './CampaignService';

const initialState = {
    campaigns: [],
    campaignTablePagiPage: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// fetch campaigns
export const index = createAsyncThunk('campaign/index', async (_, thunkAPI) => {
    try {
        const res = await campaignService.index()
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// store campaigns
export const store = createAsyncThunk('campaign/store', async (camapignData, thunkAPI) => {

    try {
        const res = await campaignService.store(camapignData)
        return 'res'
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// update campaigns
export const update = createAsyncThunk('campaign/update', async (camapignData, thunkAPI) => {
    try {
        const res = await campaignService.update(camapignData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// destroy campaigns
export const destroy = createAsyncThunk('campaign/destroy', async (camapignId, thunkAPI) => {
    try {
        const res = await campaignService.destroy(camapignId)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// update campaigns visibility
export const updateVisibility = createAsyncThunk('campaign/update', async (camapignData, thunkAPI) => {
    try {
        const res = await campaignService.updateVisibility(camapignData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// Slice
export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
        setCampaignPagiPage: (state, action) => {
            state.campaignTablePagiPage = action.payload
        },
        setCampaignPagiPageReset: (state) => {
            state.campaignTablePagiPage = 0
        }
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
                state.isSuccess = false
                state.isLoading = false
                state.campaigns = action.payload
            })
            .addCase(index.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(store.pending, (state) => {
                state.isLoading = true
                state.isCreated = false
                state.isSuccess = false
            })
            .addCase(store.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(store.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isSuccess = false
            })
            .addCase(updateVisibility.pending, (state, action) => {
                state.message = ''
                state.isSuccess = false
                state.isError = false
                state.isLoading = true
            })
            .addCase(updateVisibility.fulfilled, (state, action) => {
                state.message = action.payload
                state.isSuccess = true
                state.isError = false
                state.isLoading = false
            })
            .addCase(destroy.pending, (state) => {
                state.isSuccess = false
                state.isError = false
                state.isLoading = true
                state.message = ''
            })
            .addCase(destroy.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isError = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(destroy.rejected, (state, action) => {
                state.isSuccess = false
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset, visibilityReset, setCampaignPagiPage, setDeleteCampaignReset } = campaignSlice.actions
export default campaignSlice.reducer