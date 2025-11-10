import axios from "axios";
const baseURL =  'https://spellingapi.glitch.me'

const axiosForLoginAndSignUpOnly = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

const allOtherAxiosRequest = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export { allOtherAxiosRequest, axiosForLoginAndSignUpOnly }
