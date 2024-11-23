import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { CategoryService } from '@/category/category.service'

@Module({
	controllers: [TaskController],
	providers: [TaskService, PrismaService, CategoryService],
	exports: [TaskService]
})
export class TaskModule {}
