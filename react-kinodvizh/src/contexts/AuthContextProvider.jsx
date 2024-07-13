import { createContext, useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext({});

function AuthContextProvider({children})
{
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const getUser = async () => {
        const {data} = await axiosClient.get('/user');
        setUser(data);
    }

    const getUserRole = async () => {
        const {data} = await axiosClient.get('user/role');
        setUserRole(data);
    }

    const register = async (payload) => {
        try {
            await axiosClient.post('/register', payload);
            await getUser();
            navigate('/');
        }   
        catch(error) {
            if(error.response.status === 422)
            {
                setErrors(error.response.data.errors);
            }
        };
    }

    const login = async (payload) => {
        
        try {
            await axiosClient.post('/login', payload);
            await getUser();
            navigate('/');
        }
        catch(error) {
            if(error.response.status === 422)
            {
                setErrors(error.response.data.errors);
            }
        };
    }

    const logout = async () => {
        axiosClient.post('/logout').then(() => {
            setUser(null)
        });
    }

    useEffect(() => {
        if(!user) getUser();
        if(!userRole) getUserRole();
    },[]);

    return (
        <AuthContext.Provider value={{
            user, 
            userRole,
            getUser,
            errors,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;