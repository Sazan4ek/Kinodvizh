import { useState } from "react";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import TextArea from "antd/es/input/TextArea";
import './UpdateFilmPage.css';
import { Select } from "antd";
import Error404 from "../Error404/Error404";
import useRequest from "../../hooks/useRequest";
import Spinner from "../../components/Spinner/Spinner";

function UpdateFilmPage()
{
    const { filmId } = useParams();
    const [genresId, setGenresId] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [film, setFilm] = useState({
        name: '',
        country: '',
        director: '',
        releaseDate: '', 
        scenarioMaker: '',
        producer: '',
        budget: null,
        fees: null,
        ageLimit: null,
        duration: '',
        description: ''
    });
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const updateFilm = async (event) => {
        event.preventDefault();
        const payload = {
            genresId,
            ...film,
        };
        await axiosClient.patch(`admin/films/${filmId}`, payload)
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

    const getFilmData = async (filmId) => {
        const payload = {
            with: [
                'genres'
            ]
        }
        return (
            axiosClient.post(`films/${filmId}`, payload)
                .then(({data}) => {
                    setGenresId(data?.genres.map((genre) => genre.id));
                    setFilm({
                        name: data?.name,
                        country: data?.country,
                        director: data?.director,
                        releaseDate: data?.releaseDate,
                        scenarioMaker: data?.scenarioMaker,
                        producer: data?.producer,
                        budget: data?.budget,
                        fees: data?.fees,
                        ageLimit: data?.ageLimit,
                        duration: data?.duration,
                        description: data?.description,
                    });
                }
            )
        );
    };

    const getGenres = async () => {
        return axiosClient.get(`/genres`).then(({data}) => {
            setGenresList(data);
        });
    };

    const [filmLoading, filmError] = useRequest(
        getFilmData,
        [],
        filmId,
    );

    const [genresLoading, genresError] = useRequest(
        getGenres,
        [],
    );

    if(filmError && filmError.response.status === 422) setErrors(filmError.response.data.errors);

    if(filmError && filmError.response.status === 404) return <Error404 />;
    
    if(filmLoading || genresLoading) return <Spinner />;

    return (
        <>
            <div className="form-container">
                <h1 className='title'>Update film info</h1>
                <form className="update-form">
                    <InputWithLabel  
                        label={'Film name'}
                        placeholder={'Enter the film name'} 
                        className={'form-control'} 
                        value={film.name}
                        onChange={event => setFilm({ ...film, name: event.target.value })}
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
                        value={film.country}
                        onChange={event => setFilm({ ...film, country: event.target.value })}
                        error={errors.country ? errors.country[0] : null}
                    />
                    <InputWithLabel  
                        label={'Film director'}
                        placeholder={'Enter the film director'} 
                        className={'form-control'} 
                        value={film.director}
                        onChange={event => setFilm({ ...film, director: event.target.value })}
                        error={errors.director ? errors.director[0] : null}
                    />
                    <InputWithLabel  
                        label={'Film producer'}
                        placeholder={'Enter the film producer'} 
                        className={'form-control'} 
                        value={film.producer}
                        onChange={event => setFilm({ ...film, producer: event.target.value })}
                        error={errors.producer ? errors.producer[0] : null}
                    />
                    <InputWithLabel  
                        label={'Scenario maker'}
                        placeholder={'Enter the scenario maker'} 
                        className={'form-control'} 
                        value={film.scenarioMaker}
                        onChange={event => setFilm({ ...film, scenarioMaker: event.target.value })}
                        error={errors.scenarioMaker ? errors.scenarioMaker[0] : null}
                    />
                    <InputWithLabel  
                        label={'Release date'}
                        type={'date'}
                        className={'form-control'} 
                        value={film.releaseDate}
                        onChange={event => setFilm({ ...film, releaseDate: event.target.value })}
                        error={errors.releaseDate ? errors.releaseDate[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Budget ($)'}
                        placeholder={'Enter the film budget'} 
                        className={'form-control'} 
                        value={film.budget}
                        onChange={event => setFilm({ ...film, budget: event.target.value })}
                        error={errors.budget ? errors.budget[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Fees ($)'}
                        placeholder={'Enter the film fees'} 
                        className={'form-control'} 
                        value={film.fees}
                        onChange={event => setFilm({ ...film, fees: event.target.value })}
                        error={errors.fees ? errors.fees[0] : null}
                    />
                    <InputWithLabel  
                        type={'number'}
                        min={0}
                        label={'Age limit (number only)'}
                        placeholder={'Enter the age limit'} 
                        className={'form-control'} 
                        value={film.ageLimit}
                        onChange={event => setFilm({ ...film, ageLimit: event.target.value })}
                        error={errors.ageLimit ? errors.ageLimit[0] : null}
                    />
                    <InputWithLabel  
                        type={'time'}
                        label={'Duration'}
                        placeholder={'Enter the film duration'} 
                        className={'form-control'} 
                        value={film.duration}
                        onChange={event => setFilm({ ...film, duration: event.target.value })}
                        error={errors.duration ? errors.duration[0] : null}
                    />
                    <label>Film description</label>
                    <TextArea
                        placeholder="Enter the film description" 
                        allowClear 
                        value={film.description} 
                        onChange={(event) => setFilm({ ...film, description: event.target.value })} 
                    />
                    <button onClick={updateFilm} className="btn btn-success mt-2 mx-auto">Submit</button>
                </form>
            </div>
        </>
    );
}

export default UpdateFilmPage;