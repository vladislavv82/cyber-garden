import { Users } from "./Users"

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin SSR'
}

export default async function AdminPage() {
	return <Users />
}
