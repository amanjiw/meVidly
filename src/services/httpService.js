import axios from "axios";
import { toast } from 'react-toastify';



axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (expectedError) return Promise.reject(error);
    toast.error("An Unexpected error occurred");
})

const setJwt = function (jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}