
'use client'

import cn from 'clsx'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { m } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { isCollapsedAtom } from '@/store'
import styles from './Sidebar.module.scss'
import { Menu } from './Menu'

export function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom)
	const [isCanHover, setIsCanHover] = useState(true)
	const hoverTimeoutRef: MutableRefObject<ReturnType<
		typeof setTimeout
	> | null> = useRef(null)

	const toggleSidebar = () => {
		if (isCollapsed) {
			setIsCanHover(false)

			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current)
			}

			hoverTimeoutRef.current = setTimeout(() => {
				setIsCanHover(true)
			}, 450)
		}

		setIsCollapsed(!isCollapsed)
	}

	return (

			<m.aside
				className={cn(styles.sidebar, {
					[styles.collapsed]: isCollapsed,
					[styles.canHover]: isCanHover
				})}
				animate={{ width: isCollapsed ? 50 : 224 }}
				transition={{ type: 'spring', stiffness: 300, damping: 23 }}
			>
				
				<button className={styles.toggle} onClick={toggleSidebar}>
					{isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
				</button>
				<Menu />
			</m.aside>

	)
}
