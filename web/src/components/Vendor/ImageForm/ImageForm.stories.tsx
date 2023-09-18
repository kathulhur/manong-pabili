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

import ImageForm from './ImageForm'

const meta: Meta<typeof ImageForm> = {
    component: ImageForm,
}

export default meta

type Story = StoryObj<typeof ImageForm>

export const Primary: Story = {
    args: {
        onSave: (data: { title: string; url: string }, id?: number) => null,
        error: undefined,
        image: undefined,
        loading: false,
        isOpen: true,
        onClose: () => null,
    },
}

export const Update: Story = {
    args: {
        onSave: (data: { title: string; url: string }, id?: number) => null,
        error: undefined,
        image: {
            id: 1,
            title: 'test',
            url: 'https://picsum.photos/200',
        },
        loading: false,
        isOpen: true,
        onClose: () => null,
    },
}
