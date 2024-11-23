import { UserRole } from '@/services/auth/auth.types'

export interface IUser {
	id: string
	name?: string
	email: string
	avatarPath?: string
	verificationToken?: string
	rights: UserRole[]
	
	
	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IFormData extends Pick<IUser, 'email'> {
	password: string
}
