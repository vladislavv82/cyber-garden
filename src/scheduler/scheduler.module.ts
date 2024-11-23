import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { PrismaService } from '@/prisma.service';
import { EmailService } from '@/email/email.service';

@Module({
  controllers: [SchedulerController],
  providers: [SchedulerService, PrismaService, EmailService],
})
export class SchedulerModule {}
