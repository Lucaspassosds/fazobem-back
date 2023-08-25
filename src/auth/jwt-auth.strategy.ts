import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env.validation';
import { AuthService } from './auth.service';
import { CurrentUser } from './get-user.decorator';
import { OrganizationAdminService } from '../api/organization-admin/organization-admin.service';
import { VoluntaryService } from '../api/voluntary/voluntary.service';
import { User } from '../api/user/entities/user.entity';
import { UserRole } from '../constants/constants';
dotenv.config();
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtAuthStrategy.name);

  constructor(
    private readonly organizationAdminService: OrganizationAdminService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly voluntaryService: VoluntaryService,
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
      const userSession = await this.authService.getUserSessionById(
        payload.sessionId,
      );

      if (!userSession || userSession.accessTokenExpiry < new Date()) {
        throw new UnauthorizedException('Invalid user session');
      }
      const user: User = userSession.user;

      if (!user) {
        throw new UnauthorizedException();
      }

      delete user.password;

      const currentUser: CurrentUser = {
        user,
        userId: user.id,
        userEmail: user.email,
        role: user.role,
        userAdmin: {
          organizationAdmin: [],
        },
        voluntary: null,
      };

      if (user.role === UserRole.organizationAdmin) {
        const adminOrganizations =
          await this.organizationAdminService.getAdminCompanies(user.id);
        currentUser.userAdmin.organizationAdmin = adminOrganizations;
      }

      if (user.role === UserRole.voluntary) {
        const voluntary = await this.voluntaryService.getVoluntaryProfile(
          user.id,
        );
        if (voluntary) {
          currentUser.voluntary = voluntary;
        }
      }
      this.logger.debug('current-user', currentUser);
      return currentUser as CurrentUser;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}

export const JwtAuthGuard = AuthGuard('jwt');
