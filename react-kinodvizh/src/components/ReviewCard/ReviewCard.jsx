import { Link } from 'react-router-dom';
import './ReviewCard.css';
import { LuUserRound } from "react-icons/lu";
import { Rate } from 'antd';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useContext, useState } from 'react';
import axiosClient from '../../axiosClient';
import { AuthContext } from '../../contexts/AuthContextProvider';

function ReviewCard({review})
{
    const { userRole } = useContext(AuthContext);

    const [likesCount, setLikesCount] = useState(review?.likesCount);
    const [dislikesCount, setDislikesCount] = useState(review?.dislikesCount);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [reviewText, setReviewText] = useState(review.text);
    const writer = review?.user;
    const desc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const blockReview = async (reviewId) => {
        await axiosClient.patch(`admin/reviews/${reviewId}`)
            .then(({data}) => setReviewText(data))
            .catch(error => console.log(error));
    }

    const toggleLike = async (action) => {
        const payload = {
            action: action
        }
        axiosClient.patch(`/reviews/${review?.id}/toggleLike`, payload)
            .then(({data}) => {
                if(action === 'add') setIsLiked(true);
                else setIsLiked(false);
                setLikesCount(data);
            })
    }

    const toggleDislike = async (action) => {
        const payload = {
            action: action
        }
        await axiosClient.patch(`/reviews/${review?.id}/toggleDislike`, payload)
            .then(({data}) => {
                if(action === 'add') setIsDisliked(true);
                else setIsDisliked(false);
                setDislikesCount(data);
            })
    }

    return (
        <div className="review-card">
            <div className="up-row">
                <Link to={`/users/${writer?.id}/profile`} className="d-flex gap-2 without-underline">
                    <LuUserRound className="writer-icon"/>
                    <span className="writer-fullName">
                        {writer?.first_name + ' '}
                        {writer?.last_name}
                    </span>
                </Link>
                <span className='d-flex gap-2'>
                    <span className='fs-5'>Mark: </span>
                    <Rate
                        count={10} 
                        disabled
                        tooltips={desc} 
                        value={review?.rating} 
                        className="rate"
                        style={{fontSize: '30px'}}
                    />
                </span>
            </div>
            <div className="middle-row">
                <p className='review-text'>
                    {reviewText}
                </p>
            </div>
            <div className="down-row">
                {userRole === 'admin' && (
                    <div className="admin-delete-review-btn">
                        <button onClick={() => blockReview(review?.id)} className='btn btn-danger'>Block the review text</button>
                    </div>
                )}
                <span>
                    {(isLiked ? (
                        <BiSolidLike onClick={() => toggleLike('subtract') } className='review-like'/> 
                    ) : (
                        <BiLike onClick={() => {toggleLike('add'); if(isDisliked) toggleDislike('subtract'); }} className='review-like'/>
                    ))} 
                    {likesCount}
                </span>
                <span>
                    {(isDisliked ? (
                        <BiSolidDislike onClick={() => toggleDislike('subtract') }className='review-like'/> 
                    ) : (
                        <BiDislike onClick={() => {toggleDislike('add'); if(isLiked) toggleLike('subtract');}} className='review-like'/>
                    ))} 
                    {dislikesCount}
                </span>
            </div>
        </div>
    )
}

export default ReviewCard;