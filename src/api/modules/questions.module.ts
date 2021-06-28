import { Module } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { QuestionsController } from '../controllers/questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
