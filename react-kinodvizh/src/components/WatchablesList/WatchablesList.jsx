import FilmCard from "../FilmCard/FilmCard";
import SeriesCard from "../SeriesCard/SeriesCard";
import './WatchablesList.css'

function WatchablesList({watchables, type})
{
    // console.log(watchables);
    return (
        <div className="watchables-list">
            {watchables.data?.length === 0 && <span className="mt-4">No results</span>}
            {type === 'films' && (
                <>
                    {watchables.data?.map((film, index) => {
                        return <FilmCard key={index} film={film} number={index + 1}/>
                    })}
                </>
            )}
            {type === 'series' && (
                <>
                    {watchables.data?.map((series, index) => {
                        return <SeriesCard key={index} series={series} number={index + 1}/>
                    })}
                </>
            )}
        </div>
    )
}

export default WatchablesList;