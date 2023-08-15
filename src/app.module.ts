import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './api/organization/organization.module';
import { Organization } from './api/organization/entities/organization.entity';
import { User } from './api/user/entities/user.entity';
import { UserModule } from './api/user/user.module';
import { OrganizationAdminModule } from './api/organization-admin/organization-admin.module';
import { OrganizationAdmin } from './api/organization-admin/entities/organization-admin.entity';
import { VoluntaryModule } from './api/voluntary/voluntary.module';
import { Voluntary } from './api/voluntary/entities/voluntary.entity';
import { LocationModule } from './api/location/location.module';
import { OrganizationEventModule } from './api/organization-event/organization-event.module';
import { VoluntaryRoleModule } from './api/voluntary-role/voluntary-role.module';
import { Location } from './api/location/entities/location.entity';
import { OrganizationEvent } from './api/organization-event/entities/organization-event.entity';
import { VoluntaryRole } from './api/voluntary-role/entities/voluntary-role.entity';

@Module({
  imports: [
    DatabaseModule,
    OrganizationModule,
    TypeOrmModule.forFeature([
      Organization,
      User,
      OrganizationAdmin,
      Voluntary,
      Location,
      OrganizationEvent,
      VoluntaryRole,
    ]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    UserModule,
    OrganizationAdminModule,
    VoluntaryModule,
    LocationModule,
    OrganizationEventModule,
    VoluntaryRoleModule,
  ],
})
export class AppModule {}
