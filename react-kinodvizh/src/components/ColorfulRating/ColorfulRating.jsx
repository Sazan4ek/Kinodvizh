import './ColorfulRating.css';
import { GiLaurels } from "react-icons/gi";

function ColorfulRating({rating}) 
{
    let className;

    if(rating >= 8.0) className = 'awesome-color';
    else if(rating >= 6.0) className = 'pretty-good-color';
    else if(rating >= 4.0) className = 'not-good-color';
    else className = 'bad-color';
    return <span className={`${className} rating`}>{rating}</span>;
}

export default ColorfulRating;