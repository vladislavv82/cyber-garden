import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
		UserModule
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer.apply(LoggerMiddleware).forRoutes('*');
	}
  }
  
  
