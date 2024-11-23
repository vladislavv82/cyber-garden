import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client'; // Используем перечисление из Prisma

export class UpdateUserRoleDto {
  @IsEnum(Role, { message: 'Role must be one of USER, TUTOR, or ADMIN' })
  role: Role;
}
