import type { Meta, StoryObj } from "@storybook/react";

import AdminSignupPage from "./AdminSignupPage";

const meta: Meta<typeof AdminSignupPage> = {
  component: AdminSignupPage,
};

export default meta;

type Story = StoryObj<typeof AdminSignupPage>;

export const Primary: Story = {};
