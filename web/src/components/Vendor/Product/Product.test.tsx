import { render } from '@redwoodjs/testing/web'

import Product from './Product'
import { standard } from 'src/components/Vendor/ProductsCell/ProductsCell.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Product', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<Product product={standard().products[0]} />)
        }).not.toThrow()
    })
})
