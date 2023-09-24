import { render } from '@redwoodjs/testing/web'

import IndexLayout from './IndexLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IndexLayout', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<IndexLayout />)
        }).not.toThrow()
    })
})
