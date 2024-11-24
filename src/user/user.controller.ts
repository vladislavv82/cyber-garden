import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { Role, User } from '@prisma/client'
import { UserService } from './user.service'
import { GroupService } from '@/group/group.service'
import { CreateGroupDto } from '@/group/dto/create-group.dto'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'
import { CategoryService } from '@/category/category.service'

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly groupService: GroupService,
		private readonly categoryService: CategoryService
	) {}

	@Auth([Role.ADMIN])
	@Put(':userId/role')
	async updateUserRole(
		@CurrentUser('id') id: string,
		@Param('userId') userId: string,
		@Body() updateUserRoleDto: UpdateUserRoleDto
	) {
		return this.userService.updateUserRole(id, userId, updateUserRoleDto)
	}

	@Auth([Role.ADMIN])
	@Get('group/all')
	async getAllGroups() {
		return this.groupService.getAllGroups()
	}

	@Auth([Role.TUTOR, Role.ADMIN])
	@Post('group/create')
	async createGroup(
		@Body() dto: CreateGroupDto,
		@CurrentUser('id') userId: string
	) {
		return this.groupService.createGroup(userId, dto)
	}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Auth()
	@Get('my/group')
	async getMyGroup(@CurrentUser('id') id: string) {
		return this.userService.getMyGroup(id)
	}

	@Auth()
	@Put('profile/update')
	async updateProfile(@CurrentUser('id') id: string, @Body() dto: User) {
		return this.userService.update(id, dto)
	}

	@Auth()
	@Post('categories/add')
	async createCategory(
		@CurrentUser('id') id: string,
		@Body('name') name: string
	) {
		return this.categoryService.createCategory(id, name)
	}
}
