import FilmCard from "../FilmCard/FilmCard";
import SeriesCard from "../SeriesCard/SeriesCard";
import './WatchablesList.css'

function WatchablesList({watchables, type})
{
    let startNumber = (watchables.current_page - 1) * watchables.per_page + 1;
    return (
        <div className="watchables-list">
            {watchables.data?.length === 0 && <span className="mt-4 fs-3">No results</span>}
            {type === 'films' && (
                <>
                    {watchables.data?.map((film, index) => {
                        return <FilmCard key={index} film={film} number={startNumber++}/>
                    })}
                </>
            )}
            {type === 'series' && (
                <>
                    {watchables.data?.map((series, index) => {
                        return <SeriesCard key={index} series={series} number={startNumber++}/>
                    })}
                </>
            )}
        </div>
    )
}

export default WatchablesList;