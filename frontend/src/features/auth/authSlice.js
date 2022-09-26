// REDUX
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// SERVICE
import authService from './authService'

// INITIAL STATE
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// SIGNUP USER
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        return await authService.signUp(userData)
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// SIGNIN USER
export const signin = createAsyncThunk('auth/signin', async (userData, thunkAPI) => {
    try {
        const res = await authService.signin(userData)
        return res
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

// SIGNOUT USER
export const signout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        authService.signout()
    } catch (error) {
        const message = error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
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
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(signout.fulfilled, (state, action) => {
                state.user = null
            })
            .addCase('&_RECEIVE_INIT_STATE', (state, action) => {
                if(action?.payload?.auth?.user) {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload.auth.userInfo
                }
            })
            .addCase('&_SEND_INIT_STATE', (state, action) => {
                if(action?.payload?.auth?.user) {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload.auth.userInfo
                }
            })
            .addCase('&_GET_INIT_STATE', (state, action) => {
                if(action?.payload?.auth?.user) {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload.auth.userInfo
                }
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer