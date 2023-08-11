import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { EnvironmentVariables } from 'src/env.validation';
dotenv.config();

@Injectable()
export class JwtAuthRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly logger = new Logger(JwtAuthRefreshStrategy.name);

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
      this.logger.debug('refresh token validate');

      const userSession = await this.authService.getUserSessionById(
        payload.sessionId,
      );

      if (!userSession || userSession.refreshTokenExpiry < new Date()) {
        throw new UnauthorizedException('Invalid user session');
      }

      return { ...payload, userSession };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}

export const JwtAuthRefreshGuard = AuthGuard('jwt-refresh');
