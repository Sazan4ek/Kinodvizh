import './Pagination.css';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import useWatchableFilters from '../../hooks/useWatchableFilters';

function Pagination({links}) 
{
    const { setFilterValue } = useWatchableFilters();

    return (
        <div className="pagination-container">
            {links?.length > 3 && Object.values(links)?.map((link, index) => {
                if(link.url) {
                    const toPage = link.url.slice(-1);
                    return (
                        <button 
                            className={(link.active ? 'pagination-active' : '') + " pagination-btn"}
                            key={link.label} 
                            onClick={() => {setFilterValue("page", toPage); window.scrollTo(0,0)}}
                        >
                            {index === 0 ? <MdArrowBackIosNew/> : ''}
                            {index !== 0 && index !== links.length - 1 ? link.label : ''}
                            {index === links.length - 1 ? <MdArrowForwardIos/> : ''}
                        </button>
                    );
                }
            })}
        </div>
    );
}

export default Pagination;