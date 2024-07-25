import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../CustomHocks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // Set token and user
    const setToken = async (user) => {
        try {
            const userInfo = user?.email; 
            if (userInfo) {
                const res = await axiosPublic.post('/jwt', { userInfo });
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    return { token: res.data.token }; 
                }
            } else {
                throw new Error('User information is missing'); 
            }
        } catch (error) {
            console.error('Error setting token:', error.message);
            return null; 
        }
    };
    

    // Add user and set token
    const addUser = async (userData) => {
        try {
            const res = await axiosPublic.post("/user/addUser", userData);
            
            if (res?.data?.insertedId) {
               const token= await setToken(userData);
                console.log(token,'ok');
                return res.data;
            }
        } catch (error) {
            console.error('Error adding user:', error);
            return null;
        }
    };

    // Logout function


    

    const userInfo = {
        user,
        loading,
        addUser,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};
