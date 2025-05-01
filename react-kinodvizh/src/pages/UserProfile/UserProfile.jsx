import { useContext, useState } from 'react';
import './UserProfile.css';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Error404 from '../Error404/Error404';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import useRequest from '../../hooks/useRequest';
import Spinner from '../../components/Spinner/Spinner';


function UserProfile() 
{
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  const navigate = useNavigate();

  const getUserWithReviews = async (userId) => {
    const payload = {
      with: [
        'reviews.user'
      ]
    };

    return (
      axiosClient.post(`/users/${userId}`, payload)
        .then(({data}) => {setCurrentUser(data); setUserReviews(data.reviews)})
    );
  }

  const [loading, error] = useRequest(
    getUserWithReviews,
    [],
    userId,
  );

  if(error && error.response.status === 404) return <Error404/>;

  if(loading) return <Spinner />

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>First name</th>
            <td>{currentUser?.first_name}</td>
          </tr>
          <tr>
            <th>Last name</th>
            <td>{currentUser?.last_name}</td>
          </tr>
        </tbody>
      </table>
      {userId == user?.id ? (
        <button onClick={() => navigate(`/users/${user.id}/profile/edit`)} className='mt-2 btn btn-warning'>Change info</button>
      ) : ''}
      <ReviewsList reviews={userReviews}/>
    </>
  );

}

export default UserProfile;