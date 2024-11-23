import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { GroupService } from '@/group/group.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, GroupService],
	exports: [UserService]
})
export class UserModule {}
