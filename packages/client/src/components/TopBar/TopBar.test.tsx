import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import TopBar from '.'
import { render } from '../../test-utils'

describe('Top bar nav', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <TopBar />
        </BrowserRouter>
      </MockedProvider>
    )
  })

  it('renders a logo linking to the correct path', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('logo').tagName).toBe('A')
    expect(screen.getByTestId('logo')).toHaveAttribute('href', '/')
  })

  it('renders a Home link with correct path', () => {
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('home-link').tagName).toBe('A')
    expect(screen.getByTestId('home-link')).toHaveAttribute('href', '/')
  })

  it('renders a Visited link with correct path', () => {
    expect(screen.getByTestId('visited-link')).toBeInTheDocument()
    expect(screen.getByTestId('visited-link').tagName).toBe('A')
    expect(screen.getByTestId('visited-link')).toHaveAttribute('href', '/visited')
  })

  it('renders a wishlist link with correct path', () => {
    expect(screen.getByTestId('wishlist-link')).toBeInTheDocument()
    expect(screen.getByTestId('wishlist-link').tagName).toBe('A')
    expect(screen.getByTestId('wishlist-link')).toHaveAttribute('href', '/wishlist')
  })
})
