import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { GroupService } from '@/group/group.service'
import { CategoryService } from '@/category/category.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, GroupService, CategoryService],
	exports: [UserService]
})
export class UserModule {}
