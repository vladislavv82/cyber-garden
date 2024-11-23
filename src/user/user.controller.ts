import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { Role, User } from '@prisma/client'
import { UserService } from './user.service'
import { GroupService } from '@/group/group.service'
import { CreateGroupDto } from '@/group/dto/create-group.dto'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly groupService: GroupService
	) {}

	@Auth([Role.ADMIN])
	@Get('admin')
	async getManagerContent() {
		return { text: 'Admin content' }
	}

	
	@Auth([Role.ADMIN])
	@Put(':userId/role')
	async updateUserRole(
		@CurrentUser('id') id: string,
		@Param('userId') userId: string,
		@Body() updateUserRoleDto: UpdateUserRoleDto
	) {
		return this.userService.updateUserRole(id, userId, updateUserRoleDto)
	}

	@Auth(Role.TUTOR)
	@Post('group/add')
	async createGroup(
		@Body() dto: CreateGroupDto,
		@CurrentUser('id') userId: string
	) {
		return this.groupService.createGroup(userId, dto)
	}

	@Auth(Role.TUTOR)
	@Get()
	async getUserGroups(@CurrentUser('id') userId: string) {
		return this.groupService.getUserGroups(userId)
	}

	@Get()
	@Auth()
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@UsePipes(new ValidationPipe())
	@Put()
	@Auth()
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: User) {
		return this.userService.update(id, dto)
	}
}
