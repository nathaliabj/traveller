import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import CitiesGrid from '../components/CitiesGrid'
import { City } from '../../../api/src/cities/types'

interface Props {
  listOfCities: City[]
}

export const Visited: FC<Props> = ({ listOfCities }) => {
  const [visitedCities, setVisited] = useState<City[]>([])

  useEffect(() => {
    const findVisitedCities = listOfCities?.filter((city: City) => city.visited === true)
    setVisited(findVisitedCities)
  }, [listOfCities])

  return (
    <>
      <Heading as="h1" data-testid="visited-title">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <CitiesGrid listOfCities={visitedCities} />
      </Container>
    </>
  )
}
