import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { GroupService } from './group.service'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { Auth } from '@/auth/decorators/auth.decorator'


@Controller('group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Auth()
	@Get('invite')	
	async joinGroupByInvite(
		@Query('token') token: string,
		@CurrentUser('id') userId: string,
	) {
		// Получааем группу по токену
		const groupId = await this.groupService.getGroupIdByToken(token)
		if (!groupId) {
			throw new NotFoundException('Группа не найдена или ссылка истекла!')
		}

		// Проверяем, не является ли пользователь уже членом этой группы
		// TODO

		// Добавляем пользователя в группу
		await this.groupService.addUserToGroup(userId, groupId)

		return { message: 'Вы успешно добавлены в группу' }
	}
}
