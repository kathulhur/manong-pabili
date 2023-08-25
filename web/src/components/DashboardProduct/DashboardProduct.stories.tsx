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

import DashboardProduct from "./DashboardProduct";

const meta: Meta<typeof DashboardProduct> = {
  component: DashboardProduct,
};

export default meta;

type Story = StoryObj<typeof DashboardProduct>;

export const Primary: Story = {};
