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
            watchable_type: "films",
            year_from: 1900,
            year_until: actualYear,
            rate_from: 0,
            rate_until: 10,
            order_by: "in order",
            watched: false,
            favourites: false,
            page: 1,
        });

    const [searchText, setSearchText] = useState(filterValues.q);
    const [watchables, setWatchables] = useState([]);

    const { user } = useContext(AuthContext);

    const getWatchables = async (watchableType, url) => {
        const payload = {
            ...filterValues,
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
        ],
        filterValues.watchable_type
    );
    
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
                        <Checkbox 
                            style={{fontWeight: 'bold'}} 
                            checked={(filterValues.favourites === "true")} 
                            onChange={(event) => setFilterValue("favourites", event.target.checked)}
                        >
                            favourites
                        </Checkbox>
                        <Checkbox 
                            style={{fontWeight: 'bold'}} 
                            checked={(filterValues.watched === "true")} 
                            onChange={(event) => setFilterValue("watched", event.target.checked)}
                        >
                            watched ones
                        </Checkbox>
                    </div> 
                    : ""
                }   
                <div className="sort-dropdown">
                    <Dropdown
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: [filterValues.order_by],
                            onClick: (item) => {setFilterValue("order_by", item.key)}
                        }}
                    >
                        <Typography.Link>
                            <Space>
                                <span className='order-by-value'>Sort {filterValues.order_by ?? items[0].label}</span>
                            <DownOutlined style={{color: 'black'}}/>
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </div>
            </div>
            {error && (<span className='mt-5 fs-3'>{error.message}</span>)}
            {loading && (<span className='mt-5 fs-3'>Loading...</span>)}
            {!loading && (
                <>
                    <WatchablesList watchables={watchables} type={filterValues.watchable_type}/>
                    <Pagination links={watchables.links} getWatchables={getWatchables}/>
                </>
            )}
        </>
    );
}

export default Home;