import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query getAllCities {
    cities {
      cities {
        id
        name
        country
        visited
        wishlist
      }
    }
  }
`

export const MUTATE_CITY = gql`
  mutation modifyCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      name
      country
      visited
      wishlist
    }
  }
`
