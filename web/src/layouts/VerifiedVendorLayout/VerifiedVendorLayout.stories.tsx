import type { Meta, StoryObj } from "@storybook/react";

import VerifiedVendorLayout from "./VerifiedVendorLayout";

const meta: Meta<typeof VerifiedVendorLayout> = {
  component: VerifiedVendorLayout,
};

export default meta;

type Story = StoryObj<typeof VerifiedVendorLayout>;

export const Primary: Story = {};
