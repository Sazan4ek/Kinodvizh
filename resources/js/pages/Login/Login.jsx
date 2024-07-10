import { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { AuthContext } from '../../contexts/AuthContextProvider';

function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, errors } = useContext(AuthContext)

    const handleLogin = (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password,
        }
        login(payload);
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
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                {errors.email && (
                    <div className='alert-danger'>
                        {errors.email[0]}
                    </div>
                )}
                <InputWithLabel 
                    type={'password'} 
                    label={'Password'}
                    placeholder={'Enter password of your account'} 
                    className={'auth-input'} 
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                {errors.password && (
                    <div className='alert-danger'>
                        {errors.password[0]}
                    </div>
                )}
                <button className="blue-btn mt-2" onClick={handleLogin}>Login</button>
                <p className="message">
                    Not Registered? <Link to= '/register'>Create a new account</Link>
                </p>
            </form>
        </div>
    );
}
export default Login;