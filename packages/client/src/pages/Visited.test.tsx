import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '../test-utils'
import { Visited } from './Visited'

const mockListOfCities = [
  { id: 1, name: 'London', country: 'United Kingdom', visited: false, wishlist: true },
  { id: 2, name: 'Barcelona', country: 'Spain', visited: true, wishlist: false },
  { id: 3, name: 'Madrid', country: 'Spain', visited: false, wishlist: true },
  { id: 4, name: 'Bogota', country: 'Colombia', visited: false, wishlist: false },
  { id: 5, name: 'Rome', country: 'Italy', visited: true, wishlist: true },
]

describe('Visited page', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Visited listOfCities={mockListOfCities} />
        </BrowserRouter>
      </MockedProvider>
    )
  })

  it('renders a title', () => {
    expect(screen.getByTestId('visited-title')).toBeInTheDocument()
    expect(screen.getByTestId('visited-title')).toHaveTextContent('Visited')
  })

  it('renders list of only visited cities', () => {
    expect(screen.getByTestId('cities-grid')).toBeInTheDocument()
    expect(screen.getAllByTestId('city-card').length).toBe(2)
  })
})
