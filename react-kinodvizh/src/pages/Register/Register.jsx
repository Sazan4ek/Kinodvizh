import { useContext, useState } from 'react';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import './Register.css';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Link } from 'react-router-dom';
function Register()
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);

    const { register } = useContext(AuthContext);

    const handleRegister = async (event) => {
        event.preventDefault();
        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        }
        register(payload, setErrors);  
    }

    return(
        <>
            <div className="auth-container">
                <h1 className='title'>Register here</h1>
                <form className="auth">
                    <InputWithLabel 
                        type={'text'} 
                        label={'First Name'}
                        placeholder={'Your First Name'} 
                        className={'auth-input'} 
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        error={errors.firstName ? errors.firstName[0] : null}
                    />
                    <InputWithLabel 
                        type={'text'} 
                        label={'Last Name'} 
                        placeholder={'Your Last Name'} 
                        className={'auth-input'}
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        error={errors.lastName ? errors.lastName[0] : null}
                    />
                    <InputWithLabel 
                        type={'text'} 
                        label={'Email'} 
                        placeholder={'Your Email'} 
                        className={'auth-input'} 
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        error={errors.email ? errors.email[0] : null}
                    />
                    <InputWithLabel 
                        type={'password'} 
                        label={'Password'}
                        placeholder={'We will not tell it smb'} 
                        className={'auth-input'} 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        error={errors.password ? errors.password[0] : null}
                    />
                    <InputWithLabel 
                        type={'password'} 
                        label={'Confirm your password'} 
                        placeholder={'Password Confirmation'}
                        className={'auth-input'} 
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        error={errors.passwordConfirmation ? errors.passwordConfirmation[0] : null}
                    />
                    <button className="blue-btn mt-2" onClick={handleRegister}>Register</button>
                    <p className="message">
                        Already Have An Account? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Register;