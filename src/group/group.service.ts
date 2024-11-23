import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  // Метод для создания группы
  async createGroup(userId: string, createGroupDto: CreateGroupDto) {
    const { name, description } = createGroupDto;

    // Создаем группу в базе данных
    const group = await this.prisma.group.create({
      data: {
        name,
        description,
        owner: { connect: { id: userId } },
      },
    });

    // Добавляем владельца в список участников группы
    await this.prisma.groupMember.create({
      data: {
        user: { connect: { id: userId } },
        group: { connect: { id: group.id } },
        role: 'OWNER',
      },
    });

    return group;
  }

  // Метод для получения списка групп, где пользователь является участником
  async getUserGroups(userId: string) {
    return await this.prisma.groupMember.findMany({
      where: { userId },
      include: {
        group: true,
      },
    });
  }
}
