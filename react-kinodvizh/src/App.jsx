import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import AuthContextProvider from './contexts/AuthContextProvider';
import { ConfigProvider } from 'antd';

function App()
{
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#ffc107',
                    },
                }}
            >
                <AuthContextProvider>
                    <Router />
                </AuthContextProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;