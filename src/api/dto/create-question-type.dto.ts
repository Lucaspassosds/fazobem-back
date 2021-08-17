import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionTypeDto {
  @ApiProperty({
    description: 'The name of the question type',
    example: 'Personal Info',
    type: String,
    required: true,
  })
  name: string;
}
