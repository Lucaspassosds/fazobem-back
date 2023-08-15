import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Organization } from 'src/api/organization/entities/organization.entity';
import { User } from 'src/api/user/entities/user.entity';
import { OrganizationAdmin } from 'src/api/organization-admin/entities/organization-admin.entity';
import { Voluntary } from 'src/api/voluntary/entities/voluntary.entity';
import { OrganizationEvent } from 'src/api/organization-event/entities/organization-event.entity';
import { VoluntaryRole } from 'src/api/voluntary-role/entities/voluntary-role.entity';
import { Location } from 'src/api/location/entities/location.entity';
import { Shift } from 'src/api/shift/entities/shift.entity';
import { UserSession } from 'src/auth/entities/user-session.entity';
import { VoluntaryShift } from 'src/api/voluntary-shifts/entities/voluntary-shift.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          Organization,
          User,
          OrganizationAdmin,
          Voluntary,
          Location,
          OrganizationEvent,
          VoluntaryRole,
          Shift,
          UserSession,
          VoluntaryShift,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
