import { useEffect, useState } from 'react';
import './SideBar.css';
import axiosClient from '../../axiosClient';
import { Select, Slider } from 'antd';
import useWatchableFilters from '../../hooks/useWatchableFilters';

function SideBar() 
{
    const actualYear = new Date().getFullYear();
    const { filterValues, setFilterValue, setMultipleFilterValues } = 
        useWatchableFilters({
            watchableType: "films",
            yearFrom: 1900,
            yearUntil: actualYear,
            rateFrom: 0,
            rateUntil: 10,
            orderBy: "in order",
        });
    
    console.log(filterValues.watchableType);

    const [countriesList, setCountriesList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    useEffect(() => {
        axiosClient.get(`/${filterValues.watchableType}/countries`).then(({data}) => {
            setCountriesList(data);
        })
        .catch(error => console.log(error));

        axiosClient.get(`/genres`).then(({data}) => {
            setGenresList(data);
        })
        .catch(error => console.log(error));
    }, [filterValues.watchableType]);

    return (
        <div className="sidebar">
            <div className="slogan">
                Kinodvizh - grab your popcorn and keep going!
            </div>
            <div className="filter-panel">
                <div className="watchable-type-switch">
                    <button 
                        onClick={filterValues.watchableType === 'films' ? null : () => setFilterValue('watchableType', 'films')} 
                        className={(filterValues.watchableType === 'films'? 'active-btn' : '') + ' watchable-type-btn'}
                    >
                        Films
                    </button>

                    <button 
                        onClick={filterValues.watchableType === 'series' ? null : () => setFilterValue('watchableType', 'series')} 
                        className={(filterValues.watchableType === 'series'? 'active-btn' : '') + ' watchable-type-btn'}
                    >
                        Series
                    </button>
                </div>
                <div className="dropdown-container">
                    <span className='country'>Country: </span>
                    <Select
                        showSearch
                        allowClear
                        placeholder="Select the country"
                        optionFilterProp="label"
                        value={filterValues.country}
                        onChange={(country) => setFilterValue('country', country)}
                        options={Object.values(countriesList)?.map((country) => { 
                            return {
                                value: country, 
                                label: country
                            };
                        })}
                        style={{
                            width: '7vw'
                        }}
                    />
                </div>
                <div className="dropdown-container">
                    <span className='genre'>Genre: </span>
                    <Select
                        showSearch
                        allowClear
                        placeholder="Select the genre"
                        optionFilterProp="label"
                        value={filterValues.genre}
                        onChange={(genre) => setFilterValue('genre', genre)}
                        options={genresList?.map((genre) => { 
                            return {
                                value: genre.name, 
                                label: genre.name
                            };
                        })}
                        style={{
                            width: '7vw'
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
                        defaultValue={[filterValues.yearFrom, filterValues.yearUntil]}
                        onChangeComplete={([yearFrom, yearUntil]) => {
                            setMultipleFilterValues({
                                yearFrom,
                                yearUntil,
                            });
                        }}
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
                        defaultValue={[filterValues.rateFrom, filterValues.rateUntil]} 
                        step={0.1}
                        onChangeComplete={([rateFrom, rateUntil]) => {
                            setMultipleFilterValues({
                                rateFrom,
                                rateUntil,
                            });
                        }}
                        style={{ width: '70%'}}
                        marks={{ 0: '0', 10: '10'}}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;