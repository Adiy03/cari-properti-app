import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:3003/api",
    withCredentials: true
})

export default apiRequest;