import React, { useState, useEffect, useContext, useCallback } from 'react'
import debounce from "lodash.debounce";
import SearchContext from '../../store/search-context'
import LoadingSpinner from '../Loadingspinner/Loadingspinner'
import Search from '../Search/Search'
import classes from './Home.module.css'
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
    setFilterCriteria(prev => {
      return { ...prev, star: value }
    })
  }

  /* filter by facility  */
  const facilityHandler = (e) => {
    let selectedValues = structuredClone(filterCriteria.facility);
    if(selectedValues.includes(e.target.value)){
      selectedValues = selectedValues.filter(item => item !== e.target.value);
    }else{
      selectedValues.push(e.target.value);
    }
    setFilterCriteria(prev => {
      return { ...prev, facility: selectedValues }
    })
  }

  /* filter by price */
  const priceHandler = debounce((e) => {
    setFilterCriteria(prev => {
      return { ...prev, price: e.target.value }
    })
  }, 200);

  /* main filter logic for any changes in filter */
  const filterSearch = useCallback((data) => {
    const filteredByPrice =  +data.price > 0 ? searchData.filter(li => {
      return li.pricePerPerson && +li.pricePerPerson >= +data.price
    }) : searchData;
    const filteredByFacility = data.facility.length > 0 ? filteredByPrice.filter(li => {
      return li.hotel.content.hotelFacilities && li.hotel.content.hotelFacilities.find((t) => data.facility.some((s) => s === t))
    }) : filteredByPrice;
    const filteredByStarRating = filteredByFacility.filter(li => {
      return li.hotel.content.starRating && +li.hotel.content.starRating >= data.star
    })
    setList(filteredByStarRating);
  },[searchData])

  useEffect(() =>{
    filterSearch(filterCriteria)
   }, [filterSearch,filterCriteria ])

  return (
    <>
      <Search />
      {!isLoding &&
        <div>
          <div className={classes['main-container']}>
            {searchData.length > 0 && <div className={classes['filter-container']}>
              <div>
                <hr/>
              <h5 className={classes['filter-label']}>Filter by Price</h5>
              <input
                name="name"
                className='input-control marg'
                type="text"
                autoComplete='off'
                placeholder="Type Price"
                onChange={priceHandler}
              />
              </div>
              <hr/>
              <div>
                <h5 className={classes['filter-label']}> Filter by Star</h5>
                <div className={classes['radio-but']}>
                  {[5, 4, 3, 2, 1].map((r) => {
                    return <div onClick={() => starHandler(r)} className={classes.star} key={r} id={r}><StarComponent  value={r} /></div>
                  })}
                </div>
              </div>
              <hr/>
              <div>
                <h5 className={classes['filter-label']}> Filter by Facility</h5>
                <Form className={classes['filter-label']}>
                  {facilitiesList.map((type) => (
                    <div key={`inline-${type}`} className={classes["mb-3"]}>
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
            <div className={classes["flex-container-card"]}>
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