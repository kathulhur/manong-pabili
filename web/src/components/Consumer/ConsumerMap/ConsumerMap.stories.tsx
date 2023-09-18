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

import ConsumerMap from './ConsumerMap'
import { standard } from '../ConsumerMapCell/ConsumerMapCell.mock'

const meta: Meta<typeof ConsumerMap> = {
    component: ConsumerMap,
}

export default meta

type Story = StoryObj<typeof ConsumerMap>

export const Primary: Story = {
    args: {
        vendors: standard().mapVendors,
        products: standard().mapVendors.flatMap((vendor) =>
            vendor.productsOffered.map((product) => ({
                ...product,
                vendorId: vendor.id,
            }))
        ),
    },
}
