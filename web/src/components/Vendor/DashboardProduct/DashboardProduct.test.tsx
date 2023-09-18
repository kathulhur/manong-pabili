import { render } from '@redwoodjs/testing/web'

import DashboardProduct from './DashboardProduct'
import { standard } from '../DashboardProductsCell/DashboardProductsCell.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardProduct', () => {
    it('renders successfully', () => {
        standard().dashboardProducts.forEach((product) => {
            expect(() => {
                render(<DashboardProduct product={product} />)
            }).not.toThrow()
        })
    })
})
