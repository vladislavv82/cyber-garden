'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function GlobalLoader() {
	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	let timer: NodeJS.Timeout | null = null

	useEffect(() => {
		if (isFetching || isMutating) {
			timer = setTimeout(() => {
				<div className='fixed top-layout right-layout z-50'>
					{toast.loading('Технические неполадки')}
				</div>
			}, 3000)
		} 
	}, [isFetching, isMutating])

}