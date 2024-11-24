import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	// Создание категории
	async createCategory(userId: string, name: string) {
		return await this.prisma.category.create({
			data: {
				name,
				userId
			}
		})
	}

	// Получение всех категорий
	// Зачем?
	async getAllCategories() {
		return await this.prisma.category.findMany()
	}

	// Получение по id
	async getCategoriesByUserId(userId: string) {
		return this.prisma.category.findMany({
			where: {
				userId: userId
			}
		})
	}

	// Обновление категории
	async updateCategory(id: string, dto: UpdateCategoryDto) {
		const category = await this.prisma.category.findUnique({ where: { id } })
		if (!category) {
			throw new NotFoundException('Категория не существует!')
		}

		return await this.prisma.category.update({
			where: { id },
			data: { ...dto }
		})
	}

	// Удаление категории
	async deleteCategory(id: string) {
		const category = await this.prisma.category.findUnique({ where: { id } })
		if (!category) {
			throw new NotFoundException('Категория не существует!')
		}

		return await this.prisma.category.delete({ where: { id } })
	}
}
