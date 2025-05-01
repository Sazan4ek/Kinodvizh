import { useEffect, useState } from "react";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import TextArea from "antd/es/input/TextArea";
import './UpdateSeriesPage.css';
import { Select } from "antd";
import Error404 from "../Error404/Error404";
import useRequest from "../../hooks/useRequest";
import Spinner from "../../components/Spinner/Spinner";

function UpdateSeriesPage()
{
    const { seriesId } = useParams();
    const [genresId, setGenresId] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [director, setDirector] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [scenarioMaker, setScenarioMaker] = useState('');
    const [producer, setProducer] = useState('');
    const [budget, setBudget] = useState(null);
    const [fees, setFees] = useState(null);
    const [ageLimit, setAgeLimit] = useState(null);
    const [seasonsCount, setSeasonsCount] = useState(null);
    const [seriesDuration, setSeriesDuration] = useState('')
    const [description, setDescription]= useState('');

    const navigate = useNavigate();

    const updateSeries = async (event) => {
        event.preventDefault();
        const payload = {
            genresId,
            name,
            country,
            director,
            producer,
            releaseDate,
            scenarioMaker,
            budget,
            fees,
            ageLimit,
            seriesDuration,
            seasonsCount,
            description
        }
        await axiosClient.patch(`admin/series/${seriesId}`, payload)
            .then(() => navigate(-1))
            .catch(errors => {
                if(errors.response.status === 404)
                {
                    setIsWrongRoute(true);
                }
                if(errors.response.status === 422)
                {
                    setErrors(errors.response.data.errors);
                }
                window.scrollTo(0,0);
            });
    }

    const getSeriesData = async (seriesId) => {
        const payload = {
            with: [
                'genres'
            ]
        }
        
        return (
            axiosClient.post(`series/${seriesId}`, payload)
                .then(({data}) => {
                    setGenresId(data?.genres.map((genre) => genre.id));
                    setName(data?.name);
                    setCountry(data?.country);
                    setDirector(data?.director)
                    setReleaseDate(data?.releaseDate);
                    setScenarioMaker(data?.scenarioMaker);
                    setProducer(data?.producer)
                    setBudget(data?.budget);
                    setFees(data?.fees);
                    setAgeLimit(data?.ageLimit)
                    setSeasonsCount(data?.seasonsCount);
                    setSeriesDuration(data?.seriesDuration);
                    setDescription(data?.description);
                })
        );
    };

    const getGenres = async () => {
        return axiosClient.get(`/genres`).then(({data}) => {
            setGenresList(data);
        });
    };

    const [seriesLoading, seriesError] = useRequest(
        getSeriesData,
        [],
        seriesId,
    );

    const [genresLoading, genresError] = useRequest(
        getGenres,
        [],
    );

    if(seriesError && seriesError.response.status === 422) setErrors(seriesError.response.data.errors);

    if(seriesError && seriesError.response.status === 404) return <Error404 />;
    
    if(seriesLoading || genresLoading) return <Spinner />;

    return(
        <>
            <div className="form-container">
                <h1 className='title'>Update series info</h1>
                <form className="update-form">
                    <InputWithLabel  
                        label={'Series name'}
                        placeholder={'Enter the series name'} 
                        className={'form-control'} 
                        value={name}
                        onChange={event => setName(event.target.value)}
                        error={errors.name ? errors.name[0] : null}
                    />
                    <label>Genres</label>
                    <div className="d-flex flex-wrap">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            onChange={(genres) => setGenresId(genres)}
                            options={genresList?.map((genre) => { 
                                return {
                                    value: genre?.id, 
                                    label: genre?.name,
                                };
                            })}
                            value={genresId}
                            optionFilterProp="label"
                        />
                    </div>
                    <InputWithLabel  
                        label={'Country'}
                        placeholder={'Enter the country'} 
                        className={'form-control'} 
                        value={country}
                        onChange={event => setCountry(event.target.value)}
                        error={errors.country ? errors.country[0] : null}
                    />
                    <InputWithLabel  
                        label={'series director'}
                        placeholder={'Enter the series director'} 
                        className={'form-control'} 
                        value={director}
                        onChange={event => setDirector(event.target.value)}
                        error={errors.director ? errors.director[0] : null}
                    />
                    <InputWithLabel  
                        label={'series producer'}
                        placeholder={'Enter the series producer'} 
                        className={'form-control'} 
                        value={producer}
                        onChange={event => setProducer(event.target.value)}
                        error={errors.producer ? errors.producer[0] : null}
                    />
                    <InputWithLabel  
                        label={'Scenario maker'}
                        placeholder={'Enter the scenario maker'} 
                        className={'form-control'} 
                        value={scenarioMaker}
                        onChange={event => setScenarioMaker(event.target.value)}
                        error={errors.scenarioMaker ? errors.scenarioMaker[0] : null}
                    />
                    <InputWithLabel  
                        label={'Release date'}
                        type={'date'}
                        className={'form-control'} 
                        value={releaseDate}
                        onChange={event => setReleaseDate(event.target.value)}
                        error={errors.releaseDate ? errors.releaseDate[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Budget ($)'}
                        placeholder={'Enter the series budget'} 
                        className={'form-control'} 
                        value={budget}
                        onChange={event => setBudget(event.target.value)}
                        error={errors.budget ? errors.budget[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Fees ($)'}
                        placeholder={'Enter the series fees'} 
                        className={'form-control'} 
                        value={fees}
                        onChange={event => setFees(event.target.value)}
                        error={errors.fees ? errors.fees[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Age limit (number only)'}
                        placeholder={'Enter the age limit'} 
                        className={'form-control'} 
                        value={ageLimit}
                        onChange={event => setAgeLimit(event.target.value)}
                        error={errors.ageLimit ? errors.ageLimit[0] : null}
                    />
                    <InputWithLabel  
                        type={'time'}
                        label={'Average series duration'}
                        placeholder={'Enter the series duration'} 
                        className={'form-control'} 
                        value={seriesDuration}
                        onChange={event => setSeriesDuration(event.target.value)}
                        error={errors.seriesDuration ? errors.seriesDuration[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Seasons count'}
                        placeholder={'Enter the seasons count'} 
                        className={'form-control'} 
                        value={seasonsCount}
                        onChange={event => setSeasonsCount(event.target.value)}
                        error={errors.seasonsCount ? errors.v[0] : null}
                    />
                    <label>Series description</label>
                    <TextArea
                        placeholder="Enter the series description" 
                        allowClear 
                        value={description} 
                        onChange={(event) => setDescription(event.target.value)} 
                    />
                    <button onClick={updateSeries} className="btn btn-success mt-2 mx-auto">Submit</button>
                </form>
            </div>
        </>
    );
}

export default UpdateSeriesPage;