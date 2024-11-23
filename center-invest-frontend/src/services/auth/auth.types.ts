export enum UserRole {
	USER = 'USER',
	PREMIUM = 'PREMIUM',
	ADMIN = 'ADMIN',
	TUTOR = "TUTOR"
}

export interface ITokenInside {
	id: number
	rights: UserRole[] 
	iat: number
	exp: number
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>
