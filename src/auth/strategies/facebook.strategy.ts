// src/auth/facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('FACEBOOK_APP_ID');
    const clientSecret = configService.get<string>('FACEBOOK_APP_SECRET');
    const callbackURL = 'http://localhost:4000/auth/facebook/redirect';
    console.log({ clientSecret });
    super({
      clientID,
      clientSecret,
      callbackURL,
      profileFields: ['id', 'name', 'friends'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { id, name, friends } = profile;
    const user = {
      facebookId: id,
      name: `${name.givenName} ${name.familyName}`,
      friendsCount: friends ? friends.summary.total_count : 0,
    };
    done(null, user);
  }
}
