import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import AuthContextProvider from './contexts/AuthContextProvider';

function App()
{
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Router />
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;