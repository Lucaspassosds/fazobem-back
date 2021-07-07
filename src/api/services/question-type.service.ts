import { Injectable } from '@nestjs/common';
import { CreateQuestionTypeDto } from '../dto/create-question-type.dto';
import { QuestionType } from '../entities/question-type.entity';
import { BaseService } from './base.service';

@Injectable()
export class QuestionTypeService extends BaseService<QuestionType> {
  constructor() {
    super(QuestionType);
  }

  async create(question: CreateQuestionTypeDto) {
    const newQuestion = await this.baseRepository.create(question);
    await this.baseRepository.save(newQuestion);
    return newQuestion;
  }
}
