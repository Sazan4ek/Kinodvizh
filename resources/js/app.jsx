import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import ContextProvider from './contexts/ContextProvider';

function App()
{
    return (
        <ContextProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ContextProvider>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);