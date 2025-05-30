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
            watchable_type: "films",
            year_from: 1900,
            year_until: actualYear,
            rate_from: 0,
            rate_until: 10,
            order_by: "in order",
        });

    const [countriesList, setCountriesList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    
    useEffect(() => {
        axiosClient.get(`/${filterValues.watchable_type}/countries`)
            .then(({data}) => {
                setCountriesList(data);
            })
            .catch(error => console.log(error));

        axiosClient.get(`/genres`)
            .then(({data}) => {
                setGenresList(data);
            })
            .catch(error => console.log(error));
    }, [filterValues.watchable_type]);

    return (
        <div className="sidebar">
            <div className="slogan">
                Kinodvizh - grab your popcorn and keep going!
            </div>
            <div className="filter-panel">
                <div className="watchable-type-switch">
                    <button 
                        onClick={filterValues.watchable_type === 'films' ? null : () => setFilterValue('watchable_type', 'films')} 
                        className={(filterValues.watchable_type === 'films'? 'active-btn' : '') + ' watchable-type-btn'}
                    >
                        Films
                    </button>

                    <button 
                        onClick={filterValues.watchable_type === 'series' ? null : () => setFilterValue('watchable_type', 'series')} 
                        className={(filterValues.watchable_type === 'series'? 'active-btn' : '') + ' watchable-type-btn'}
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
                        defaultValue={[filterValues.year_from, filterValues.year_until]}
                        onChangeComplete={([year_from, year_until]) => {
                            setMultipleFilterValues({
                                year_from,
                                year_until,
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
                        defaultValue={[filterValues.rate_from, filterValues.rate_until]} 
                        step={0.1}
                        onChangeComplete={([rate_from, rate_until]) => {
                            setMultipleFilterValues({
                                rate_from,
                                rate_until,
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