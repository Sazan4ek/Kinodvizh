import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewsList.css';

function ReviewsList({reviews, watchableType, watchable})
{
    console.log(reviews);
    return (
        <div className="reviews-container">
            <span><h1>Reviews: {reviews.length}</h1></span>
            <div className="reviews-list">
                {reviews && Object.values(reviews)?.map((review, index) => {
                    return <ReviewCard key={index} review={review} watchableType={watchableType} watchable={watchable}/>
                })}
            </div>
        </div>
    )
}

export default ReviewsList;