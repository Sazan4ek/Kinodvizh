import { useSearchParams } from "react-router-dom"


const useWatchableFilters = (initialValue) => {
    const [searchParams, setSearchParams] = useSearchParams(initialValue);

    const getFilterValues = () => {
        return Object.fromEntries(searchParams.entries());
    };

    const setFilterValue = (name, value) => {
        const newParams = getFilterValues();
        if(value !== null && value !== undefined) {
            newParams[name] = value;
        }
        else {
            delete newParams[name];
        }
        setSearchParams(newParams);
    };

    const setMultipleFilterValues = (newParams) => {
        const params = getFilterValues();
        setSearchParams({ ...params, ...newParams });
    };

    return {
        filterValues: getFilterValues(),
        setFilterValue,
        setMultipleFilterValues
    };
};

export default useWatchableFilters;