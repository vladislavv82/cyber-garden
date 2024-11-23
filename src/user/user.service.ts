import { AuthDto } from '@/auth/dto/auth.dto'
import {
	IGithubProfile,
	IGoogleProfile,
	IYandexProfile
} from '@/auth/social-media/social-media-auth.types'
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import type { User } from '@prisma/client'
import { hash } from 'argon2'

import { PrismaService } from 'src/prisma.service'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				name: true,
				email: true,
				id: true,
				password: false
			}
		})
	}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async updateUserRole(
		adminId: string,
		userId: string,
		updateUserRoleDto: UpdateUserRoleDto
	) {
		const { role } = updateUserRoleDto

		// Проверяем, что администратор существует и имеет право менять роли
		const admin = await this.prisma.user.findUnique({ where: { id: adminId } })
		if (!admin || !admin.rights.includes('ADMIN')) {
			throw new ForbiddenException('У вас нет разрешения на смену ролей')
		}

		// Проверяем, что целевой пользователь существует
		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) {
			throw new NotFoundException('User not found')
		}

		// Обновляем роль пользователя
		return await this.prisma.user.update({
			where: { id: userId },
			data: {
				rights: [role] // Обновляем роли пользователя
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async findOrCreateSocialUser(
		profile: IGoogleProfile | IGithubProfile | IYandexProfile
	) {
		let user = await this.getByEmail(profile.email)
		if (!user) {
			user = await this._createSocialUser(profile)
		}
		return user
	}

	private async _createSocialUser(
		profile: IGoogleProfile | IGithubProfile | IYandexProfile
	): Promise<User> {
		const email = profile.email
		const name =
			'firstName' in profile
				? `${profile.firstName} ${profile.lastName}`
				: profile.username
		const picture = profile.picture || ''

		return this.prisma.user.create({
			data: {
				email,
				name,
				password: '',
				verificationToken: null,
				avatarPath: picture
			}
		})
	}

	async create(dto: AuthDto) {
		return this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})
	}

	async update(id: string, dto: Partial<User>) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: {
				id
			},
			data,
			select: {
				name: true,
				email: true
			}
		})
	}
}
