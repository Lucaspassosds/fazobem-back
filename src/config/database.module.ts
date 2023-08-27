import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Organization } from '../api/organization/entities/organization.entity';
import { User } from '../api/user/entities/user.entity';
import { OrganizationAdmin } from '../api/organization-admin/entities/organization-admin.entity';
import { Voluntary } from '../api/voluntary/entities/voluntary.entity';
import { OrganizationEvent } from '../api/organization-event/entities/organization-event.entity';
import { VoluntaryRole } from '../api/voluntary-role/entities/voluntary-role.entity';
import { Location } from '../api/location/entities/location.entity';
import { Shift } from '../api/shift/entities/shift.entity';
import { UserSession } from '../auth/entities/user-session.entity';
import { VoluntaryShift } from '../api/voluntary-shifts/entities/voluntary-shift.entity';

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
