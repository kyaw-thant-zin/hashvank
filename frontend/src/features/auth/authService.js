
// PUBLIC API
import { publicApi } from "../../api/Api";  

// sign up user
const signup = async (userData) => {
    const response = await publicApi().post('/users/sign-up', userData)
    return response.data
}

// sign in user
const signin = async (userData) => {
    const response = await publicApi().post('/users/sign-in', userData)
    if(response) {
        localStorage.setItem('loginId', response.data.accessToken)
    }
    return response.data

}

// sign out user
const signout = () => {
    localStorage.removeItem('user')
}

const authService = {
    signup,
    signout,
    signin,
}

export default authService