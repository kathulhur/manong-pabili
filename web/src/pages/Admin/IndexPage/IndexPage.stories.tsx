import type { Meta, StoryObj } from '@storybook/react'

import AdminPage from './IndexPage'

const meta: Meta<typeof AdminPage> = {
    component: AdminPage,
}

export default meta

type Story = StoryObj<typeof AdminPage>

export const Primary: Story = {}
