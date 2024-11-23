'use client'

import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export function ManagerContent() {
	const { data, isLoading } = useQuery({
		queryKey: ['manager-content'],
		queryFn: () => userService.fetchManagerContent()
	})

	return (
		<div>
			<h1>Only for Managers:</h1>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<p>{data?.data.text || 'Not found!'}</p>
			)}
		</div>
	)
}
