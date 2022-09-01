import React from 'react'
import './Table.css'

export default function Table({ list }) {
    return (
        <>
            <table className='table-class'>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Price Per Person</th>
                        <th>Property Type</th>
                        <th>Star Rating</th>
                        <th>Facilities</th>
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
        </>
    )
}
