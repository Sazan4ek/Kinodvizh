import { useContext, useEffect, useState } from 'react';
import './UserProfile.css';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Error404 from '../Error404/Error404';
import ReviewsList from '../../components/ReviewsList/ReviewsList';

function UserProfile() 
{
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isWrongRoute, setIsWrongRoute] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const payload = {
      with: [
        'reviews.user'
      ]
    }
      axiosClient.post(`/users/${userId}`, payload)
        .then(({data}) => {setCurrentUser(data); setUserReviews(data.reviews)})
        .catch((error) => {
          if(error.response.status === 404)
          {
            setIsWrongRoute(true);
          }
        })
  }, [])

  if(isWrongRoute) return <Error404/>;

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