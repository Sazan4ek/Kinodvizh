import { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { AuthContext } from '../../contexts/AuthContextProvider';

function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { login } = useContext(AuthContext)

    const handleLogin = (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password,
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
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    error={errors.email ? errors.email[0] : null}
                />
                <InputWithLabel 
                    type={'password'} 
                    label={'Password'}
                    placeholder={'Enter password of your account'} 
                    className={'auth-input'} 
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    error={errors.password ? errors.password[0] : null}
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