import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useContext, useEffect, useState } from "react";
import './SeriesPage.css';
import { IoBookmark, IoEye } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContextProvider";
import ColorfulRating from "../../components/ColorfulRating/ColorfulRating";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

function SeriesPage() 
{
    const { seriesId } = useParams();
    const [series, setSeries] = useState(null);
    const [reviews, setReviews] = useState([])
    const [marksCount, setMarksCount] = useState(null);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const posterUrl = series?.materials.find((material) => material.type === 'poster').uri;
    const trailerUrl = series?.materials.find((material) => material.type === 'trailer').uri;
    const genres = series?.genres;
    console.log(series, reviews);

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

    const getSeries = async (seriesId) => {
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
        await axiosClient.post(`series/${seriesId}`, payload)
            .then(({data}) => {
                setLoading(false); 
                setSeries(data); 
                setMarksCount(data.marksCount);
                setRating(data.rating); 
                setReviews(data.reviews);
            })
            .catch(error => {console.log(error); setLoading(false);});
    }

    useEffect(() => {
        getSeries(seriesId)
    }, [])

    if(loading) return <span className='mt-5'>Loading...</span>;
    else 

    return (
        <>
            {console.log(series)}
            <div className="series-container">
                <div className="left-side">
                    <div className="poster-container">
                        <img src={posterUrl} alt="series-poster" width={'300'}/>
                    </div>
                    <div className="trailer-container">
                    <img src={trailerUrl} alt="series-trailer" width={300}/>
                    </div>
                        
                </div>
                <div className="middle-side">
                    <h1 className="series-h1">
                        {series?.name}
                    </h1>
                    <div className="middle-watchable-buttons">
                        { IsWantedToWatch ? (
                            <abbr title='I want to watch'>
                                <IoBookmark fill={'#ce9d07'} onClick={() => toggleUserWhoWantedToWatch('detach')} className='middle-watchable-btn'/>
                            </abbr> 
                        ) : (
                            <abbr title="I do not want to watch">
                                <CiBookmark onClick={() => toggleUserWhoWantedToWatch('attach')} className='middle-watchable-btn'/>
                            </abbr>
                        )}
                        { IsWatched ? (
                            <abbr title="I watched">
                                <IoEye onClick={() => toggleUserWhoWatched('detach')} className='middle-watchable-btn'/>
                            </abbr>
                        ) : (
                            <abbr title="not watched">
                                <MdOutlineRemoveRedEye onClick={() => toggleUserWhoWatched('attach')} className='middle-watchable-btn'/>
                            </abbr>
                        )}
                    </div>
                    <div className="series-about-container">
                        <h3>About series</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Country</th>
                                    <td>{series?.country}</td>
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
                                    <td>{series?.releaseDate}</td>
                                </tr>
                                <tr>
                                    <th>Director</th>
                                    <td>{series?.director}</td>
                                </tr>
                                <tr>
                                    <th>Scenario maker</th>
                                    <td>{series?.scenarioMaker}</td>
                                </tr>
                                <tr>
                                    <th>Producer</th>
                                    <td>{series?.producer}</td>
                                </tr>
                                <tr>
                                    <th>Budget</th>
                                    <td>${series?.budget}</td>
                                </tr>
                                <tr>
                                    <th>Fees</th>
                                    <td>${series?.fees}</td>
                                </tr>
                                <tr>
                                    <th>Age limit</th>
                                    <td>{series?.ageLimit}+</td>
                                </tr>
                                <tr>
                                    <th>Seasons count</th>
                                    <td>{series?.seasonsCount}</td>
                                </tr>
                                <tr>
                                    <th>Series duration</th>
                                    <td><p>{series?.seriesDuration}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="right-side">
                    <ColorfulRating rating={rating}/>
                    <span>{marksCount} marks</span>
                    <span>{reviews.length} reviews</span>
                </div>  
            </div>
            <ReviewForm 
                watchableType={'series'} 
                watchable={series} 
                setReviews={setReviews}
                marksCount={marksCount} 
                setMarksCount={setMarksCount} 
                rating={rating} 
                setRating={setRating}
            />
            <ReviewsList reviews={reviews} watchable={series}/>
        </>
    )
}

export default SeriesPage;