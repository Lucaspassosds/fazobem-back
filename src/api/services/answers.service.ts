import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(answer: CreateAnswerDto) {
    const question = await this.questionRepository.findOne(answer.questionId);
    if (question) {
      const newAnswer = await this.answerRepository.create(answer);
      newAnswer.question = question;
      await this.answerRepository.save(newAnswer);
      return newAnswer;
    }
    throw new HttpException(
      'No question was found for this answer!',
      HttpStatus.NOT_FOUND,
    );
  }

  findAll() {
    return this.answerRepository.find();
  }

  async findAllByType(type: string) {
    const answers = await this.answerRepository
      .createQueryBuilder('answer')
      .innerJoin('answer.question', 'question')
      .where('question.type = :type', { type })
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

  async findOne(id: number) {
    const answer = await this.answerRepository.findOne(id);
    if (answer) {
      return answer;
    }
    throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
  }

  async updateAnswer(id: number, answer: UpdateAnswerDto) {
    await this.answerRepository.update(id, answer);
    const updatedAnswer = await this.answerRepository.findOne(id);
    if (updatedAnswer) {
      return updatedAnswer;
    }
    throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
  }

  async deleteAnswer(id: number) {
    const deleteResponse = await this.answerRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
    }
  }
}
