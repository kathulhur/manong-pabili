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

import FeaturedImage from './FeaturedImage'

const meta: Meta<typeof FeaturedImage> = {
    component: FeaturedImage,
}

export default meta

type Story = StoryObj<typeof FeaturedImage>

export const Primary: Story = {
    args: {
        image: {
            id: 1,
            title: 'test',
            url: 'https://picsum.photos/200',
        },
        imageDeleteLoading: false,
        deleteImageHandler: (id: number) => console.log(id),
    },
}
