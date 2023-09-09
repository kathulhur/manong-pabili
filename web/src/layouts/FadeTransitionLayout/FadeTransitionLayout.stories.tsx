import type { Meta, StoryObj } from "@storybook/react";

import FadeTransitionLayout from "./FadeTransitionLayout";

const meta: Meta<typeof FadeTransitionLayout> = {
  component: FadeTransitionLayout,
};

export default meta;

type Story = StoryObj<typeof FadeTransitionLayout>;

export const Primary: Story = {};
