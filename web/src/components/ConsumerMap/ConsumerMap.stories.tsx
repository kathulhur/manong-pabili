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

const meta: Meta<typeof ConsumerMap> = {
    component: ConsumerMap,
}

export default meta

type Story = StoryObj<typeof ConsumerMap>

export const Primary: Story = {}
