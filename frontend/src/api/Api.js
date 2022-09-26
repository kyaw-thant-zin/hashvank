import axios from "axios";

// SLICE
import { signout, reset } from '../features/auth/authSlice';

const baseURL = process.env.REACT_APP_API_URL
const headers = {
    'Content-Type': 'application/json',
}

let store

export const injectStore = _store => {
    store = _store
}

const publicApi = () => {

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            headers
        }
    })

    axiosInstance.interceptors.request.use(async req => {
        return req
    })

    return axiosInstance

}

const privateApi = () => {

    const token = store.getState().auth.user.userInfo.accessToken

    if(token === null) {
        store.dispatch(signout())
        store.dispatch(reset())
    }

    const axiosInstance = axios.create({
        baseURL: baseURL,
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    })

    

    axiosInstance.interceptors.request.use(async req => {
        return req
    })

    return axiosInstance

}

export {
    publicApi,
    privateApi
}