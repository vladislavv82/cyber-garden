import { EmailService } from '@/email/email.service';
import { PrismaService } from '@/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
	private readonly logger = new Logger(SchedulerService.name)

	constructor(
		private prisma: PrismaService,
		private emailService: EmailService
	) {}

	@Cron('*/1 * * * *')
	async handleCron() {
		this.logger.log('Запуск проверки задач')

		const tasks = await this.prisma.task.findMany({
			where: {
				isCompleted: false // Проверяем только незавершенные задачи
			}
		})

		const currentTime = new Date()

		for (const task of tasks) {
			const timeRemaining =
				new Date(task.createdAt).getTime() - currentTime.getTime()
			const minutesRemaining = timeRemaining / 1000 / 60

			if (minutesRemaining < 30 && minutesRemaining > 0) {
				await this.sendReminderEmail(task)
			}
		}
	}

	private async sendReminderEmail(task: any) {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id: task.userId }
			})

			if (user) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const emailSent = await this.emailService.sendNotification(
                    user.email,
                    task.name
                  );
				this.logger.log(`Напоминание отправлено на ${user.email}`)
			} else {
				this.logger.warn('Пользователь не найден для задачи: ' + task.name)
			}
		} catch (error) {
			this.logger.error('Ошибка при отправке email:', error)
		}
	}
}
