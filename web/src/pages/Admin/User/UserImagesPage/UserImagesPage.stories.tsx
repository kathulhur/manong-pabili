import type { Meta, StoryObj } from "@storybook/react";

import UserImagesPage from "./UserImagesPage";

const meta: Meta<typeof UserImagesPage> = {
  component: UserImagesPage,
};

export default meta;

type Story = StoryObj<typeof UserImagesPage>;

export const Primary: Story = {};
