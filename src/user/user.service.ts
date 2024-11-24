import { AuthDto } from '@/auth/dto/auth.dto'
import {
	IGithubProfile,
	IGoogleProfile,
	IYandexProfile
} from '@/auth/social-media/social-media-auth.types'
import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import type { User } from '@prisma/client'
import { hash } from 'argon2'
import { startOfDay, subDays } from 'date-fns'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				rights: true,
				password: false
			}
		})
	}

	async deleteUserById(userId: string): Promise<{ message: string }> {
		try {
			await this.prisma.user.delete({
				where: {
					id: userId
				}
			})
			return { message: 'Пользователь успешно удалён' }
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			throw new HttpException(
				'Не удалось удалить пользователя',
				HttpStatus.BAD_REQUEST
			)
		}
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		const totalTasks = profile.tasks.length
		const completedTasks = await this.prisma.task.count({
			where: {
				userId: id,
				isCompleted: true
			}
		})

		const todayStart = startOfDay(new Date())
		const weekStart = startOfDay(subDays(new Date(), 7))

		const todayTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: todayStart.toISOString()
				}
			}
		})

		const weekTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: weekStart.toISOString()
				}
			}
		})

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = profile

		return {
			user: rest,
			statistics: [
				{ label: 'Количество задач', value: totalTasks },
				{ label: 'Выполненные', value: completedTasks },
				{ label: 'Задачи на сегодня', value: todayTasks },
				{ label: 'Задания на неделю', value: weekTasks }
			]
		}
	}

	async getMyGroup(userId: string) {
		return this.prisma.user.findUnique({
			where: { id: userId },
			include: {
				group: true
			}
		})
	}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				tasks: true
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
