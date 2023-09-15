import type { Meta, StoryObj } from '@storybook/react'

import VendorAccountPage from './AccountPage'

const meta: Meta<typeof VendorAccountPage> = {
    component: VendorAccountPage,
}

export default meta

type Story = StoryObj<typeof VendorAccountPage>

export const Primary: Story = {}
