import { UserRole } from '@/services/auth/auth.types'
import { protectPage } from '@/utils/server/protect-page'
import type { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
	await protectPage(UserRole.PREMIUM)

	return children
}
