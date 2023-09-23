import { render } from '@redwoodjs/testing/web'

import GoBack from './GoBack'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GoBack', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<GoBack />)
        }).not.toThrow()
    })
})
