import { useAtomValue } from 'jotai'
import { isCollapsedAtom } from '@/store'

import { IMenuItem } from './menu.interface'
import Link from 'next/link'

export function MenuItem({ item }: { item: IMenuItem }) {
	const isCollapsed = useAtomValue(isCollapsedAtom)

	return (
		<Link
			href={item.link}
			className="flex items-center"
			rel="noreferrer noopener"
		>
			<item.icon />
			{!isCollapsed && <span>{item.name}</span>}
		</Link>
	)
}