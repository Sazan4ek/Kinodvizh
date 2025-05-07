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
    const [series, setSeries] = useState({
        name: '',
        country: '',
        director: '',
        releaseDate: '', 
        scenarioMaker: '',
        producer: '',
        budget: null,
        fees: null,
        ageLimit: null,
        seasonsCount: null,
        seriesDuration: '',
        description: ''
    });
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const updateSeries = async (event) => {
        event.preventDefault();
        const payload = {
            genresId,
            ...series,
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
                    setSeries({
                        name: data?.name,
                        country: data?.country,
                        director: data?.director,
                        releaseDate: data?.releaseDate,
                        scenarioMaker: data?.scenarioMaker,
                        producer: data?.producer,
                        budget: data?.budget,
                        fees: data?.fees,
                        ageLimit: data?.ageLimit,
                        seasonsCount: data?.seasonsCount,
                        seriesDuration: data?.seriesDuration,
                        description: data?.description,
                    });
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
                        value={series.name}
                        onChange={event => setSeries({ ...series, name: event.target.value })}
                        error={errors.name ? errors.name[0] : null}
                    />
                    <label>Genres</label>
                    <div className="d-flex flex-wrap">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                                zIndex: 0,
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
                        value={series.country}
                        onChange={event => setSeries({ ...series, country: event.target.value })}
                        error={errors.country ? errors.country[0] : null}
                    />
                    <InputWithLabel  
                        label={'series director'}
                        placeholder={'Enter the series director'} 
                        className={'form-control'} 
                        value={series.director}
                        onChange={event => setSeries({ ...series, director: event.target.value })}
                        error={errors.director ? errors.director[0] : null}
                    />
                    <InputWithLabel  
                        label={'series producer'}
                        placeholder={'Enter the series producer'} 
                        className={'form-control'} 
                        value={series.producer}
                        onChange={event => setSeries({ ...series, producer: event.target.value })}
                        error={errors.producer ? errors.producer[0] : null}
                    />
                    <InputWithLabel  
                        label={'Scenario maker'}
                        placeholder={'Enter the scenario maker'} 
                        className={'form-control'} 
                        value={series.scenarioMaker}
                        onChange={event => setSeries({ ...series, scenarioMaker: event.target.value })}
                        error={errors.scenarioMaker ? errors.scenarioMaker[0] : null}
                    />
                    <InputWithLabel  
                        label={'Release date'}
                        type={'date'}
                        className={'form-control'} 
                        value={series.releaseDate}
                        onChange={event => setSeries({ ...series, releaseDate: event.target.value })}
                        error={errors.releaseDate ? errors.releaseDate[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Budget ($)'}
                        placeholder={'Enter the series budget'} 
                        className={'form-control'} 
                        value={series.budget}
                        onChange={event => setSeries({ ...series, budget: event.target.value })}
                        error={errors.budget ? errors.budget[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Fees ($)'}
                        placeholder={'Enter the series fees'} 
                        className={'form-control'} 
                        value={series.fees}
                        onChange={event => setSeries({ ...series, fees: event.target.value })}
                        error={errors.fees ? errors.fees[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Age limit (number only)'}
                        placeholder={'Enter the age limit'} 
                        className={'form-control'} 
                        value={series.ageLimit}
                        onChange={event => setSeries({ ...series, ageLimit: event.target.value })}
                        error={errors.ageLimit ? errors.ageLimit[0] : null}
                    />
                    <InputWithLabel  
                        type={'time'}
                        label={'Average series duration'}
                        placeholder={'Enter the series duration'} 
                        className={'form-control'} 
                        value={series.seriesDuration}
                        onChange={event => setSeries({ ...series, seriesDuration: event.target.value })}
                        error={errors.seriesDuration ? errors.seriesDuration[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Seasons count'}
                        placeholder={'Enter the seasons count'} 
                        className={'form-control'} 
                        value={series.seasonsCount}
                        onChange={event => setSeries({ ...series, seasonsCount: event.target.value })}
                        error={errors.seasonsCount ? errors.seasonsCount[0] : null}
                    />
                    <label>Series description</label>
                    <TextArea
                        placeholder="Enter the series description" 
                        allowClear 
                        value={series.description} 
                        onChange={(event) => setSeries({ ...series, description: event.target.value })} 
                    />
                    <button onClick={updateSeries} className="btn btn-success mt-2 mx-auto">Submit</button>
                </form>
            </div>
        </>
    );
}

export default UpdateSeriesPage;