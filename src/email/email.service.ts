import VerificationEmail from '@email/confirmation.email'
import NotificationEmail from '@email/notification.email'
import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { render } from '@react-email/render'

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendEmail(to: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to,
			subject,
			html,
		});
	}

	async sendVerification(to: string, verificationLink: string) {
		const html = await render(VerificationEmail({ url: verificationLink }));
		return this.sendEmail(to, 'Подтверждение почты', html);
	}

	async sendNotification(to: string, taskName: string) {
		const html = await render(NotificationEmail({ name: taskName }));
		return this.sendEmail(to, 'Подтверждение почты', html);
	}
}