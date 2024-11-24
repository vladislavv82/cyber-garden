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
				name: dto.name,
				isCompleted: dto.isCompleted,
				createdAt: dto.createdAt,
				priority: dto.priority,

				category: dto.categoryId
					? {
							connect: { id: dto.categoryId }
						}
					: undefined,
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
				id: taskId, 
				userId: userId 
			},
			data: {
				name: dto.name,
				isCompleted: dto.isCompleted,
				createdAt: dto.createdAt,
				priority: dto.priority,
				categoryId: dto.categoryId || undefined
			}
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
