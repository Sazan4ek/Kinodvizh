import { useContext, useEffect, useState } from 'react';
import './Home.css';
import { AuthContext } from '../../contexts/AuthContextProvider';
import axiosClient from '../../axiosClient';
import WatchablesList from '../../components/WatchablesList/WatchablesList';
import { ConfigProvider, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import SideBar from '../../components/SideBar/SideBar';
import Pagination from '../../components/Pagination/Pagination';
const { Search } = Input;

function Home()
{
    const [watchables, setWatchables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [watchableType, setWatchableType] = useState('films');
    const [country, setCountry] = useState(null);
    const [yearFrom, setYearFrom] = useState(null);
    const [yearUntil, setYearUntil] = useState(null);
    const [rateFrom, setRateFrom] = useState(0);
    const [rateUntil, setRateUntil] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [genre, setGenre] = useState(null);
    const [orderBy, setOrderBy] = useState('in order');

    const getWatchables = (watchableType, searchText) => {
        setLoading(true);
        const payload = {
            country, 
            yearFrom, 
            yearUntil, 
            rateFrom,
            rateUntil,
            genre,
            searchText,
            orderBy
        }

        axiosClient.post(`/${watchableType}`, payload).then(({data}) => {
            setLoading(false);
            setWatchables(data);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);  
        });
    }

    useEffect(() => {
        getWatchables(watchableType);
    }, [country, yearFrom, yearUntil, rateFrom, rateUntil, watchableType, genre, orderBy]);

    const items=[
        {
            key: 'in order',
            label: 'in order',
        },
        {
            key: 'by marks count',
            label: 'by marks count',
        },
        {
            key: 'by rating',
            label: 'by rating',
        },
        {
            key: 'by release date',
            label: 'by release date',
        },
        {
            key: 'by name',
            label: 'by name',
        },
    ];

    return (
        <>
            <SideBar props={{
                watchableType, 
                setWatchableType,
                country,
                setCountry, 
                genre,
                setGenre,
                rateFrom,
                setRateFrom, 
                rateUntil, 
                setRateUntil, 
                yearFrom, 
                setYearFrom, 
                yearUntil, 
                setYearUntil
            }}/>
            <ConfigProvider
                theme={{
                    token: {
                    colorPrimary: '#ffc107',
                    },
                }}
            >
                <Search
                    placeholder="input search text"
                    // allowClear
                    enterButton="Search"
                    size="large"
                    onChange={(event) => setSearchText(event.target.value)}
                    value={searchText}
                    onSearch={() => {getWatchables(watchableType, searchText);}}
                    style={{
                        width: '25vw',
                    }}
                />
            </ConfigProvider>
            <div className="sort-dropdown">
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['1'],
                        onClick: (item) => {setOrderBy(item.key)}
                    }}
                >
                    <Typography.Link>
                        <Space>
                        <span className='order-by-value'>Sort {orderBy}</span>
                        <DownOutlined style={{color: 'black'}}/>
                        </Space>
                    </Typography.Link>
                </Dropdown>
                {/* <SelectableDropdown options={items} title={"Sort by:"}/> */}
            </div>
            {loading && (<span className='mt-5'>Loading...</span>)}
            {!loading && (
                <>
                    <WatchablesList watchables={watchables} type={watchableType}/>
                    <Pagination links={watchables.links}/>
                </>
            )}
        </>
    );
}

export default Home;