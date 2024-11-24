import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { ReportService } from './report.service'
import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'

@Controller('report')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@Auth()
	@Get('download')
	async downloadReport(
		@CurrentUser('id') userId: string,
		@Res() res: Response
	) {
		// Генерируем PDF
		const pdfBuffer = await this.reportService.generatePdf(userId)

		// Отправляем PDF в ответе
		res.set({
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename=report_${userId}.pdf`
		})

		res.send(pdfBuffer)
	}
}
