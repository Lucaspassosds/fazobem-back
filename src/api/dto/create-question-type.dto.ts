import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionTypeDto {
  @ApiProperty({
    description: 'The name of the question type',
    example: 'Football',
    type: String,
    required: true,
  })
  name: string;
}
