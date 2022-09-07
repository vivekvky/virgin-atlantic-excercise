import React from 'react'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import classes from './CustomCard.module.css'

export default function CustomCard({item}) {

  return (
    <Card  className={classes['flex-items']}>
      <Card.Header>Hotel: {item?.hotel.name}</Card.Header>
      <h4 className={classes['h-badge']}>
         <Badge bg="secondary">£{item?.pricePerPerson} PP</Badge>
      </h4>
      <Card.Body>
        <Card.Title>This hotel has {item?.hotel.content.starRating} star rating</Card.Title>
        <Card.Text>
         Facilities - {item?.hotel.content.hotelFacilities?.join()}
        </Card.Text>
        
      </Card.Body>
    </Card>
  )
}
