import { EmailModule } from 'src/email/email.module'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshTokenService } from './refresh-token.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { YandexStrategy } from './strategies/yandex.strategy'
import { SocialMediaAuthController } from './social-media/social-media-auth.controller'
import { GithubStrategy } from './strategies/github.strategy'
import { SocialMediaAuthService } from './social-media/social-media-auth.service'



@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule,
		EmailModule
	],
	controllers: [AuthController, SocialMediaAuthController],
	providers: [
		JwtStrategy,
		PrismaService,
		AuthService,
		RefreshTokenService,
		YandexStrategy,
		GithubStrategy,
		SocialMediaAuthService
	]
})
export class AuthModule {}
