import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

describe('<App /> component', () => {
  it('renders the Header content', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MockedProvider>
    )
    const HeadingComponent = screen.getByText(/^Smart traveller$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })
})
