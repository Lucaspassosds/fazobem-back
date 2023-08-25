import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import 'isomorphic-fetch';
import { ConfigService } from '@nestjs/config';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { OrganizationAdminService } from '../api/organization-admin/organization-admin.service';
import { VoluntaryService } from '../api/voluntary/voluntary.service';
import { UserSession } from './entities/user-session.entity';
import { VoluntaryRegisterDto } from './dto/register.dto';
import { User } from '../api/user/entities/user.entity';
import { getAuthTokenExpiryTime, hashPassword } from '../utils/utils';
import { Voluntary } from '../api/voluntary/entities/voluntary.entity';
import { RegisterUserSessionDto } from './dto/user-session.dto';
import { EnvironmentVariables } from 'src/env.validation';
@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
    private readonly organizationAdminService: OrganizationAdminService,
    private jwtService: JwtService,
    private readonly voluntaryService: VoluntaryService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  getUserSessionById(sessionId: string) {
    return this.userSessionRepository.findOne({
      where: { id: sessionId },
      relations: {
        user: true,
      },
    });
  }

  async registerVoluntary(dto: VoluntaryRegisterDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingEmail = await queryRunner.manager
        .getRepository(User)
        .findOne({
          where: {
            email: dto.email,
          },
        });

      if (existingEmail) {
        throw new HttpException(
          'Email is already in use. Log in.',
          HttpStatus.CONFLICT,
        );
      }

      const newUser = new User();

      newUser.email = dto.email;
      newUser.name = dto.name;

      const hashedPassword = await hashPassword(dto.password);
      newUser.password = hashedPassword;

      const user = await queryRunner.manager.getRepository(User).save(newUser);

      const newVoluntary = new Voluntary();

      newVoluntary.user = user;
      newVoluntary.birthdate = dto.birthdate;

      await queryRunner.manager.getRepository(Voluntary).save(newVoluntary);

      const userSession = await this.signAuthTokens(
        user,
        {
          fcmToken: null,
          platform: 'web',
          deviceInfo: null,
        },
        queryRunner,
      );
      await queryRunner.commitTransaction();

      delete user.password;

      return {
        user,
        accessToken: userSession.accessToken,
        accessTokenExpiry: userSession.accessTokenExpiry,
        refreshToken: userSession.refreshToken,
        refreshTokenExpiry: userSession.refreshTokenExpiry,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err.status == HttpStatus.CONFLICT) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }
      throw new InternalServerErrorException(err);
    } finally {
      await queryRunner.release();
    }
  }

  private async signAuthTokens(
    user: User,
    registerUserSessionDto: RegisterUserSessionDto,
    queryRunner?: QueryRunner,
  ) {
    let userSessionRepo = this.userSessionRepository;
    if (queryRunner) {
      userSessionRepo = queryRunner.manager.getRepository(UserSession);
    }

    let userSession = await userSessionRepo.findOne({
      where: {
        user: { id: user.id },
        fcmToken: registerUserSessionDto.fcmToken,
        platform: registerUserSessionDto.platform,
      },
    });

    if (!userSession) {
      userSession = userSessionRepo.create();
      userSession.user = user;
      userSession.fcmToken = registerUserSessionDto.fcmToken;
      userSession.platform = registerUserSessionDto.platform;
      userSession.deviceInfo = registerUserSessionDto.deviceInfo;
    }

    const sessionSaved = await userSessionRepo.save(userSession);

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        sessionId: sessionSaved.id,
      },
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRY'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sessionId: sessionSaved.id,
      },
      {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRY'),
      },
    );

    const accessTokenExpiry = getAuthTokenExpiryTime(
      this.configService.get('ACCESS_TOKEN_EXPIRY').toString().slice(0, -1),
    );

    const refreshTokenExpiry = getAuthTokenExpiryTime(
      this.configService.get('REFRESH_TOKEN_EXPIRY').toString().slice(0, -1),
    );

    sessionSaved.accessToken = accessToken;
    sessionSaved.accessTokenExpiry = accessTokenExpiry;
    sessionSaved.refreshToken = refreshToken;
    sessionSaved.refreshTokenExpiry = refreshTokenExpiry;

    return userSessionRepo.save(sessionSaved);
  }
}
