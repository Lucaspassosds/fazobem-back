import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(question: CreateQuestionDto) {
    const newQuestion = await this.questionRepository.create(question);
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }

  findAll() {
    return this.questionRepository.find();
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne(id);
    if (question) {
      return question;
    }
    throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
  }

  async updateQuestion(id: number, question: UpdateQuestionDto) {
    await this.questionRepository.update(id, question);
    const updatedQuestion = await this.questionRepository.findOne(id);
    if (updatedQuestion) {
      return updatedQuestion;
    }
    throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
  }

  async deleteQuestion(id: number) {
    const deleteResponse = await this.questionRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
  }
}
