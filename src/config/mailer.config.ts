import { isDev } from '@/utils/is-dev.util'
import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export const getMailerConfig = async (
	configService: ConfigService
): Promise<MailerOptions> => ({
	transport: {
		host: configService.get('SMTP_SERVER'),
		port: 465,
		secure: !isDev(configService),
		auth: {
			user: configService.get('SMTP_LOGIN'),
			pass: configService.get('SMTP_PASSWORD')
		}
	},
	defaults: {
		from: '<nest-js-app@mail.ru>'
	}
})
