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
        // console.log(postData)
        setIsLoding(true);

        console.log(postData)
        axios.post('/cjs-search-api/search', postData, headers)
            .then((response) => {
                console.log(response)
                setSearchData(response.data.holidays);
                setIsLoding(false);
            })
            .catch((err) => {
                console.log(err)
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