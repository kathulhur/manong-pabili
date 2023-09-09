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

import type { Meta, StoryObj } from "@storybook/react";

import Loading from "./Loading";

const meta: Meta<typeof Loading> = {
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
