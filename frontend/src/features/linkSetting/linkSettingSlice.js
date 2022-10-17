import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import linkSettingService from './linkSettingService'

const initialState = {
    linkSettings: [],
    linkSettingTablePagiPage: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isCreated: false,
    tiktokOfCampaign: []
}

// fetch linkSettings
export const index = createAsyncThunk('linkSetting/index', async (_, thunkAPI) => {
    try {
        const res = await linkSettingService.index()
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// fetch tiktoks of the selected campaign
export const getTiktoksOfCampaign = createAsyncThunk('linkSetting/getTiktokOfCampaign', async (campaignId, thunkAPI) => {
    try {
        const res = await linkSettingService.getTiktoksOfCampaign(campaignId)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// store linkSetting
export const store = createAsyncThunk('linkSetting/store', async (linkSettingData, thunkAPI) => {
    try {
        const res = await linkSettingService.store(linkSettingData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// Slice
export const linkSettingSlice = createSlice({
    name: 'linkSetting',
    initialState,
    reducers: {
        reset: (state) => {
            state.linkSettingTablePagiPage = 0
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
            state.isCreated = false
        },
        selectCampaignReset: (state) => {
            state.tiktokOfCampaign = []
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
                state.linkSettings = action.payload
                state.isCreated = false
                state.isUpdatedVisibility = false
            })
            .addCase(index.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.linkSettings = []
                state.isCreated = false
                state.message = action.payload
            })
            .addCase(getTiktoksOfCampaign.fulfilled, (state, action) => {
                state.tiktokOfCampaign = action.payload
            })
            .addCase(store.pending, (state) => {
                state.isLoading = true
                state.isCreated = false
            })
            .addCase(store.fulfilled, (state, action) => {
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
                state.isCreated = true
            })
            .addCase(store.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isCreated = false
            })
    }
})

export const { reset, selectCampaignReset } = linkSettingSlice.actions
export default linkSettingSlice.reducer