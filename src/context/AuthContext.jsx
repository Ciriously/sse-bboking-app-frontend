// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            return jwtDecode(token);
        }
        return null;
    });

    const signin = (token) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    };

    const signout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
