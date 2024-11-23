import {
	CalendarRange,
	KanbanSquare,
	LayoutDashboard,
	Settings,
	Timer
} from 'lucide-react'

import { AUTH_PAGES } from '@/config/pages/auth.config'

import type { IMenuItem } from './menu.interface'
import { PUBLIC_PAGES } from '@/config/pages/public.config'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: PUBLIC_PAGES.HOME,
		name: 'Доска'
	},
	{
		icon: KanbanSquare,
		link: AUTH_PAGES.TASKS,
		name: 'Задачи'
	},
	{
		icon: Timer,
		link: AUTH_PAGES.TIMER,
		name: 'Таймер'
	},
	{
		icon: CalendarRange,
		link: AUTH_PAGES.TIME_BLOCKING,
		name: 'Календарь'
	},
	{
		icon: Settings,
		link: AUTH_PAGES.SETTINGS,
		name: 'Настройки'
	}
]
