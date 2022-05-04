import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import CitiesGrid from '../components/CitiesGrid/index'
import { City } from '../../../api/src/cities/types'

interface Props {
  listOfCities: City[]
}

export const WishList: FC<Props> = ({ listOfCities }) => {
  const [wishlistedCities, setWishlistedCities] = useState<City[]>([])

  useEffect(() => {
    const findWishlisted = listOfCities?.filter((city: City) => city.wishlist === true)
    setWishlistedCities(findWishlisted)
  }, [listOfCities])

  return (
    <>
      <Heading as="h1" data-testid="wishlist-title">Wishlist</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <CitiesGrid listOfCities={wishlistedCities} />
      </Container>
    </>
  )
}
