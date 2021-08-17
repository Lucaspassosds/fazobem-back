import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'The answer text content',
    example: 'My name is John Doe!',
    type: String,
    required: true,
  })
  content: string;

  @ApiProperty({
    description: "The answer's related question's Id",
    example: '1',
    type: Number,
    required: true,
  })
  questionId: number;
}
