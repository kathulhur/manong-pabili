import { render } from '@redwoodjs/testing/web'

import MapPage from './MapPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MapPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MapPage />)
    }).not.toThrow()
  })
})
