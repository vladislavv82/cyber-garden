import { IYandexProfile } from '@/auth/social-media/social-media-auth.types'
import { Strategy, Profile } from 'passport-yandex';
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'


@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(
		private configService: ConfigService,
	) {
		super({
			clientID: configService.get('YANDEX_CLIENT_ID'),
			clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
			callbackURL: configService.get('YANDEX_CALLBACK_URL'),
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	): Promise<any> {
		const { id, username, name, emails, photos } = profile;

        const user: IYandexProfile = {
        profileId: id,
        username,
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
        };

        done(null, user);
	}
}
