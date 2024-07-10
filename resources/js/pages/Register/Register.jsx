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

    const { register, errors } = useContext(AuthContext);

    const handleRegister = async (event) => {
        event.preventDefault();
        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        }
        register(payload);  
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
                    />
                    {errors.firstName && (
                        <div className='alert-danger'>
                            {errors.firstName[0]}
                        </div>
                    )}
                    <InputWithLabel 
                        type={'text'} 
                        label={'Last Name'} 
                        placeholder={'Your Last Name'} 
                        className={'auth-input'}
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                    />
                    {errors.lastName && (
                        <div className='alert-danger'>
                            {errors.lastName[0]}
                        </div>
                    )}
                    <InputWithLabel 
                        type={'text'} 
                        label={'Email'} 
                        placeholder={'Your Email'} 
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
                        placeholder={'We will not tell it smb'} 
                        className={'auth-input'} 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    {errors.password && (
                        <div className='alert-danger'>
                            {errors.password[0]}
                        </div>
                    )}
                    <InputWithLabel 
                        type={'password'} 
                        label={'Confirm your password'} 
                        placeholder={'Password Confirmation'}
                        className={'auth-input'} 
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                    />
                    {errors.passwordConfirmation && (
                        <div className='alert-danger'>
                            {errors.passwordConfirmation[0]}
                        </div>
                    )}
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