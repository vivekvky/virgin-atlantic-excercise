import React, { useContext, useState } from 'react'
import SearchContext from '../../store/search-context';
import './Search.css';


export default function Search() {
    const [searchValue, setValue] = useState({ location: 'new-york', date: '' })
    const ctx = useContext(SearchContext)
    const minDate = new Date().toISOString().slice(0, 10);
    const defaultData = {
        "bookingType": "hotel",
        "location": "orlando",
        "departureDate": "24-09-2022",
        "duration": "7",
        "partyCompositions": [{
            "adults": 2,
            "childAges": [],
            "infants": 0
        }]
    }

    const onLocationChange = (event) => {
        console.log(event.target.value)
        setValue(prevValue => {
            return { ...prevValue, location: event.target.value }
        })
    }

    const onDateChange = (e) => {
        setValue(prevValue => {
            return { ...prevValue, date: e.target.value }
        })
    }

    const onSearch = (e) => {
        e.preventDefault()
        const postdata = { ...defaultData, location: searchValue.location, departureDate: searchValue.date.slice(0, 10).split('-').reverse().join('-') }
        ctx.onSearch(postdata)
    }

    return (
        <form className='form'>
            <div className="content">
                <div className='flex-container'>
                    <label >Country</label>
                    <select id="country" className='input-control' name="country" value={searchValue.location} onChange={onLocationChange}>
                        {['new-york', 'orlando', 'barbados', 'toronto'].map(city =>
                            (<option key={city} value={city}>{city}</option>)
                        )}
                    </select>
                </div>
                <div className='flex-container'>
                    <label>Date</label>
                    <input type="date" id="start" className='input-control' name="trip-start" onChange={onDateChange} value={searchValue.date} min={minDate} max="2025-12-31" />
                </div >

                <div className='flex-container'>
                    <button className='submit-button' type="submit" onClick={onSearch}>Submit</button>
                </div>
            </div>
        </form>
    )
}
