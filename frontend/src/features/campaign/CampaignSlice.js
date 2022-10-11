// REDUX
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// SERVICE
import campaignService from './CampaignService';

const initialState = {
    campaign: [],
    campaigns: [],
    campaignTablePagiPage: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isStored: '',
    isDestroy: '',
    isUpdated: '',
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

// edit campaign
export const edit = createAsyncThunk('campaign/edit', async (id, thunkAPI) => {
    try {
        const res = await campaignService.edit(id)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// update campaign
export const update = createAsyncThunk('campaign/update', async (id, thunkAPI) => {
    try {
        const res = await campaignService.update(id)
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
            state.isLoading = false
            state.message = ''
            state.isStored = false
            state.isDestroy = false
            state.isUpdated = false
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
                state.isError = false
                state.isStored = false
            })
            .addCase(store.fulfilled, (state, action) => {
                state.isError = false
                state.isStored = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(store.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isStored = false
            })
            .addCase(edit.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isStored = false
            })
            .addCase(edit.fulfilled, (state, action) => {
                state.isError = false
                state.isStored = true
                state.isLoading = false
                state.campaign = action.payload.length > 0 ? action.payload[0] : action.payload
            })
            .addCase(edit.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isStored = false
            })
            .addCase(updateVisibility.pending, (state, action) => {
                state.message = ''
                state.isUpdated = false
                state.isError = false
                state.isLoading = true
            })
            .addCase(updateVisibility.fulfilled, (state, action) => {
                state.message = action.payload
                state.isUpdated = true
                state.isError = false
                state.isLoading = false
            })
            .addCase(destroy.pending, (state) => {
                state.isSuccess = false
                state.isError = false
                state.isLoading = true
                state.message = ''
                state.isDestroy = false
            })
            .addCase(destroy.fulfilled, (state, action) => {
                state.isDestroy = true
                state.isError = false
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(destroy.rejected, (state, action) => {
                state.isDestroy = false
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset, visibilityReset, setCampaignPagiPage, setDeleteCampaignReset } = campaignSlice.actions
export default campaignSlice.reducer