import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useContext, useEffect, useState } from "react";
import './FilmPage.css';
import { IoBookmark, IoEye } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContextProvider";
import ColorfulRating from "../../components/ColorfulRating/ColorfulRating";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import Error404 from "../Error404/Error404";

function FilmPage() 
{
    const { filmId } = useParams();
    const [film, setFilm] = useState(null);
    const [reviews, setReviews] = useState([])
    const [marksCount, setMarksCount] = useState(null);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isWrongRoute, setIsWrongRoute] = useState(false);
    const posterUrl = film?.materials?.find((material) => material.type === 'poster').uri;
    const trailerUrl = film?.materials?.find((material) => material.type === 'trailer').uri;
    const genres = film?.genres;

    const navigate = useNavigate();

    const { user, userRole } = useContext(AuthContext);

    const [IsWantedToWatch, setIsWantedToWatch] = useState(false);
    const [IsWatched, setIsWatched] = useState(false);

    const deleteFilm = async (filmId) => {
        await axiosClient.delete(`admin/films/${filmId}`)
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    }

    const toggleUserWhoWantedToWatch = async (func) => {
        if(!user) navigate('/login');
        const payload = {
            film_id: film.id,
            user_id: user.id,
            func
        }
        axiosClient.post('films/toggleUserWhoWantedToWatch', payload)
        .then(() => { setIsWantedToWatch(!IsWantedToWatch); })
        .catch(error => console.log(error));
    }

    const toggleUserWhoWatched = async (func) => {
        if(!user) navigate('/login');
        const payload = {
            film_id: film.id,
            user_id: user.id,
            func
        }
        axiosClient.post('films/toggleUserWhoWatched', payload)
        .then(() => { setIsWatched(!IsWatched); })
        .catch(error => console.log(error));
    }

    const getFilm = async (filmId) => {
        setLoading(true);
        const payload = {
            with: [
                'reviews.user',
                'usersWhoWatched',
                'usersWhoWantedToWatch',
                'materials',
                'genres'
            ]
        }
        await axiosClient.post(`films/${filmId}`, payload)
            .then(({data}) => {
                setLoading(false); 
                setFilm(data); 
                setMarksCount(data.marksCount);
                setRating(data.rating); 
                setReviews(data.reviews);
                setIsWantedToWatch(data?.users_who_wanted_to_watch?.some((elem)=> elem.id === user?.id));
                setIsWatched(data?.users_who_watched?.some((elem)=> elem.id === user?.id));
            })
            .catch(errors => {
                setLoading(false);
                if(errors.response.status === 404)
                {
                    setIsWrongRoute(true);
                }
            });
    }

    useEffect(() => {
        getFilm(filmId);
    }, []);
    
    if(isWrongRoute) return <Error404/>;

    if(loading) return <span className='mt-5'>Loading...</span>;

    return (
        <>
            <div className="film-container">
                <div className="left-side">
                    <div className="poster-container">
                        <img src={posterUrl} alt="film-poster" width={'300'}/>
                    </div>
                    <div className="d-flex flex-column gap-2 trailer-container">
                        <h1>Trailer:</h1>
                        <video controls src={trailerUrl} alt="film-trailer" width={300}></video>
                    </div>
                        
                </div>
                <div className="middle-side">
                    <h1 className="film-h1">
                        {film?.name}
                    </h1>
                    <div className="middle-watchable-buttons">
                        { user && IsWantedToWatch ? (
                            <abbr title='I want to watch'>
                                <IoBookmark fill={'#ce9d07'} onClick={() => toggleUserWhoWantedToWatch('detach')} className='middle-watchable-btn'/>
                            </abbr> 
                        ) : (
                            <abbr title="I do not want to watch">
                                <CiBookmark onClick={() => toggleUserWhoWantedToWatch('attach')} className='middle-watchable-btn'/>
                            </abbr>
                        )}
                        { user && IsWatched ? (
                            <abbr title="I watched">
                                <IoEye onClick={() => toggleUserWhoWatched('detach')} className='middle-watchable-btn'/>
                            </abbr>
                        ) : (
                            <abbr title="not watched">
                                <MdOutlineRemoveRedEye onClick={() => toggleUserWhoWatched('attach')} className='middle-watchable-btn'/>
                            </abbr>
                        )}
                        {userRole === 'admin' && (
                            <>
                                <button onClick={() => navigate(`/admin/films/${film?.id}/edit`)} className='btn btn-success'>Change info</button>
                                <button onClick={() => deleteFilm(film?.id)} className='btn btn-danger'>Delete</button>
                            </>
                        )}
                    </div>
                    <div className="film-about-container">
                        <h3>About film</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Country</th>
                                    <td>{film?.country}</td>
                                </tr>
                                <tr>
                                    <th>Genres</th>
                                    <td>
                                    {genres?.map((genre, index) => {
                                        let string = genre.name;
                                        if(index !== genres.length - 1) string += ', '
                                        return string;
                                    })}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Release date</th>
                                    <td>{film?.releaseDate}</td>
                                </tr>
                                <tr>
                                    <th>Director</th>
                                    <td>{film?.director}</td>
                                </tr>
                                <tr>
                                    <th>Scenario maker</th>
                                    <td>{film?.scenarioMaker}</td>
                                </tr>
                                <tr>
                                    <th>Producer</th>
                                    <td>{film?.producer}</td>
                                </tr>
                                <tr>
                                    <th>Budget</th>
                                    <td>${film?.budget}</td>
                                </tr>
                                <tr>
                                    <th>Fees</th>
                                    <td>${film?.fees}</td>
                                </tr>
                                <tr>
                                    <th>Age limit</th>
                                    <td>{film?.ageLimit}+</td>
                                </tr>
                                <tr>
                                    <th>Duration</th>
                                    <td>{film?.duration}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><p>{film?.description}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="right-side">
                    <ColorfulRating rating={rating}/>
                    <span>{marksCount} marks</span>
                    <span>{reviews?.length} reviews</span>
                </div>  
            </div>
            <ReviewForm 
                watchableType={'film'} 
                watchable={film} 
                setReviews={setReviews}
                marksCount={marksCount} 
                setMarksCount={setMarksCount} 
                rating={rating} 
                setRating={setRating}
            />
            <ReviewsList reviews={reviews}/>
        </>
    )
}

export default FilmPage;