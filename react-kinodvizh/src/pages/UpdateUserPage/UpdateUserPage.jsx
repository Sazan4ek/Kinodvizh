import { useContext, useEffect, useState } from 'react';
import './UpdateUserPage';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Error404 from '../Error404/Error404';

function UpdateUserPage() 
{
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [errors, setErrors] = useState([]);
  const [isWrongRoute, setIsWrongRoute] = useState(false);
  
  const navigate = useNavigate();

  const updateUser = async (event) => {
    event.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName
    }
    await axiosClient.patch(`users/${userId}`, payload)
      .then(() => navigate(-1))
      .catch(errors => {
        if(errors.response.status === 404)
        {
          setIsWrongRoute(true);
        }
        if(errors.response.status === 422)
        {
            setErrors(errors.response.data.errors);
        }
      })
  }
  useEffect(() => {
    if(!user || userId != user?.id) navigate(-1);
  }, [userId, user])

  if(isWrongRoute) return <Error404/>;

  return (
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
        <button onClick={updateUser} className="btn btn-success mt-2 mx-auto">Submit</button>
      </form>
  );

}

export default UpdateUserPage;