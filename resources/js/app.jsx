import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';

export default function App()
{
    return (
        <h1>Kinodvizh</h1>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);