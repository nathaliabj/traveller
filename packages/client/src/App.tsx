import React from 'react'
import type { FC } from 'react'
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar/index'
import { Home } from './pages/Home'
import { WishList } from './pages/WishList'
import { Visited } from './pages/Visited'
import { useQuery } from '@apollo/client'
import { GET_CITIES } from './Queries'

const fonts = {
  heading:
    '"Museo Sans", museo-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Lato", lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // chakra default
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

export const App: FC = () => {
  const { error, data } = useQuery(GET_CITIES)

  if (error) return <p>Error: there was a problem fetching your data</p>

  return (
    <ChakraProvider theme={extendTheme({ fonts })}>
      <TopBar />
      <Box textAlign="center">
        <Routes>
          <Route index element={<Home listOfCities={data?.cities.cities} />} />
          <Route path="wishlist" element={<WishList listOfCities={data?.cities?.cities} />} />
          <Route path="visited" element={<Visited listOfCities={data?.cities?.cities} />} />
        </Routes>
      </Box>
    </ChakraProvider>
  )
}
