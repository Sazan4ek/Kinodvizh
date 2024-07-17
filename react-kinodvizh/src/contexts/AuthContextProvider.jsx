import { createContext, useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext({});

function AuthContextProvider({children})
{
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            await axiosClient.get('/user')
            .then(({data}) => {setUser(data); setUserRole(data.role.name)})
        }
        catch(error) {}
    }

    const register = async (payload, setErrors) => {
        try {
            localStorage.setItem('IS_LOGGED_IN', 'true');
            await axiosClient.post('/register', payload);
            await getUser();
            navigate('/');
        }   
        catch(error) {
            localStorage.removeItem('IS_LOGGED_IN');
            if(error.response.status === 422)
            {
                setErrors(error.response.data.errors);
            }
        };
    }

    const login = async (payload, setErrors) => {
        
        try {
            localStorage.setItem('IS_LOGGED_IN', 'true');
            await axiosClient.post('/login', payload);
            await getUser();
            navigate('/');
        }
        catch(error) {
            localStorage.removeItem('IS_LOGGED_IN');
            if(error.response.status === 422)
            {
                setErrors(error.response.data.errors);
            }
        };
    }

    const logout = async () => {
        localStorage.removeItem('IS_LOGGED_IN');
        axiosClient.post('/logout').then(() => {
            setUser(null);
            setUserRole(null);
        });
    }

    useEffect(() => {
        if(!user && localStorage.getItem('IS_LOGGED_IN') === 'true') getUser();
    },[]);

    return (
        <AuthContext.Provider value={{
            user, 
            userRole,
            getUser,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;