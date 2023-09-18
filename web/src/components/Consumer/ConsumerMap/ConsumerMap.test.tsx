import { render } from '@redwoodjs/testing/web'

import ConsumerMap from './ConsumerMap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ConsumerMap', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<ConsumerMap />)
        }).not.toThrow()
    })
})
