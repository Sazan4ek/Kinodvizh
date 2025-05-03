import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { useAuth } from '../../contexts/AuthContextProvider';

function Login()
{
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleLogin = (event) => {
        event.preventDefault();
        const payload = {
            ...formData
        }
        login(payload, setErrors);
    }
    
    return (
        <div className="auth-container">
            <h1 className='title'>Login here</h1>
            <form className="auth">
                <InputWithLabel 
                    type={'text'} 
                    label={'Email'} 
                    placeholder={'Enter email of your account'} 
                    className={'auth-input'} 
                    value={formData.email}
                    onChange={event => setFormData({ ...formData, email: event.target.value })}
                    error={errors?.email ? errors.email[0] : null}
                />
                <InputWithLabel 
                    type={'password'} 
                    label={'Password'}
                    placeholder={'Enter password of your account'} 
                    className={'auth-input'} 
                    value={formData.password}
                    onChange={event => setFormData({ ...formData, password: event.target.value })}
                    error={errors?.password ? errors.password[0] : null}
                />
                
                <button className="blue-btn mt-2" onClick={handleLogin}>Login</button>
                <p className="message">
                    Not Registered? <Link to= '/register'>Create a new account</Link>
                </p>
            </form>
        </div>
    );
}
export default Login;