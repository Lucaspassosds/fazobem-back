import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionDto {
  content: string;
  type: string;
  answers?: CreateAnswerDto[];
}
