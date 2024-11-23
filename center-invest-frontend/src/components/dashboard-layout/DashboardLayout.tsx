import type { PropsWithChildren } from 'react'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'
import './dashboard.css'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className="z-20 grid 2xl:grid-cols-[1.1fr_50fr] grid-cols-[1fr_50fr] gap-5 min-h-full ">
			{/* <Sidebar /> */}
			<Sidebar />
			<main className="flex flex-col p-big-layout overflow-x-hidden relative gap-5 content__container dashboard__scrollbar">
				<Header />
				{children}
			</main>
		</div>
	)
}
