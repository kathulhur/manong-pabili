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

import VendorUnverified from "./VendorUnverified";

const meta: Meta<typeof VendorUnverified> = {
  component: VendorUnverified,
};

export default meta;

type Story = StoryObj<typeof VendorUnverified>;

export const Primary: Story = {};
