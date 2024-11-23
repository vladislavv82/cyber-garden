import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				createdAt: true,
				updatedAt: true,
				name: true,
				priority: true,
				isCompleted: true,
				userId: true,
				category: {
					select: {
						name: true
					}
				}
			}
		})
	}

	async create(dto: TaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
		return this.prisma.task.update({
			where: {
				userId,
				id: taskId
			},
			data: dto
		})
	}

	async delete(taskId: string) {
		return this.prisma.task.delete({
			where: {
				id: taskId
			}
		})
	}

	async assignCategoryToTask(taskId: string, categoryId: string) {
		return await this.prisma.task.update({
			where: { id: taskId },
			data: { categoryId }
		})
	}
}
