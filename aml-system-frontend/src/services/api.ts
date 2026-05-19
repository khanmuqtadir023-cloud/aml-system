import axios from 'axios';

// Backend ka base URL set kar rahe hain
const API = axios.create({
    baseURL: 'https://localhost:7041/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Signup (Register) API Call
export const registerUser = async (userData: any) => {
    try {
        const response = await API.post('/Auth/register', userData);
        return response.data;
    } catch (error: any) {
        // Agar backend se koi error aaye (jaise "Email already registered") toh usay throw karein
        throw error.response?.data || "Signup mein koi masla hua hai.";
    }
};

// Login API Call
export const loginUser = async (loginData: any) => {
    try {
        const response = await API.post('/Auth/login', loginData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "Login mein koi masla hua hai.";
    }
};

export default API;