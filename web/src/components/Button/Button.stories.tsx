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

import Button from './Button'

const meta: Meta<typeof Button> = {
    component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        children: 'Primary',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
}

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'Danger',
    },
}

export const Subtle: Story = {
    args: {
        variant: 'subtle',
        children: 'Subtle',
    },
}
