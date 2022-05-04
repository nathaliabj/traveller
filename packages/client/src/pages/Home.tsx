import React, { useEffect, useState, FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { City } from '../../../api/src/cities/types'
import CitiesGrid from '../components/CitiesGrid'

interface Props {
  listOfCities: City[]
}

export const Home: FC<Props> = ({ listOfCities }) => {
  const [search, setSearch] = useState<string>('')
  const [citiesFound, setCitiesFound] = useState<City[] | []>([])

  useEffect(() => {
    const findCities = listOfCities?.filter((city: City) => city.name.toLowerCase().includes(search.toLowerCase()))
    setCitiesFound(findCities)
  }, [search, listOfCities])

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input
            placeholder="Search for a city"
            value={search}
            onChange={e => setSearch(e.target.value)}
            data-testid="search-bar"
          />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
        </InputGroup>
        <CitiesGrid listOfCities={citiesFound || listOfCities} />
      </Container>
    </VStack>
  )
}
