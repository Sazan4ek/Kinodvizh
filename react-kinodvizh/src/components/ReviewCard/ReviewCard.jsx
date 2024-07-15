import { Link } from 'react-router-dom';
import './ReviewCard.css';
import { LuUser2 } from "react-icons/lu";
import { Rate } from 'antd';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useState } from 'react';
import axiosClient from '../../axiosClient';

function ReviewCard({review})
{
    const [likesCount, setLikesCount] = useState(review?.likesCount);
    const [dislikesCount, setDislikesCount] = useState(review?.dislikesCount);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const writer = review?.user;
    const desc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const toggleLike = async (action) => {
        const payload = {
            action: action
        }
        axiosClient.patch(`/review/${review?.id}/toggleLike`, payload)
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
        await axiosClient.patch(`/review/${review?.id}/toggleDislike`, payload)
            .then(({data}) => {
                if(action === 'add') setIsDisliked(true);
                else setIsDisliked(false);
                setDislikesCount(data);
            })
    }

    return (
        <div className="review-card">
            <div className="up-row">
                <Link to={`/user/${writer?.id}/profile`} className="d-flex gap-2 without-underline">
                    <LuUser2 className="writer-icon"/>
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
                    {review.text}
                </p>
            </div>
            <div className="down-row">
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