import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';
import { BaseService } from './base.service';

@Injectable()
export class AnswersService extends BaseService<Answer> {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {
    super(Answer);
  }

  async create(answer: CreateAnswerDto) {
    const question = await this.questionRepository.findOne(answer.questionId);
    if (question) {
      const newAnswer = await this.baseRepository.create(answer);
      newAnswer.question = question;
      await this.baseRepository.save(newAnswer);
      return newAnswer;
    }
    throw new HttpException(
      'No question was found for this answer!',
      HttpStatus.NOT_FOUND,
    );
  }

  async findAllByType(type: string) {
    const answers = await this.baseRepository
      .createQueryBuilder('answer')
      .innerJoin('answer.question', 'question')
      .innerJoin('question.type', 'type')
      .where('type.name = :type', { type })
      .getMany();
    console.log('QUERY EXEC', answers);
    if (answers) {
      return answers;
    }
    throw new HttpException(
      'No answers were found with this type',
      HttpStatus.NOT_FOUND,
    );
  }
}
