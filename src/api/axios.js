import axios from "axios";
const baseURL =  'https://spelling-server-backend.vercel.app/';

const axiosForLoginAndSignUpOnly = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

const allOtherAxiosRequest = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export { allOtherAxiosRequest, axiosForLoginAndSignUpOnly }
