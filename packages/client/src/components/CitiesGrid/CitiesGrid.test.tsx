import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '../../test-utils'

import CitiesGrid from '.'
import { MUTATE_CITY } from '../../Queries'

const mockListOfCities = [
  { id: 1, name: 'London', country: 'United Kingdom', visited: false, wishlist: true },
  { id: 2, name: 'Barcelona', country: 'Spain', visited: true, wishlist: false },
  { id: 3, name: 'Madrid', country: 'Spain', visited: false, wishlist: true },
  { id: 4, name: 'Bogota', country: 'Colombia', visited: false, wishlist: false },
  { id: 5, name: 'Rome', country: 'Italy', visited: true, wishlist: true },
  { id: 6, name: 'Paris', country: 'France', visited: false, wishlist: true },
  { id: 7, name: 'Moscow', country: 'Rusia', visited: true, wishlist: false },
  { id: 8, name: 'Berlin', country: 'Germany', visited: false, wishlist: true },
  { id: 9, name: 'Minsk', country: 'Belarus', visited: false, wishlist: false },
  { id: 10, name: 'Vienna', country: 'Austria', visited: true, wishlist: true },
]

describe('Cities grid component', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <CitiesGrid listOfCities={mockListOfCities} />
      </MockedProvider>
    )
  })

  it('renders the grid with the correct items on it', () => {
    expect(screen.getByTestId('cities-grid')).toBeInTheDocument()
    expect(screen.getByTestId('cities-grid').children).toHaveLength(10)
  })

  describe('City item', () => {
    it('renders the grid items', () => {
      expect(screen.getAllByTestId('city-card').length).toBe(10)
    })

    it('renders the city name and country correctly', () => {
      const cityName = screen.getAllByTestId('city-name')[0]
      const country = screen.getAllByTestId('city-country')[0]
      // City name
      expect(cityName).toBeInTheDocument()
      expect(cityName.tagName).toBe('P')
      expect(cityName).toHaveTextContent('London')

      // City country
      expect(country).toBeInTheDocument()
      expect(country.tagName).toBe('P')
      expect(country).toHaveTextContent('United Kingdom')
    })

    it('renders the visited button correctly', () => {
      const visitedButton = screen.getAllByTestId('visited-button')[0]

      expect(visitedButton).toBeInTheDocument()
      expect(visitedButton.tagName).toBe('BUTTON')
      expect(visitedButton).toHaveTextContent('Visited')
      expect(visitedButton).toContainElement(screen.getAllByTestId('visited-view-icon')[0])
    })

    xit('updates the visited value when the visited button is clicked', async () => {
      const updateVisited = {
        country: 'United Kingdom',
        id: 1,
        name: 'London',
        visited: true,
        wishlist: false,
        __typename: 'City',
      }
      const mocks = [
        {
          request: {
            query: MUTATE_CITY,
            variables: {
              id: Number(updateVisited.id),
              input: { id: Number(updateVisited.id), visited: updateVisited.visited },
            },
          },
          result: { data: { updateCity: updateVisited } },
        },
      ]

      render(
        <MockedProvider mocks={mocks} addTypename={true}>
          <CitiesGrid listOfCities={mockListOfCities} />
        </MockedProvider>
      )

      const visitedButton = screen.getAllByTestId('visited-button')[0]

      expect(visitedButton).toBeInTheDocument()
      expect(visitedButton.tagName).toBe('BUTTON')
      expect(visitedButton).toHaveTextContent('Visited')
      expect(visitedButton).toContainElement(screen.getAllByTestId('visited-view-icon')[0])

      fireEvent.click(visitedButton)
      await waitFor(() => expect(visitedButton).toContainElement(screen.getAllByTestId('visited-check-icon')[0]))
    })

    it('renders the wishlist button correctly', () => {
      const wishlistButton = screen.getAllByTestId('wishlist-button')[0]
      expect(wishlistButton).toBeInTheDocument()
      expect(wishlistButton.tagName).toBe('BUTTON')
      expect(wishlistButton).toHaveTextContent('Wishlist')
      expect(wishlistButton).toContainElement(screen.getAllByTestId('wishlist-check-icon')[0])
    })
  })
})
