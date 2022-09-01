import React, { useState, useEffect, useContext, useMemo } from 'react'
import debounce from "lodash.debounce";
import SearchContext from '../../store/search-context'
import LoadingSpinner from '../Loadingspinner/Loadingspinner'
import Search from '../Search/Search'
import './Home.css'

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

  useEffect(() => {
    setList(searchData)
    setfacilitiesList([...new Set(searchData.map(e => e.hotel.content.hotelFacilities).flat())])
  }, [searchData])

  const starHandler = (e) => {
    let data = {
      ...filterCriteria,
      star: e.target.value
    }
    setFilterCriteria(prev => {
      return { ...prev, star: e.target.value }
    })
    // const filteredList = searchData.filter(li => {
    //   return li.hotel.content.starRating && +li.hotel.content.starRating >= e.target.value
    // })

    // setList(filteredList);
    filterSearch(data)
  }

  const facilityHandler = (e) => {
    
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    let data = {
      ...filterCriteria,
      facility: selectedValues
    }
    setFilterCriteria(prev => {
      return { ...prev, facility: selectedValues }
    })
    //    const filteredList = searchData.filter(li => {
    //  return li.hotel.content.hotelFacilities && li.hotel.content.hotelFacilities.find((t) => selectedValues.some((s) => s === t)) 
    // })
    // console.log(filteredList.map(e => e.hotel.content.hotelFacilities = 'Bar').flat());
    filterSearch(data)
  }

  const priceHandler = debounce((e) => {
    console.log(e.target.value)
    let data = {
      ...filterCriteria,
      price: e.target.value 
    }
    setFilterCriteria(prev => {
      return { ...prev, price: e.target.value }
    })
    // const filteredList = searchData.filter(li => {
    //  return li.pricePerPerson && +li.pricePerPerson >= +e.target.value
    // })

    // setList(filteredList);
    filterSearch(data)
  }, 200);

  const filterSearch = (data) => {
    const filteredList1 = +data.price > 0 ? searchData.filter(li => {
      return li.pricePerPerson && +li.pricePerPerson >= +data.price
    }) : searchData;
    const filteredList2 = data.facility.length > 0 ? filteredList1.filter(li => {
     return li.hotel.content.hotelFacilities && li.hotel.content.hotelFacilities.find((t) => data.facility.some((s) => s === t))
    }) : filteredList1;
    const filteredList3 = filteredList2.filter(li => {
      return li.hotel.content.starRating && +li.hotel.content.starRating >= data.star
    })
    setList(filteredList3);
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
          <table className='table-class'>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Price Per Person</th>
                <th>Property Type</th>
                <th>Star Rating</th>
                <th>Fac</th>
              </tr>
            </thead>
            {list.length > 0 && <tbody>
              {list.map((li) => (
                <tr key={li.hotel.id}>
                  <td>
                    {li.hotel.name}
                  </td>
                  <td>
                    {li.pricePerPerson}
                  </td>
                  <td>
                    {li.hotel.content.propertyType}
                  </td>
                  <td>
                    {li.hotel.content.starRating}
                  </td>
                  <td>
                    {li.hotel.content.hotelFacilities}
                  </td>
                </tr>
              ))}
            </tbody>
            }

          </table>
          {list.length === 0 && <h1 className='no-data'>Search for results</h1>}
        </div>
      }
      {isLoding && <LoadingSpinner />}
    </>
  )
}
