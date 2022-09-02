import React from 'react'
import Star from '../../asset/Star'

export default function StarComponent({value}) {
  return (
    [...Array(value)].map((a,id) => <div data-testid="st" key={id}><Star /></div> )
  )
}
