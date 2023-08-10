import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './api/organization/organization.module';
import { Organization } from './api/organization/entities/organization.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    OrganizationModule,
    TypeOrmModule.forFeature([Organization, User]),
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
  ],
})
export class AppModule {}
