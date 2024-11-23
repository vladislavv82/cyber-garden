import styles from './Sidebar.module.scss'
import { MENU } from './menu.data'
import { MenuItem } from './MenuItem'
import ThemeToggle from '@/components/theme-toggle/ThemeToggle'

export function Menu() {
	return (
		<nav className={styles.menu}>
			{MENU.map(item => (
				<MenuItem item={item} key={item.link} />
			))}
			<ThemeToggle />
		</nav>
	)
}