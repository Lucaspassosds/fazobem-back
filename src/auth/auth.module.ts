import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtAuthRefreshStrategy } from './jwt-auth-refresh.strategy';
import { UserSession } from './entities/user-session.entity';
import { UserModule } from '../api/user/user.module';
import { OrganizationAdminModule } from '../api/organization-admin/organization-admin.module';
import { VoluntaryModule } from '../api/voluntary/voluntary.module';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserSession]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
    OrganizationAdminModule,
    VoluntaryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, JwtAuthRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
