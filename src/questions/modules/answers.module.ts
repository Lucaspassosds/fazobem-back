import { Module } from '@nestjs/common';
import { AnswersService } from '../services/answers.service';
import { AnswersController } from '../controllers/answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
