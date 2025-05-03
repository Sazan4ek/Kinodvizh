import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const AUTH_KEY = 'IS_LOGGED_IN';

function AuthContextProvider({children})
{
    const [authState, setAuthState] = useState({
        user: null,
        userRole: null,
        userLoading: true,
        error: null,
    });
    const navigate = useNavigate();

    const handleAuthError = useCallback((error, setErrors) => {
        setAuthState(prev => {
            return ({
            ...prev,    
            userLoading: false,
            error,
        })});
        localStorage.removeItem(AUTH_KEY);

        if(error.response?.status === 422 && setErrors) {
            setErrors(error.response?.data?.errors);
        }
    }, []);

    const getUser = useCallback(async () => {
        try {
            const { data: userData } = await axiosClient.get('/user');
            setAuthState(prev => ({
                ...prev, 
                user: userData,
                userRole: userData?.role.name,
                userLoading: false
            }));
            
        } catch (error) { 
            handleAuthError(error);
        }
    }, []);

    const register = useCallback(async (payload, setErrors) => {
        try {
            setAuthState(prev => ({
                ...prev,
                userLoading: true,
            }));
            await axiosClient.post('/register', payload);
            localStorage.setItem(AUTH_KEY, 'true');
            await getUser();
            navigate(-1);
        } catch (error) {
            handleAuthError(error, setErrors);
        }
    }, []);

    const login = useCallback(async (payload, setErrors) => {
        try {
            setAuthState(prev => ({
                ...prev,
                userLoading: true,
            }));
            await axiosClient.post('/login', payload);
            localStorage.setItem(AUTH_KEY, 'true');
            await getUser();
            navigate(-1);
        } catch (error) {
            handleAuthError(error, setErrors);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            localStorage.removeItem(AUTH_KEY);
            await axiosClient.post('/logout');
            setAuthState(prev => ({
                ...prev,
                user: null,
                userRole: null,
                userLoading: false,
                error: null,
            }));
        } catch (error) {
            handleAuthError(error);
        }

    }, []);  

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if(localStorage.getItem(AUTH_KEY) === 'true') {
                    await getUser();
                } else {
                    setAuthState(prev => ({ ...prev, userLoading: false }));
                }
            } catch (error) {
                setAuthState(prev => ({ ...prev, userLoading: false }));
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...authState,
            getUser,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContextProvider;