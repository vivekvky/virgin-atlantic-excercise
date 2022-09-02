import { render, screen } from '@testing-library/react';

import CustomCard from './CustomCard';

const data = {
    pricePerPerson: 1884.41,
    hotel:{name:'asdf',content:{
        starRating:4,
        hotelFacilities:['a','b']
    }},

    
}
test('renders CustomCard', () => {
  render(<CustomCard item={data}/>);
  const linkElement = screen.getByText(/Hotel: asdf/);
  expect(linkElement).toBeInTheDocument();
});
