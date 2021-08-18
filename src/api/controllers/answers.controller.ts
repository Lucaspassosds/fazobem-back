import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswersService } from '../services/answers.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Answer } from '../entities/answer.entity';

@Controller('answers')
@ApiTags('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiBody({ type: CreateAnswerDto })
  @ApiOperation({ description: 'Creates new answer' })
  @ApiCreatedResponse({
    description: 'Answer has been created.',
    type: Answer,
  })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of answers' })
  @ApiOkResponse({
    description: 'Answers have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Answer) } },
  })
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Returns single answer based on Id' })
  @ApiOkResponse({ description: 'Answer have been returned', type: Answer })
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Get('/find/:type')
  @ApiOperation({
    description: 'Returns list of all answers of a given question type',
  })
  @ApiOkResponse({
    description: 'Answers have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Answer) } },
  })
  findByType(@Param('type') type: string) {
    return this.answersService.findAllByType(type);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Updates Answer' })
  @ApiBody({ type: CreateAnswerDto })
  @ApiResponse({
    description: 'Answer has been updated.',
    type: Answer,
  })
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.updateElement(+id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Deletes answer' })
  @ApiOkResponse({
    description: 'Answer has been deleted.',
    type: Answer,
  })
  remove(@Param('id') id: string) {
    return this.answersService.deleteElement(+id);
  }
}
