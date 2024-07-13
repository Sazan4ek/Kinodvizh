import ColorfulRating from '../ColorfulRating/ColorfulRating';
import './SeriesCard.css';
import { IoEye } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import axiosClient from '../../axiosClient';

function SeriesCard({series, number})
{
    const genres = series.genres;
    const posterUrl = series?.materials[0]?.uri;
    const releaseYear = series.releaseDate.split('-')[0];

    const { user } = useContext(AuthContext);

    const [IsWantedToWatch, setIsWantedToWatch] = useState(series?.users_who_wanted_to_watch?.some((elem)=> elem.id === user?.id));
    const [IsWatched, setIsWatched] = useState(series?.users_who_watched?.some((elem)=> elem.id === user?.id));


    const toggleUserWhoWantedToWatch = async (func) => {
        const payload = {
            series_id: series.id,
            user_id: user.id,
            func
        }
        axiosClient.post('series/toggleUserWhoWantedToWatch', payload)
        .then(() => { setIsWantedToWatch(!IsWantedToWatch); })
        .catch(error => console.log(error));
    }

    const toggleUserWhoWatched = async (func) => {
        const payload = {
            series_id: series.id,
            user_id: user.id,
            func
        }
        axiosClient.post('series/toggleUserWhoWatched', payload)
        .then(() => { setIsWatched(!IsWatched); })
        .catch(error => console.log(error));
    }

    return (
        <div className="watchable-card">
            <div className="number-container">
                <span className='watchable-number'>{number}</span>
            </div>
            <div className="poster-container">
                <img src={posterUrl} alt="Series-poster" height={'120'}/>
            </div>
            <div className="watchable-info">
                <span className="series-name">{series.name}</span>
                <span>{releaseYear}, seasons count: {series.seasonsCount}</span>
                <span>Country: {series.country}</span>
                <span>Genres: {genres?.map((genre, index) => {
                    let string = genre.name;
                    if(index !== genres.length - 1) string += ', '
                    return string;
                })}
                </span>
                <span>Directors: {series.director}</span>
                <span>Scenario makers: {series.scenarioMaker}</span>
                <span>Producers: {series.producer}</span>
            </div>
            <div className="watchable-rating">
                <ColorfulRating rating={series.rating}/> <br />
                <span className='marksCount'>{series.marksCount} marks</span>
            </div>
            <div className="watchable-buttons">
                { IsWantedToWatch ? <abbr title='I want to watch'><IoBookmark onClick={() => toggleUserWhoWantedToWatch('detach')} className='watchable-btn'/></abbr> 
                : <abbr title="I do not want to watch"><CiBookmark onClick={() => toggleUserWhoWantedToWatch('attach')} className='watchable-btn'/></abbr>}
                { IsWatched ? <abbr title="I watched"><IoEye onClick={() => toggleUserWhoWatched('detach')} className='watchable-btn'/></abbr>
                : <abbr title="not watched"><MdOutlineRemoveRedEye onClick={() => toggleUserWhoWatched('attach')} className='watchable-btn'/></abbr>}
            </div>
        </div>
    );
}

export default SeriesCard;