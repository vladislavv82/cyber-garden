import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'

export const Auth = (roles?: Role | Role[]) => {

	// (roles: Role | Role[] = [Role.USER])
	// Если роли не переданы, применяем только JwtAuthGuard
	if (!roles) {
		return applyDecorators(UseGuards(JwtAuthGuard))
	}

	if (!Array.isArray(roles)) {
		roles = [roles]
	}
	return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard))

}
