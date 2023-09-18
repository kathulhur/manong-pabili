import { render } from '@redwoodjs/testing/web'

import Products from './Products'
import { standard } from '../ProductsCell/ProductsCell.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Products', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<Products products={standard().products} />)
        }).not.toThrow()
    })
})
