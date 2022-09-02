import React, { useState, useEffect, useContext } from 'react'
import debounce from "lodash.debounce";
import SearchContext from '../../store/search-context'
import LoadingSpinner from '../Loadingspinner/Loadingspinner'
import Search from '../Search/Search'
import './Home.css'
import CustomCard from '../CustomCard/CustomCard';
import StarComponent from '../StarComponent/StarComponent';
import Form from 'react-bootstrap/Form';

export default function Home() {
  const [list, setList] = useState([])
  const [facilitiesList, setfacilitiesList] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({
    price: '',
    facility: [],
    star: '0'
  })


  const ctx = useContext(SearchContext)

  const { isLoding, searchData } = ctx;

  /* we are filtering the facility list which are only in the data */
  useEffect(() => {
    setList(searchData)
    setfacilitiesList([...new Set(searchData.map(e => e.hotel.content.hotelFacilities).flat())])
  }, [searchData])

  /* filter by start rating */
  const starHandler = (value) => {
    let data = {
      ...filterCriteria,
      star: value
    }
    setFilterCriteria(prev => {
      return { ...prev, star: value }
    })
    filterSearch(data)
  }

  /* filter by facility  */
  const facilityHandler = (e) => {
    let selectedValues = structuredClone(filterCriteria.facility);
    if(selectedValues.includes(e.target.value)){
      selectedValues = selectedValues.filter(item => item !== e.target.value);
    }else{
      selectedValues.push(e.target.value);
    }
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
          <div className='main-container'>
            {searchData.length > 0 && <div className='filter-container'>
              <div>
              <h5 className='filter-label'>Filter by Price</h5>
              <input
                name="name"
                className='input-control marg'
                type="text"
                autoComplete='off'
                placeholder="Type Price"
                onChange={priceHandler}
              />
              </div>
              <div>
                <h5 className='filter-label'> Filter by Star</h5>
                <div className='radio-but'>
                  {[5, 4, 3, 2, 1].map((r) => {
                    return <div onClick={() => starHandler(r)}  key={r} ><StarComponent  value={r} /></div>
                  })}
                </div>
              </div>
              <div>
                <h5 className='filter-label'> Filter by Facility</h5>
                <Form className='filter-label'>
                  {facilitiesList.map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label={type}
                        name="group1"
                        value={type}
                        type="checkbox"
                        id={`inline-${type}-1`}
                        onChange={facilityHandler}
                      />
                    </div>
                  ))}
                </Form>
              </div>
            </div>}
            <div className="flex-container-card">
              {list.map(li => {
                return (<CustomCard item={li} key={li.hotel.id} />)
              })}
            </div>
          </div>
        </div>
      }
      {isLoding && <LoadingSpinner />}
    </>
  )
}
