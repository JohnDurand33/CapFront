import axios from "axios";

const apiCall = axios.create({
    baseURL: "localhost:5000/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export default apiCall;
