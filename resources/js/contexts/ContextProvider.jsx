import { createContext, useState } from "react";

export let Context = createContext(null);

function ContextProvider({children})
{
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if(token)
        {
            localStorage.setItem('ACCESS_TOKEN');
        }
        else 
        {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <Context.Provider value={{
            user, 
            setUser, 
            token, 
            setToken
        }}>
            {children}
        </Context.Provider>
    );
}
export default ContextProvider;