import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionsController } from './api/controllers/questions.controller';
import { QuestionsModule } from './api/modules/questions.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './config/database.module';
import { QuestionsService } from './api/services/questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './api/entities/question.entity';
import { AnswersModule } from './api/modules/answers.module';
import { Answer } from './api/entities/answer.entity';

@Module({
  imports: [
    QuestionsModule,
    AnswersModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Question, Answer]),
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
})
export class AppModule {}
