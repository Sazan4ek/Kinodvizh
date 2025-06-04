import { Link, useNavigate } from 'react-router-dom';
import './ReviewCard.css';
import { LuUserRound } from "react-icons/lu";
import { Rate, Spin } from 'antd';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useState } from 'react';
import axiosClient from '../../axiosClient';
import { useAuth } from '../../contexts/AuthContextProvider';

function ReviewCard({ review })
{
    const { user, userRole } = useAuth();

    const [voteStatus, setVoteStatus] = useState({
        likesCount: review?.likesCount,
        dislikesCount: review?.dislikesCount,
        isLiked: false,
        isDisliked: false,
        isVoteLoading: false
    });

    const [reviewText, setReviewText] = useState(review.text);
    const navigate = useNavigate();
    const writer = review?.user;
    const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const blockReview = async (reviewId) => {
        await axiosClient.patch(`admin/reviews/${reviewId}`)
            .then(({data}) => setReviewText(data))
            .catch(error => console.log(error));
    }

    const toggleLike = async (action) => {
        if(!user) navigate('/login');

        const payload = {
            action: action
        }

        setVoteStatus(voteStatus => {
            return {
                ...voteStatus,
                isVoteLoading: true
            };
        });

        await axiosClient.patch(`/reviews/${review?.id}/toggleLike`, payload)
            .then(({data}) => {
                setVoteStatus(voteStatus => {
                    return {
                        ...voteStatus,
                        likesCount: data,
                        isLiked: (action === 'add')
                    };
                });
                if(action === 'add' && voteStatus.isDisliked) toggleDislike('subtract');
                else setVoteStatus(voteStatus => {
                    return {
                        ...voteStatus,
                        isVoteLoading: false
                    }
                })
            });
    }

    const toggleDislike = async (action) => {
        if(!user) navigate('/login');

        const payload = {
            action: action
        }
        
        setVoteStatus(voteStatus => {
            return {
                ...voteStatus,
                isVoteLoading: true
            };
        });

        await axiosClient.patch(`/reviews/${review?.id}/toggleDislike`, payload)
            .then(({data}) => {
                setVoteStatus(voteStatus => {
                    return {
                        ...voteStatus,
                        dislikesCount: data,
                        isDisliked: (action === 'add')
                    };
                });
                if(action === 'add' && voteStatus.isLiked) toggleLike('subtract');
                else setVoteStatus(voteStatus => {
                    return {
                        ...voteStatus,
                        isVoteLoading: false
                    }
                })
            });
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
                        tooltips={marks} 
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
                {voteStatus.isVoteLoading 
                    ? <Spin spinning size='large'/>
                    : (<>
                        <span>
                            {(voteStatus.isLiked ? (
                                <BiSolidLike onClick={() => toggleLike('subtract') } className='review-like'/> 
                            ) : (
                                <BiLike onClick={() => toggleLike('add') } className='review-like'/>
                            ))} 
                            {voteStatus.likesCount}
                        </span>
                        <span>
                            {(voteStatus.isDisliked ? (
                                <BiSolidDislike onClick={() => toggleDislike('subtract') } className='review-like'/> 
                            ) : (
                                <BiDislike onClick={() => toggleDislike('add') } className='review-like'/>
                            ))} 
                            {voteStatus.dislikesCount}
                        </span>
                    </>)}
            </div>
        </div>
    )
}

export default ReviewCard;