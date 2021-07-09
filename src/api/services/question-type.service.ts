import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionTypeDto } from '../dto/create-question-type.dto';
import { QuestionType } from '../entities/question-type.entity';
import { BaseService } from './base.service';

@Injectable()
export class QuestionTypeService extends BaseService<QuestionType> {
  constructor(
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
}
