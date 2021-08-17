import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiBody({ type: [CreateQuestionDto] })
  @ApiOperation({ description: 'Creates new question' })
  @ApiCreatedResponse({
    description: 'Question has been created.',
    type: Question,
  })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of questions' })
  @ApiOkResponse({
    description: 'Questions have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Question) } },
  })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Returns single question based on Id' })
  @ApiOkResponse({ description: 'Question have been returned', type: Question })
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Get(':id/:answers')
  @ApiOperation({ description: 'Returns all answers of the given question' })
  @ApiOkResponse({
    description: 'Answers of the question have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Answer) } },
  })
  findAnswers(@Param('id') id: string) {
    return this.questionsService.findAnswers(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Updates Question' })
  @ApiBody({ type: [CreateQuestionDto] })
  @ApiResponse({
    description: 'Question has been updated.',
    type: Question,
  })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateElement(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Question has been deleted.',
    type: Question,
  })
  @ApiOperation({ description: 'Deletes question' })
  remove(@Param('id') id: string) {
    return this.questionsService.deleteElement(+id);
  }
}
