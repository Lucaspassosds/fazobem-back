import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtAuthRefreshStrategy } from './jwt-auth-refresh.strategy';
import { UserSession } from './entities/user-session.entity';
import { UserModule } from 'src/api/user/user.module';
import { OrganizationAdminModule } from 'src/api/organization-admin/organization-admin.module';
import { VoluntaryModule } from 'src/api/voluntary/voluntary.module';
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
  providers: [JwtAuthStrategy, JwtAuthRefreshStrategy],
})
export class AuthModule {}
