import ReviewCard from '../ReviewCard/ReviewCard';
import './ReviewsList.css';

function ReviewsList({reviews})
{

    return (
        <div className="reviews-container">
            <span><h1>Reviews: {reviews?.length}</h1></span>
            <div className="reviews-list">
                {reviews && Object.values(reviews)?.map((review, index) => {
                    return <ReviewCard key={index} review={review}/>
                })}
            </div>
        </div>
    )
}

export default ReviewsList;