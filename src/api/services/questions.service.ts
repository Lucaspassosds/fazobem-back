import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Answer } from '../entities/answer.entity';
import { QuestionType } from '../entities/question-type.entity';
import { Question } from '../entities/question.entity';
import { BaseService } from './base.service';

@Injectable()
export class QuestionsService extends BaseService<Question> {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(QuestionType)
    private qtRepository: Repository<QuestionType>,
  ) {
    super(Question);
  }

  async create(question: CreateQuestionDto) {
    const questionType = await this.qtRepository.findOne(question.typeId);
    if (questionType) {
      const newQuestion = await this.baseRepository.create(question);
      newQuestion.type = questionType;
      await this.baseRepository.save(newQuestion);
      return newQuestion;
    }
    throw new HttpException(
      'No type was found for this question!',
      HttpStatus.NOT_FOUND,
    );
  }

  async findAnswers(id: number) {
    const question = await this.baseRepository.findOne(id);
    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    const answers = await this.answerRepository.find({
      where: {
        question,
      },
    });
    if (answers) {
      return answers;
    }
    throw new HttpException(
      'There are no answers for this question',
      HttpStatus.NOT_FOUND,
    );
  }
}
