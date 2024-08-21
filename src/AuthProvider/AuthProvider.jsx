import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../CustomHocks/useAxiosPublic";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reLoad,setReLoad]=useState(false)
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
                const token = await setToken(userData);
                if (token.token) {
                    // eslint-disable-next-line no-unused-vars
                    const { password, ...userWithoutPassword } = userData;
                    setUser(userWithoutPassword); 
                    setLoading(false);
                    return { token, res };
                }
            } else if (res?.data) {
                return res.data;
            }
        } catch (error) {
            console.error('Error adding user:', error);
            return 'Error';
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axiosPublic.post("/user/login", { email, password });

            if (res?.data?.message === 'Login successful') {
                setToken(res?.data?.user);
                // eslint-disable-next-line no-unused-vars
                const { password, ...userWithoutPassword } = res.data.user;
                setUser(userWithoutPassword); 
                return res.data;
            } else {
                
                return res.data;
            }
        } catch (error) {
            console.error('Login error:', error);
            return error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axiosPublic.post('/user/is-login', { token });
                    if (response?.data?.user) {
                        setUser(response.data.user);
                    }
                    setLoading(false);
                } catch (error) {
                   
                    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                        logout();
                    } else {
                        console.error('Error checking login status:', error);
                    }
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        };

        const interval = setInterval(checkToken, 600000);
        checkToken(); 

        return () => {
            clearInterval(interval);
        };
    }, [axiosPublic,reLoad]);

    const userInfo = {
        user,
        loading,
        setReLoad,
        addUser,
        login,
        logout,
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
