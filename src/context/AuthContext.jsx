import React, { createContext, useState, useContext, useEffect } from 'react';
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

    const [isTokenUpdated, setIsTokenUpdated] = useState(false);

    const signin = (token) => {
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setIsTokenUpdated(true);
    };

    const signout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsTokenUpdated(true);
    };

    useEffect(() => {
        if (isTokenUpdated) {
            setIsTokenUpdated(false);
        }
    }, [isTokenUpdated]);

    return (
        <AuthContext.Provider value={{ user, signin, signout, isTokenUpdated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
