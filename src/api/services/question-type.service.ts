import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionTypeDto } from '../dto/create-question-type.dto';
import { QuestionType } from '../entities/question-type.entity';
import { Question } from '../entities/question.entity';
import { BaseService } from './base.service';

@Injectable()
export class QuestionTypeService extends BaseService<QuestionType> {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionType)
    private qtRepository: Repository<QuestionType>,
  ) {
    super(QuestionType);
  }

  async create(question: CreateQuestionTypeDto) {
    const newQuestion = await this.qtRepository.create(question);
    await this.qtRepository.save(newQuestion);
    return newQuestion;
  }

  async findQuestions(id: number) {
    const questionType = await this.qtRepository.findOne(id);
    if (!questionType) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    const questions = await this.questionRepository.find({
      where: {
        type: questionType,
      },
    });
    if (questions) {
      return questions;
    }
    throw new HttpException(
      'There are no questions for this question type',
      HttpStatus.NOT_FOUND,
    );
  }
}
