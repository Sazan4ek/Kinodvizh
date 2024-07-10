import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';
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

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);