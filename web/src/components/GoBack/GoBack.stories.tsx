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

import GoBack from './GoBack'

const meta: Meta<typeof GoBack> = {
    component: GoBack,
}

export default meta

type Story = StoryObj<typeof GoBack>

export const Primary: Story = {}
