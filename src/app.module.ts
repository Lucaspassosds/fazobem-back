import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './config/database.module';
import { QuestionsService } from './questions/questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/entities/question.entity';

@Module({
  imports: [
    QuestionsModule,
    QuestionsModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Question]),
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
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class AppModule {}
