import { useMutation } from '@apollo/client'
import { AddIcon, CheckIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, SimpleGrid, useColorMode, Text, Button, Flex } from '@chakra-ui/react'
import React, { FC } from 'react'
import { City } from '../../../../api/src/cities/types'

import { MUTATE_CITY } from '../../Queries'

interface Props {
  listOfCities: City[]
}

const CitiesGrid: FC<Props> = ({ listOfCities }) => {
  const [updateCity, { error }] = useMutation(MUTATE_CITY)
  const { colorMode } = useColorMode()
  const isLightMode = colorMode === 'light'

  if (error) return <p>Error: there was a problem updating your data</p>

  return (
    <SimpleGrid columns={1} spacing={3} my={6} width="100%" data-testid="cities-grid">
      {listOfCities?.map(city => (
        <Flex
          key={`${city.id}-${city.name}`}
          data-testid="city-card"
          bg={isLightMode ? 'blackAlpha.50' : 'gray.700'}
          height="60px"
          borderRadius="base"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={3}
          px={4}
        >
          <Box>
            <Text fontSize="md" fontWeight="bold" textAlign="left" data-testid="city-name">
              {city.name}
            </Text>
            <Text fontSize="sm" textAlign="left" lineHeight={1} data-testid="city-country">
              {city.country}
            </Text>
          </Box>
          <Box>
            <Button
              data-testid="visited-button"
              colorScheme="blue"
              size="sm"
              mr={2}
              leftIcon={
                city.visited ? (
                  <CheckIcon data-testid="visited-check-icon" />
                ) : (
                  <ViewIcon data-testid="visited-view-icon" />
                )
              }
              onClick={() => {
                updateCity({ variables: { id: city.id, input: { id: city.id, visited: !city.visited } } })
              }}
            >
              Visited
            </Button>
            <Button
              data-testid="wishlist-button"
              colorScheme="blue"
              size="sm"
              variant="outline"
              leftIcon={
                city.wishlist === true ? (
                  <CheckIcon data-testid="wishlist-check-icon" />
                ) : (
                  <AddIcon data-testid="wishlist-add-icon" />
                )
              }
              onClick={() =>
                updateCity({ variables: { id: city.id, input: { id: city.id, wishlist: !city.wishlist } } })
              }
            >
              Wishlist
            </Button>
          </Box>
        </Flex>
      ))}
    </SimpleGrid>
  )
}
export default CitiesGrid
