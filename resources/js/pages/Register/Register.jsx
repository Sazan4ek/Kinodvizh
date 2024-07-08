import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../../components/AuthInput/InputWithLabel';
function Register()
{
    // const [userName, setUserName] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    // const [userPassword, setUserPassword] = useState('');
    // const { user, isInList, setUser, addUserToList} = useContext(UserContext);
    // const navigate = useNavigate();
    // function handleClick(event)
    // {
    //     event.preventDefault();
    //     let thatUser = {userName, userPassword, userEmail};
    //     if(!isInList(thatUser)){addUserToList(thatUser);setUser(thatUser); navigate('/success');}
    //     else alert("Such user already exists");
    // }
    // if(user === null)
        return(
            <>
                <div className="auth-container">
                <h1 className='title'>Register</h1>
                <form className="auth">
                    <InputWithLabel type={'text'} label={'Name'} placeholder={'Your Name'} onChange={event => setUserName(event.target.value)}/>
                    <InputWithLabel type={'text'} label={'Email'} placeholder={'Your Email'} onChange={event => setUserEmail(event.target.value)}/>
                    <InputWithLabel type={'password'} label={'Password'} placeholder={'We will not tell it smb'} onChange={event => setUserPassword(event.target.value)}/>
                    <button className="blue-btn" onClick={handleClick}>Register</button>
                </form>
                </div>
            </>
        );
    // else
    // return (
    //     <>
    //         <span>Sign Out before</span> 
    //         <button className="blue-btn" onClick={() => setUser(null)}>Sign Out</button>
    //     </>
    // );
}

export default Register;