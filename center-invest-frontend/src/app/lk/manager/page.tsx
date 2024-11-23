import { ManagerContent } from "./ManagerContent"
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manager content'
}

export default function ManagerPage() {
	return <ManagerContent />
}
