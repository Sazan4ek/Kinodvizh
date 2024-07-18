import { Link } from 'react-router-dom';
import './Error404.css';

function Error404()
{
    return (
        <div className="error-container">
            <span className='d-flex align-items-end gap-3'>error <h1>404</h1></span>
            <span>Oops.. wrong way</span>
            <Link to={'/'}>Back home</Link>
        </div>
    );
}

export default Error404;