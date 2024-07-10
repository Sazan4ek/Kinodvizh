import { createContext, useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext({});

function AuthContextProvider({children})
{
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    
    const csrf = () => axiosClient.get('sanctum/csrf-cookie');

    const getUser = async () => {
        await csrf();
        const {data} = await axiosClient.get('/user');
        setUser(data);
    }

    const register = async (payload) => {
        try {
            await csrf();
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
            await csrf();
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
        await csrf();
        axiosClient.post('/logout').then(() => {
            setUser(null)
        });
    }

    return (
        <AuthContext.Provider value={{
            user, 
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