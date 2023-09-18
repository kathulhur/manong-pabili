// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Product from './Product'
import { standard } from 'src/components/Vendor/ProductsCell/ProductsCell.mock'

const meta: Meta<typeof Product> = {
    component: Product,
}

export default meta

type Story = StoryObj<typeof Product>

export const Primary: Story = {
    args: {
        product: standard().products[0],
    },
}
