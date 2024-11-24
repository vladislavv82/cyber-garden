import { UserService } from '@/user/user.service'
import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'

@Injectable()
export class ReportService {
	constructor(private readonly userService: UserService) {}

	// Генерация PDF с данными профиля
	async generatePdf(profileId: string): Promise<Buffer> {
		const { user, statistics } = await this.userService.getProfile(profileId);
	
		const content = `
		<html>
		  <head>
			<title>Отчет по профилю</title>
			<style>
			  body {
				font-family: Arial, sans-serif;
				margin: 40px;
				color: #333;
			  }
			  h1, h2 {
				color: #4A90E2;
			  }
			  p {
				font-size: 16px;
			  }
			  .statistics {
				margin-top: 20px;
				border-collapse: collapse;
				width: 100%;
			  }
			  .statistics th, .statistics td {
				border: 1px solid #ddd;
				text-align: left;
				padding: 8px;
			  }
			  .statistics th {
				background-color: #f4f4f4;
				font-weight: bold;
			  }
			  .statistics tr:nth-child(even) {
				background-color: #f9f9f9;
			  }
			  .footer {
				margin-top: 40px;
				font-size: 12px;
				color: #666;
				text-align: center;
			  }
			</style>
		  </head>
		  <body>
			<h1>Отчет пользователя: ${user.name}</h1>
			<p><strong>Электронная почта:</strong> ${user.email}</p>
			<h2>Статистика</h2>
			<table class="statistics">
			  <thead>
				<tr>
				  <th>Метрика</th>
				  <th>Значение</th>
				</tr>
			  </thead>
			  <tbody>
				${statistics
								.map(
									stat => `
				  <tr>
					<td>${stat.label}</td>
					<td>${stat.value}</td>
				  </tr>
				`
								)
								.join('')}
			  </tbody>
			</table>
			<div class="footer">
			  <p>Отчет сгенерирован автоматически. Если вы заметили ошибку, свяжитесь с поддержкой.</p>
			</div>
		  </body>
		</html>
	  `;
	
		// Генерация PDF с Puppeteer
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(content, { waitUntil: 'networkidle0' });
	
		const pdfBuffer: Uint8Array = await page.pdf({
			format: 'A4',
			margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
			printBackground: true
		});
		await browser.close();
	
		// Преобразуем Uint8Array в Buffer
		return Buffer.from(pdfBuffer);
	}
	
}
