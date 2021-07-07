import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { QuestionType } from '../entities/question-type.entity';
import { QuestionTypeController } from '../controllers/question-type.controller';
import { QuestionTypeService } from '../services/question-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionType])],
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService],
})
export class QuestionTypeModule {}
