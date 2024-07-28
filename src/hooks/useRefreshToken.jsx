const { default: axios } = require("axios")


const useRefreshToken = () => {
    


    const refresh = async () => {
        
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
    }

}