import { UserService } from '@/user/user.service'
import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'

@Injectable()
export class ReportService {
	constructor(private readonly userService: UserService) {}

	// Генерация PDF с данными профиля
	async generatePdf(profileId: string): Promise<Buffer> {
		const { user, statistics } = await this.userService.getProfile(profileId)

		const content = `
      <html>
        <head>
          <title>Отчет по профилю</title>
        </head>
        <body>
          <h1>Отчет пользователя: ${user.name}</h1>
          <p><strong>Электронная почта:</strong> ${user.email}</p>
          <h2>Статистика</h2>
          <ul>
            ${statistics
							.map(
								stat => `
              <li><strong>${stat.label}:</strong> ${stat.value}</li>
            `
							)
							.join('')}
          </ul>
        </body>
      </html>
    `

		// Генерация PDF с Puppeteer
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.setContent(content)

		const pdfBuffer: Uint8Array = await page.pdf()
		await browser.close()

		// Преобразуем Uint8Array в Buffer
		return Buffer.from(pdfBuffer)
	}
}
