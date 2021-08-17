import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The question text content',
    example: 'Whats your name?',
    type: String,
    required: true,
  })
  content: string;

  @ApiProperty({
    description: "The question's related type Id",
    example: '1',
    type: Number,
    required: true,
  })
  typeId: number;
}
