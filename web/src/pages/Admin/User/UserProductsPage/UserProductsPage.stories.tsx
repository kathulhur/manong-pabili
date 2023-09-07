import type { Meta, StoryObj } from "@storybook/react";

import UserProductsPage from "./UserProductsPage";

const meta: Meta<typeof UserProductsPage> = {
  component: UserProductsPage,
};

export default meta;

type Story = StoryObj<typeof UserProductsPage>;

export const Primary: Story = {};
