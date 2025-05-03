import { useState } from 'react';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import './Register.css';
import { useAuth } from '../../contexts/AuthContextProvider';
import { Link } from 'react-router-dom';

function Register()
{
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errors, setErrors] = useState({});

    const { register } = useAuth();

    const handleRegister = async (event) => {
        event.preventDefault();
        const payload = {
            ...formData,
            password_confirmation: formData.passwordConfirmation
        };
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
                        value={formData.firstName}
                        onChange={event => setFormData({ ...formData, firstName: event.target.value })}
                        error={errors.firstName ? errors.firstName[0] : null}
                    />
                    <InputWithLabel 
                        type={'text'} 
                        label={'Last Name'} 
                        placeholder={'Your Last Name'} 
                        className={'auth-input'}
                        value={formData.lastName}
                        onChange={event => setFormData({ ...formData, lastName: event.target.value })}
                        error={errors.lastName ? errors.lastName[0] : null}
                    />
                    <InputWithLabel 
                        type={'text'} 
                        label={'Email'} 
                        placeholder={'Your Email'} 
                        className={'auth-input'} 
                        value={formData.email}
                        onChange={event => setFormData({ ...formData, email: event.target.value })}
                        error={errors.email ? errors.email[0] : null}
                    />
                    <InputWithLabel 
                        type={'password'} 
                        label={'Password'}
                        placeholder={'We will not tell it smb'} 
                        className={'auth-input'} 
                        value={formData.password}
                        onChange={event => setFormData({ ...formData, password: event.target.value })}
                        error={errors.password ? errors.password[0] : null}
                    />
                    <InputWithLabel 
                        type={'password'} 
                        label={'Confirm your password'} 
                        placeholder={'Password Confirmation'}
                        className={'auth-input'} 
                        value={formData.passwordConfirmation}
                        onChange={event => setFormData({ ...formData, passwordConfirmation: event.target.value })}
                        error={errors.password_confirmation ? errors.password_confirmation[0] : null}
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