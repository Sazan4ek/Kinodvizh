import ColorfulRating from '../ColorfulRating/ColorfulRating';
import './FilmCard.css';
import { IoEye } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import axiosClient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';

function FilmCard({film, number})
{
    const genres = film.genres;
    const posterUrl = film?.materials[0]?.uri;
    const releaseYear = film.releaseDate.split('-')[0];

    const navigate = useNavigate();

    const { user, userRole } = useContext(AuthContext);

    const [IsWantedToWatch, setIsWantedToWatch] = useState(film?.users_who_wanted_to_watch?.some((elem)=> elem.id === user?.id));
    const [IsWatched, setIsWatched] = useState(film?.users_who_watched?.some((elem)=> elem.id === user?.id));
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteFilm = async (filmId) => {
        await axiosClient.delete(`admin/films/${filmId}`)
            .then(() => setIsDeleted(true))
            .catch(error => console.log(error));
    }

    const toggleUserWhoWantedToWatch = async (func) => {
        const payload = {
            film_id: film.id,
            user_id: user.id,
            func
        }
        axiosClient.post('film/toggleUserWhoWantedToWatch', payload)
        .then(() => { setIsWantedToWatch(!IsWantedToWatch); })
        .catch(error => console.log(error));
    }

    const toggleUserWhoWatched = async (func) => {
        const payload = {
            film_id: film.id,
            user_id: user.id,
            func
        }
        axiosClient.post('film/toggleUserWhoWatched', payload)
        .then(() => { setIsWatched(!IsWatched); })
        .catch(error => console.log(error));
    }

    if(isDeleted) return <></>;

    return (
        <div className="watchable-card">
            <div className="number-container">
                <span className='watchable-number'>{number}</span>
            </div>
            <div className="poster-container" onClick={() => navigate(`/film/${film?.id}`)}>
                <img src={posterUrl} alt="film-poster" height={'120'}/>
            </div>
            <div className="watchable-info" onClick={() => navigate(`/film/${film?.id}`)}>
                <span className="film-name">{film.name}</span>
                <span>{releaseYear}, {film.duration}</span>
                <span>Country: {film.country}</span>
                <span>Genres: {genres?.map((genre, index) => {
                    let string = genre.name;
                    if(index !== genres.length - 1) string += ', '
                    return string;
                })}
                </span>
                <span>Directors: {film.director}</span>
                <span>Scenario makers: {film.scenarioMaker}</span>
                <span>Producers: {film.producer}</span>
            </div>
            <div className="watchable-rating">
                <ColorfulRating rating={film.rating}/> <br />
                <span className='marksCount'>{film.marksCount} marks</span>
            </div>
            <div className="watchable-buttons">
                { IsWantedToWatch ? (
                    <abbr title='I want to watch'>
                        <IoBookmark fill={'#ce9d07'} onClick={() => toggleUserWhoWantedToWatch('detach')} className='watchable-btn'/>
                    </abbr> 
                ) : (
                    <abbr title="I do not want to watch">
                        <CiBookmark onClick={() => toggleUserWhoWantedToWatch('attach')} className='watchable-btn'/>
                    </abbr>
                )}
                { IsWatched ? (
                    <abbr title="I watched">
                        <IoEye onClick={() => toggleUserWhoWatched('detach')} className='watchable-btn'/>
                    </abbr>
                ) : (
                    <abbr title="not watched">
                        <MdOutlineRemoveRedEye onClick={() => toggleUserWhoWatched('attach')} className='watchable-btn'/>
                    </abbr>
                )}
            </div>
            {userRole === 'admin' && (
                <div className="admin-buttons">
                    <button onClick={() => navigate(`/admin/film/${film?.id}/edit`)} className='btn btn-success'>Change info</button>
                    <button onClick={() => deleteFilm(film?.id)} className='btn btn-danger'>Delete</button>
                </div>
            )}
        </div>
    );
}

export default FilmCard;