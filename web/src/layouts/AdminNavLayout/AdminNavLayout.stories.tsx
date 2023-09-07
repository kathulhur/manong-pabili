import type { Meta, StoryObj } from "@storybook/react";

import AdminNavLayout from "./AdminNavLayout";

const meta: Meta<typeof AdminNavLayout> = {
  component: AdminNavLayout,
};

export default meta;

type Story = StoryObj<typeof AdminNavLayout>;

export const Primary: Story = {};
