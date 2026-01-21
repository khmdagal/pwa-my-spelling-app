import axios from "axios";
const baseURL =  'https://spellingapi.https://spelling-server-backend-409238149045.europe-west1.run.app.me'

const axiosForLoginAndSignUpOnly = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

const allOtherAxiosRequest = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export { allOtherAxiosRequest, axiosForLoginAndSignUpOnly }
