import axios from "axios";

const baseURL = 'http://localhost:3500'

const axiosForLoginAndSignUpOnly = axios.create({
    baseURL: baseURL
})

const allOtherAxiosRequest = axios.create({
    baseURL: baseURL,
})


// intercepting to get the most recent token
allOtherAxiosRequest.interceptors.request.use(config => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
        config.headers['Authorization'] = `Bearer ${currentToken}`
    }
    return config
})

export { allOtherAxiosRequest, axiosForLoginAndSignUpOnly }