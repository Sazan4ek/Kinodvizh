import './Pagination.css';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

function Pagination({links, getWatchables}) 
{
    return (
        <div className="pagination-container">
            {links?.length > 3 && Object.values(links)?.map((link, index) => {
                if(link.url)
                    return (
                        <button 
                            className={(link.active ? 'pagination-active' : '') + " pagination-btn"}
                            key={link.label} 
                            onClick={() => {getWatchables(null, link.url); window.scrollTo(0,0)}}
                        >
                            {index === 0 ? <MdArrowBackIosNew/> : ''}
                            {index !== 0 && index !== links.length - 1 ? link.label : ''}
                            {index === links.length - 1 ? <MdArrowForwardIos/> : ''}
                        </button>
                    );
            })}
        </div>
    );
}

export default Pagination;