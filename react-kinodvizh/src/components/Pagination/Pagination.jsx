import { Link } from "react-router-dom";

function Pagination({links}) 
{
    console.log(links);
    return (
        <div className="pagination-container">
            {links && Object.values(links)?.map((link) => {
                return <Link className="without-underline" to={link.url} key={link.label}>{link.label}</Link>
            })}
        </div>
    );
}

export default Pagination;