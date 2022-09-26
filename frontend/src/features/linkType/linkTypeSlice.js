import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import linkTypeService from './linkTypeService'

const initialState = {
    linkTypes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// fetch collectionType
export const linkTypeIndex = createAsyncThunk('linkType/index', async (_, thunkAPI) => {
    try {
        const res = await linkTypeService.index()
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// collection type
export const linkTypeSlice = createSlice({
    name: 'linkType',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(linkTypeIndex.pending, (state) => {
                state.isLoading = true
            })
            .addCase(linkTypeIndex.fulfilled, (state, action) => {
                state.linkTypes = action.payload
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(linkTypeIndex.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.linkTypes = []
            })
    }
})

export const { reset } = linkTypeSlice.actions
export default linkTypeSlice.reducer
