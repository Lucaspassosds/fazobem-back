import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateQuestionTypeDto } from '../dto/create-question-type.dto';
import { UpdateQuestionTypeDto } from '../dto/update-question-type.dto';
import { QuestionType } from '../entities/question-type.entity';
import { Question } from '../entities/question.entity';
import { QuestionTypeService } from '../services/question-type.service';

@Controller('types')
@ApiTags('types')
export class QuestionTypeController {
  constructor(private readonly questionTypeService: QuestionTypeService) {}

  @Post()
  @ApiBody({ type: CreateQuestionTypeDto })
  @ApiOperation({ description: 'Creates new question type' })
  @ApiCreatedResponse({
    description: 'Question type has been created.',
    type: QuestionType,
  })
  create(@Body() dto: CreateQuestionTypeDto) {
    return this.questionTypeService.create(dto);
  }

  @Get()
  @ApiOperation({ description: 'Returns list of types' })
  @ApiOkResponse({
    description: 'Types have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(QuestionType) } },
  })
  findAll() {
    return this.questionTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Returns single question type based on Id' })
  @ApiOkResponse({ description: 'Type have been returned', type: QuestionType })
  findOne(@Param('id') id: string) {
    return this.questionTypeService.findOne(+id);
  }

  @Get('/find/:id')
  @ApiOperation({ description: 'Returns all questions of the given type' })
  @ApiOkResponse({
    description: 'Questions of the type have been returned.',
    schema: { type: 'array', items: { $ref: getSchemaPath(Question) } },
  })
  findTypes(@Param('id') id: string) {
    return this.questionTypeService.findQuestions(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Updates Question type' })
  @ApiBody({ type: CreateQuestionTypeDto })
  @ApiResponse({
    description: 'Question type has been updated.',
    type: Question,
  })
  update(@Param('id') id: string, @Body() dto: UpdateQuestionTypeDto) {
    return this.questionTypeService.updateElement(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Deletes question type' })
  @ApiOkResponse({
    description: 'Question type has been deleted.',
    type: Question,
  })
  remove(@Param('id') id: string) {
    return this.questionTypeService.deleteElement(+id);
  }
}
