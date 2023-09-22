import { render } from '@redwoodjs/testing/web'

import VendorHomepage from './VendorHomepage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VendorHomepage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<VendorHomepage />)
        }).not.toThrow()
    })
})
