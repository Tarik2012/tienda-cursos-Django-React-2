// context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // ⏳

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsAuthenticated(!!token);
        setLoading(false); // ✅ Ya se evaluó
    }, []);



    const login = () => setIsAuthenticated(true);

    const logout = async () => {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
            console.warn("No refresh token found.");
        } else {
            try {
                await axiosInstance.post("/logout/", {
                    refresh: refreshToken,
                });
            } catch (error) {
                console.error("Error while logging out:", error.response?.data || error.message);
            }
        }

        localStorage.removeItem("accessToken"); // ✅
        localStorage.removeItem("refreshToken"); // ✅
        setIsAuthenticated(false);
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
