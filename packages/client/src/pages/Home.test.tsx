import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { Home } from './Home'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '../test-utils'

const mockListOfCities = [
  { id: 1, name: 'London', country: 'United Kingdom', visited: false, wishlist: true },
  { id: 2, name: 'Barcelona', country: 'Spain', visited: true, wishlist: false },
  { id: 3, name: 'Madrid', country: 'Spain', visited: false, wishlist: true },
  { id: 4, name: 'Bogota', country: 'Colombia', visited: false, wishlist: false },
  { id: 5, name: 'Rome', country: 'Italy', visited: true, wishlist: true },
]

describe('Home page', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Home listOfCities={mockListOfCities} />
        </BrowserRouter>
      </MockedProvider>
    )
  })
  it('renders the Header content', () => {
    const HeadingComponent = screen.getByText(/^Smart traveller$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })

  it('renders a search bar', () => {
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
  })

  it('renders list of cities', () => {
    expect(screen.getByTestId('cities-grid')).toBeInTheDocument()
    expect(screen.getAllByTestId('city-card').length).toBe(5)
  })
})
