import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import collectionTypeService from './collectionTypeService'

const initialState = {
    collectionTypes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// fetch collectionType
export const collectionTypeIndex = createAsyncThunk('collectionType/index', async (_, thunkAPI) => {
    try {
        const res = await collectionTypeService.index()
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// collection type
export const collectionTypeSlice = createSlice({
    name: 'collectionType',
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
            .addCase(collectionTypeIndex.pending, (state) => {
                state.isLoading = true
            })
            .addCase(collectionTypeIndex.fulfilled, (state, action) => {
                state.collectionTypes = action.payload
                state.isError = false
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(collectionTypeIndex.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.collectionTypes = []
            })
    }
})

export const { reset } = collectionTypeSlice.actions
export default collectionTypeSlice.reducer
