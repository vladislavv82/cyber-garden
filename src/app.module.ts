import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { GroupModule } from './group/group.module';
import { CategoryModule } from './category/category.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ReportModule } from './report/report.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
		UserModule,
		TaskModule,
		PomodoroModule,
		TimeBlockModule,
		GroupModule,
		CategoryModule,
		SchedulerModule,
		ReportModule
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer.apply(LoggerMiddleware).forRoutes('*');
	}
  }
  
  
