import { type TProtectUserData, UserRole } from '@/services/auth/auth.types'

export type TUserDataState = {
	id: number
	rights: UserRole[]
	isLoggedIn: boolean
	isAdmin: boolean
	isManager: boolean
	isPremium: boolean
}

export const transformUserToState = (
	user: TProtectUserData
): TUserDataState | null => {
	return {
		...user,
		isLoggedIn: true,
		isAdmin: user.user.rights.includes(UserRole.ADMIN),
		isManager: user.user.rights.includes(UserRole.TUTOR),
		isPremium: user.user.rights.includes(UserRole.PREMIUM)

	}
}
