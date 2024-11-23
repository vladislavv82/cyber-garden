import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

export function useInitialData(reset: UseFormReset<TypeUserForm>) {
	const { user, fetchProfileSuccess } = useProfile()
	useEffect(() => {
		if (user) {
			reset({
				email: user.email,
				name: user.name,
				breakInterval: user.breakInterval,
				intervalsCount: user.intervalsCount,
				workInterval: user.workInterval
			})
		}
	}, [fetchProfileSuccess])
}
