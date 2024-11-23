'use client'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

export function Profile() {
	const { user, isLoading } = useProfile()

	return (
		<div className='absolute right-8 top-big-layout right-big-layout'>
			{isLoading ? (
				<Loader />
			) : (
				<div className='flex items-center'>
					<div className='text-right mr-3'>
						<p className='font-bold -mb-1'>{user?.name}</p>
						<p className='text-sm opacity-40'>{user?.email}</p>
					</div>

					<div className='w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase'>
						{user?.name?.charAt(0) || 'A'}
					</div>
				</div>
			)}
		</div>
	)
}
