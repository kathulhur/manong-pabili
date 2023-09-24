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

import Container from './Container'

const meta: Meta<typeof Container> = {
    component: Container,
}

export default meta

type Story = StoryObj<typeof Container>

export const Primary: Story = {}
