import { useEffect, useState } from 'react';
import './SideBar.css';
import axiosClient from '../../axiosClient';
import { Select, Slider } from 'antd';

function SideBar({props}) 
{
    const actualYear = new Date().getFullYear();
    const {
        watchableType, 
        setWatchableType,
        // country,
        setCountry, 
        // genre,
        setGenre,
        // rateFrom,
        setRateFrom, 
        // rateUntil, 
        setRateUntil, 
        // yearFrom, 
        setYearFrom, 
        // yearUntil, 
        setYearUntil
    } = {...props};
    const [countriesList, setCountriesList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    useEffect(() => {
        axiosClient.get(`/${watchableType}/countries`).then(({data}) => {
            setCountriesList(data);
        })
        .catch(error => console.log(error));

        axiosClient.get(`/genres`).then(({data}) => {
            setGenresList(data);
        })
        .catch(error => console.log(error));
    }, [watchableType]);
    return (
        <div className="sidebar">
            <div className="slogan">
                Kinodvizh - grab your popcorn and get going!
            </div>
            <div className="filter-panel">
                <div className="watchable-type-switch">
                    <button 
                        onClick={watchableType === 'films' ? null : () => setWatchableType('films')} 
                        className={(watchableType === 'films'? 'active-btn' : '') + ' watchable-type-btn'}
                    >
                        Films
                    </button>

                    <button 
                        onClick={watchableType === 'series' ? null : () => setWatchableType('series')} 
                        className={(watchableType === 'series'? 'active-btn' : '') + ' watchable-type-btn'}
                    >
                        Series
                    </button>
                </div>
                <div className="countries-dropdown-container">
                    <span className='country'>Country: </span>
                <Select
                    showSearch
                    placeholder="Select the country"
                    optionFilterProp="label"
                    onChange={(country) => setCountry(country)}
                    options={Object.values(countriesList)?.map((country) => { 
                        return {
                            value: country, 
                            label: country
                        };
                    })}
                    style={{
                        width: 'fit-content', 
                        minWidth: '40px'
                    }}
                />
                </div>
                <div className="countries-dropdown-container">
                    <span className='genre'>Genre: </span>
                    <Select
                        showSearch
                        placeholder="Select the genre"
                        optionFilterProp="label"
                        onChange={(genre) => setGenre(genre)}
                        options={genresList?.map((genre) => { 
                            return {
                                value: genre.name, 
                                label: genre.name
                            };
                        })}
                        style={{
                            width: 'fit-content', 
                            minWidth: '40px'
                        }}
                    />
                </div>
                <div className="years-range-container">
                    <label >Years</label>
                    <Slider 
                        className='year-range'
                        druggableTrack
                        range 
                        min={1900}
                        max={actualYear}
                        defaultValue={[1900, actualYear]} 
                        onChangeComplete={([value1, value2]) => {setYearFrom(value1); setYearUntil(value2);}}
                        style={{ width: '70%'}}
                        marks={{ 1900: '1900 year', [actualYear]: `${actualYear}    year`}}
                    />
                </div>
                <div className="rating-range-container">
                    <label htmlFor="">Rating</label>
                    <Slider 
                        className='year-range'
                        druggableTrack
                        range 
                        min={0}
                        max={10}
                        defaultValue={[0, 10]} 
                        step={0.1}
                        onChangeComplete={([value1, value2]) => {setRateFrom(value1); setRateUntil(value2);}}
                        style={{ width: '70%'}}
                        marks={{ 0: '0', 10: '10'}}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;