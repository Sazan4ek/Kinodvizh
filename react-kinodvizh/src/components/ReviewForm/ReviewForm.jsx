import { useContext, useState } from "react";
import ColorfulRating from "../ColorfulRating/ColorfulRating";
import './ReviewForm.css';
import { Rate } from 'antd';
import { Input } from 'antd';
import { AuthContext } from "../../contexts/AuthContextProvider";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function ReviewForm({watchableType, watchable, setReviews, rating, setRating, marksCount, setMarksCount})
{
    const { user } = useContext(AuthContext);

    const desc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [inputRating, setInputRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const navigate = useNavigate();

    const makeReview = async (event) => {
        event.preventDefault();
        if(!user) navigate('/login');
        const payload = {
            text:  reviewText,
            rating: inputRating,
            userId: user?.id,
            watchableType: watchableType
        }
        if(watchableType === 'film') payload.filmId = watchable?.id;
        else payload.seriesId = watchable?.id;

        await axiosClient.post('/reviews/create', payload)
            .then(({data}) => {
                setReviews(data[0]); 
                setMarksCount(data[1]); 
                setRating(data[2]);
                setReviewText('');
                setInputRating(0);
            })
            .catch(error =>console.log(error));
    }

    return (
        <div className="review-container">
            <form className="review-making-container">
                <h2>Review Form</h2>
                <div className="rate-container">
                    <label>Rate the {watchableType}</label>
                    <Rate 
                        count={10} 
                        tooltips={desc} 
                        onChange={setInputRating} 
                        value={inputRating} 
                        className="rate"
                        style={{fontSize: '30px'}}
                    />
                </div>
                <label>Write down a review</label>
                <TextArea placeholder="Enter the review text" allowClear value={reviewText} onChange={(event) => setReviewText(event.target.value)} />
                <button onClick={makeReview} className="btn btn-warning review-btn">Make a review</button>
            </form>
            <div className="film-rating">
                <span>Watchers Rating:</span>
                <ColorfulRating rating={rating}/>
                <span className='marksCount'>{marksCount} watchers marks</span>
            </div>
            <div className="film-rating">
                <span>Expert Rating:</span>
                <ColorfulRating rating={watchable?.expertRating}/>
                <span className='marksCount'>{watchable?.expertMarksCount} expert marks</span>
            </div>
        </div>
    );
}

export default ReviewForm;