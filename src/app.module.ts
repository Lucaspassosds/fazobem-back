import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './api/modules/questions.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './api/entities/question.entity';
import { AnswersModule } from './api/modules/answers.module';
import { Answer } from './api/entities/answer.entity';
import { QuestionTypeModule } from './api/modules/question-type.module';
import { QuestionType } from './api/entities/question-type.entity';

@Module({
  imports: [
    QuestionsModule,
    AnswersModule,
    QuestionTypeModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Question, Answer, QuestionType]),
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
