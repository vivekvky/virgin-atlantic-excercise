import axios from 'axios';
import React, { useState } from 'react';


const SearchContext = React.createContext({
    isLoding: false,
    searchData: [],
    onSearch: (postData) => { }
});

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}

export const SearchContextProvider = (props) => {
    const [isLoding, setIsLoding] = useState(false);
    const [data, setSearchData] = useState([]);
    const searchHandler = (postData) => {
        setIsLoding(true);
        axios.post('/cjs-search-api/search', postData, headers)
            .then((response) => {
                setSearchData(response.data.holidays);
                setIsLoding(false);
            })
            .catch((err) => {
                console.log(err)
                setIsLoding(false);
            })
    };

    return (
        <SearchContext.Provider
            value={{
                isLoding: isLoding,
                onSearch: searchHandler,
                searchData: data
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchContext;