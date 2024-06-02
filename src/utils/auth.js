import {jwtDecode} from "jwt-decode";
import api from "../components/ApiBackBP"


// Utility to get token from localStorage
export function getToken() {
    return localStorage.getItem("token");
}

export function getZipCode() {
    return localStorage.getItem("zipCode");
}

export function getState() {
    return localStorage.getItem("state");
}

export function setLocalToken(token) {
    localStorage.setItem("token", token);
}

export function setLocalZipCode(zipCode) {
    localStorage.setItem("zipCode", zipCode);
}

export function setLocalState(state) {
    localStorage.setItem("state", state);
}

// Utility to check token expiry
export function isTokenExpired(token) {
    if (!token || token.split(".").length !== 3) {
        return true;
    }
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
        console.error("Invalid token:", error);
        return true;
    }
}

// Function to refresh token
export async function refreshToken(currentToken, setToken) {
    try {
        console.log("Current Token:", currentToken); // Log the current token
        const response = await api.post("/auth/refresh",
            {
                token: currentToken,
            }
        );
        const newToken = response.data.token;
        console.log("New Token:", newToken); // Log the new token
        setLocalToken(newToken);
        setToken(newToken);
        return newToken;
    } catch (error) {
        console.error(
            "Error refreshing token:",
            error.response?.data || error.message
        );
        return null;
    }
}
