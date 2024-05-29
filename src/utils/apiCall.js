import axios from "axios";
import { useLogin } from "../contexts/LoginContext";

const { loggedIn, token } = useLogin();

const apiCall = axios.create({
    baseURL: "localhost:5000/api",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default apiCall;
