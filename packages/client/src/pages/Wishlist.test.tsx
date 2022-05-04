import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '../test-utils'
import { WishList } from './WishList'

const mockListOfCities = [
  { id: 1, name: 'London', country: 'United Kingdom', visited: false, wishlist: true },
  { id: 2, name: 'Barcelona', country: 'Spain', visited: true, wishlist: false },
  { id: 3, name: 'Madrid', country: 'Spain', visited: false, wishlist: true },
  { id: 4, name: 'Bogota', country: 'Colombia', visited: false, wishlist: false },
  { id: 5, name: 'Rome', country: 'Italy', visited: true, wishlist: true },
]

describe('Wishlist page', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <WishList listOfCities={mockListOfCities} />
        </BrowserRouter>
      </MockedProvider>
    )
  })

  it('renders a title', () => {
    expect(screen.getByTestId('wishlist-title')).toBeInTheDocument()
    expect(screen.getByTestId('wishlist-title')).toHaveTextContent('Wishlist')
  })

  it('renders list of only wishlisted cities', () => {
    expect(screen.getByTestId('cities-grid')).toBeInTheDocument()
    expect(screen.getAllByTestId('city-card').length).toBe(3)
  })
})
