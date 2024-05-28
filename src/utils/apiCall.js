import axios from "axios";

const apiCall = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default apiCall;
