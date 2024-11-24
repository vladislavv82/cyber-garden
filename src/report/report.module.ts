import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, UserService, PrismaService],
})
export class ReportModule {}
