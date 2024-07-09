import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../../components/AuthInput/InputWithLabel';
import './Register.css';
function Register()
{
    
    return(
        <>
            <div className="auth-container">
                <h1 className='title'>Register here</h1>
                <form className="auth">
                    <InputWithLabel type={'text'} label={'First Name'} placeholder={'Your First Name'} className={'auth-input'} />
                    <InputWithLabel type={'text'} label={'Last Name'} placeholder={'Your Last Name'} className={'auth-input'}/>
                    <InputWithLabel type={'text'} label={'Email'} placeholder={'Your Email'} className={'auth-input'} />
                    <InputWithLabel type={'password'} label={'Password'} placeholder={'We will not tell it smb'} className={'auth-input'} />
                    <button className="blue-btn mt-2" >Register</button>
                </form>
            </div>
        </>
    );
}

export default Register;