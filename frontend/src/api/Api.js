import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL
const headers = {
    'Content-Type': 'application/json',
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