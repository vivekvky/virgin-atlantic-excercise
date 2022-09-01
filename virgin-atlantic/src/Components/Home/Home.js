import React, { useState, useEffect, useContext } from 'react'
import debounce from "lodash.debounce";
import SearchContext from '../../store/search-context'
import LoadingSpinner from '../Loadingspinner/Loadingspinner'
import Search from '../Search/Search'
import './Home.css'
import Table from '../Table/Table';

export default function Home() {
  const [list, setList] = useState([])
  const [facilitiesList, setfacilitiesList] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({
    price: '',
    facility: [],
    star: '1'
  })


  const ctx = useContext(SearchContext)

  const { isLoding, searchData } = ctx;

/* we are filtering the facility list which are only in the data */
  useEffect(() => {
    setList(searchData)
    setfacilitiesList([...new Set(searchData.map(e => e.hotel.content.hotelFacilities).flat())])
  }, [searchData])

  /* filter by start rating */
  const starHandler = (e) => {
    let data = {
      ...filterCriteria,
      star: e.target.value
    }
    setFilterCriteria(prev => {
      return { ...prev, star: e.target.value }
    })
    filterSearch(data)
  }

  /* filter by facility  */
  const facilityHandler = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    let data = {
      ...filterCriteria,
      facility: selectedValues
    }
    setFilterCriteria(prev => {
      return { ...prev, facility: selectedValues }
    })
    filterSearch(data)
  }

  /* filter by price */
  const priceHandler = debounce((e) => {
    console.log(e.target.value)
    let data = {
      ...filterCriteria,
      price: e.target.value
    }
    setFilterCriteria(prev => {
      return { ...prev, price: e.target.value }
    })
    filterSearch(data)
  }, 200);

  /* main filter logic for any changes in filter */
  const filterSearch = (data) => {
    const filteredByPrice = +data.price > 0 ? searchData.filter(li => {
      return li.pricePerPerson && +li.pricePerPerson >= +data.price
    }) : searchData;
    const filteredByFacility = data.facility.length > 0 ? filteredByPrice.filter(li => {
      return li.hotel.content.hotelFacilities && li.hotel.content.hotelFacilities.find((t) => data.facility.some((s) => s === t))
    }) : filteredByPrice;
    const filteredByStarRating = filteredByFacility.filter(li => {
      return li.hotel.content.starRating && +li.hotel.content.starRating >= data.star
    })
    setList(filteredByStarRating);
  }


  return (
    <>
      <Search />
      {!isLoding &&
        <div>
          {searchData.length > 0 && <div className="content fit-box">
            <div className='flex-container'>
              <label>Filter by Price</label>
              <input
                name="name"
                className='input-control'
                type="text"
                autoComplete='off'
                placeholder="Type Name"
                onChange={priceHandler}
              />
            </div>
            <div className='flex-container'>
              <label>Filter by Facility</label>
              <select id="country" className='input-control multiselect' multiple name="country" onChange={facilityHandler}
              >
                {facilitiesList.map(facility => {
                  return (
                    <option key={facility} value={facility}>{facility}</option>
                  )
                })}
              </select>
            </div >
            <div className='flex-container'>
              <label>Filter by Star</label>
              <select id="country" className='input-control' name="country" onChange={starHandler}>
                {[1, 2, 3, 4, 5].map(star => {
                  return (<option key={star} value={star}>{star}{' Star & Above'}</option>)
                })}
              </select>
            </div >
          </div>}
          <Table list={list} />
        </div>
      }
      {isLoding && <LoadingSpinner />}
    </>
  )
}
