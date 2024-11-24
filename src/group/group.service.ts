import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import { CreateGroupDto } from './dto/create-group.dto'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class GroupService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService
	) {}

	// Получить все группы (доступно только для администраторов)
	async getAllGroups() {
		return this.prisma.group.findMany({
			include: {
				users: {
					select: {
						id: true,
						email: true,
						name: true
					}
				}
			}
		})
	}

	// async getGroupsByTutor(userId: string) {
	// 	return this.prisma.group.findMany({
	// 		where: {
	// 			// Добавляем фильтрацию по полю, которое идентифицирует создателя группы
	// 			createdBy: userId,  // Это поле предполагается в модели
	// 		},
	// 		include: {
	// 			users: {
	// 				select: {
	// 					id: true,
	// 					email: true,
	// 					name: true
	// 				}
	// 			}
	// 		}
	// 	})
	// }

	// Найти группу по ссылке приглашения
	async findByInviteLink(token: string) {
		return this.prisma.group.findFirst({
			where: { inviteLink: token }
		})
	}

	// Получить ID группы по токену
	async getGroupIdByToken(token: string): Promise<string | null> {
		const group = await this.prisma.group.findFirst({
			where: { inviteLink: token },
			select: { id: true }
		})

		if (!group) {
			throw new NotFoundException(
				'Группа не найдена или ссылка приглашения недействительна!'
			)
		}

		return group.id
	}

	// Метод для добавления пользователя в группу
	async addUserToGroup(userId: string, groupId: string) {
		// Проверяем, существует ли группа
		const group = await this.prisma.group.findUnique({
			where: { id: groupId }
		})

		if (!group) {
			throw new NotFoundException('Группа не найдена!')
		}

		// Проверяем, что пользователь существует
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user) {
			throw new NotFoundException('Пользователь не найден!')
		}

		// Проверяем, что пользователь уже не состоит в другой группе
		if (user.groupId && user.groupId !== groupId) {
			throw new Error('Пользователь уже состоит в другой группе!')
		}

		// Добавляем пользователя в группу
		return this.prisma.user.update({
			where: { id: userId },
			data: { groupId }
		})
	}

	// Создать новую группу
	async createGroup(userId: string, createGroupDto: CreateGroupDto) {
		const { name, description } = createGroupDto

		// Генерация уникального токена для ссылки
		const inviteToken = uuidv4()
		const inviteLink = `${this.configService.get('CLIENT_DOMAIN')}/lk/invite?token=${inviteToken}`

		// Создаем группу без указания владельца напрямую
		const group = await this.prisma.group.create({
			data: {
				name,
				description,
				inviteLink
			}
		})

		// Привязываем создателя группы к группе
		await this.prisma.user.update({
			where: { id: userId },
			data: { groupId: group.id }
		})

		return group
	}
}
