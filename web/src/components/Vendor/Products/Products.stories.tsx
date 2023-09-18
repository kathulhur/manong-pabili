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

import Products from './Products'
import { standard } from '../ProductsCell/ProductsCell.mock'

const meta: Meta<typeof Products> = {
    component: Products,
}

export default meta

type Story = StoryObj<typeof Products>

export const Primary: Story = {
    args: {
        products: standard().products,
    },
}
