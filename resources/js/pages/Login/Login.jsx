import { useContext, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../../components/AuthInput/InputWithLabel';

function Login()
{
    return (
        <div className="auth-container">
            <h1 className='title'>Login here</h1>
            <form className="auth">
                <InputWithLabel type={'text'} label={'Email'} placeholder={'Your Email'} className={'auth-input'}/>
                <InputWithLabel type={'password'} label={'Password'} placeholder={'Enter the password'} className={'auth-input'}/>
                <button className="blue-btn mt-2">Login</button>
            </form>
        </div>
    );
}
export default Login;