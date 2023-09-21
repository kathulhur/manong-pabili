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

import Table from './Table'
import { dummyData } from './Table.test'

const meta: Meta<typeof Table> = {
    component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

export const Primary: Story = {
    args: {
        ...dummyData,
    },
}
