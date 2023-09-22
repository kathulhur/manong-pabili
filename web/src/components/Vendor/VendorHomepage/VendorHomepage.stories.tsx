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

import VendorHomepage from './VendorHomepage'

const meta: Meta<typeof VendorHomepage> = {
    component: VendorHomepage,
}

export default meta

type Story = StoryObj<typeof VendorHomepage>

export const Primary: Story = {}
