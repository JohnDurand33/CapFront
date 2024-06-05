import { jwtDecode } from "jwt-decode";
import api from "../contexts/api.jsx";

// Utility to get token from sessionStorage
export function getToken() {
    return sessionStorage.getItem("token");
}

// Utility to set token in sessionStorage
export function setSessionToken(token) {
    sessionStorage.setItem("token", token);
}

// Utility to remove token from sessionStorage
export function removeSessionToken() {
    sessionStorage.removeItem("token");
}

// Utility to check token expiry
export function isTokenExpired(token) {
    if (!token) {
        return true;
    }
    try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        return isExpired;
    } catch (error) {
        console.error("Invalid token:", error);
        return true;
    }
}

// Function to refresh token
export async function refreshToken(currentToken, setToken, setLoggedIn) {
    try {
        console.log("Current Token:", currentToken);
        const response = await api.post("/auth/refresh", {
            token: currentToken,
        });
        const { token: newToken } = response.data;

        console.log("New Token:", newToken);

        setSessionToken(newToken);
        setToken(newToken);
        setLoggedIn(true);

        return true;
    } catch (error) {
        console.error(
            "Error refreshing token:",
            error.response?.data || error.message
        );
        return false;
    }
}