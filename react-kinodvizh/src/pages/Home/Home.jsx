import { useContext, useEffect, useState } from 'react';
import './Home.css';
import { AuthContext } from '../../contexts/AuthContextProvider';
import axiosClient from '../../axiosClient';
import WatchablesList from '../../components/WatchablesList/WatchablesList';
import { Checkbox, ConfigProvider, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import SideBar from '../../components/SideBar/SideBar';
import Pagination from '../../components/Pagination/Pagination';
const { Search } = Input;
import useWatchableFilters from '../../hooks/useWatchableFilters';
import useRequest from '../../hooks/useRequest';

function Home()
{
    const actualYear = new Date().getFullYear();
    const { filterValues, setFilterValue } = 
        useWatchableFilters({
            watchableType: "films",
            yearFrom: 1900,
            yearUntil: actualYear,
            rateFrom: 0,
            rateUntil: 10,
            orderBy: "in order",
            page: 1,
        });

    const [searchText, setSearchText] = useState(filterValues.q);
    const [watchables, setWatchables] = useState([]);
    const [favourites, setFavourites] = useState(false);
    const [watched, setWatched] = useState(false);

    const { user } = useContext(AuthContext);

    const getWatchables = async (watchableType, url) => {
        const payload = {
            ...filterValues,
            favourites,
            watched,
            userId: user?.id,
            params: {
                page: filterValues.page
            }
        };
        
        if(!url) url = `/${watchableType}`;
        
        return axiosClient.post(url, payload).then(({data}) => {
            setWatchables(data);
        });
    }

    const [loading, error] = useRequest(
        getWatchables, 
        [
            JSON.stringify(filterValues),
            favourites, 
            watched
        ],
        filterValues.watchableType
    );

    console.log(watchables);
    
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
            <SideBar />
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                allowClear
                loading={loading && searchText}
                onClear={() => setFilterValue("q", null)}
                onChange={(event) => setSearchText(event.target.value)}
                value={searchText}
                onSearch={(value) => {
                    setFilterValue("q", (value === "" ? null : value));
                }}
                style={{
                    width: '25vw',
                    zIndex: 0,
                }}
            />
            <div className="on-top-row">
                {user ? 
                    <div className="users-preferences-buttons">
                        <Checkbox style={{fontWeight: 'bold'}} onChange={(event) => setFavourites(event.target.checked)}>favourites</Checkbox>
                        <Checkbox style={{fontWeight: 'bold'}} onChange={(event) => setWatched(event.target.checked)}>watched ones</Checkbox>
                    </div> 
                    : ""
                }   
                <div className="sort-dropdown">
                    <Dropdown
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: [filterValues.orderBy],
                            onClick: (item) => {setFilterValue("orderBy", item.key)}
                        }}
                    >
                        <Typography.Link>
                            <Space>
                                <span className='order-by-value'>Sort {filterValues.orderBy ?? items[0].label}</span>
                            <DownOutlined style={{color: 'black'}}/>
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </div>
            </div>
            {loading && (<span className='mt-5 fs-3'>Loading...</span>)}
            {!loading && (
                <>
                    <WatchablesList watchables={watchables} type={filterValues.watchableType}/>
                    <Pagination links={watchables.links} getWatchables={getWatchables}/>
                </>
            )}
        </>
    );
}

export default Home;