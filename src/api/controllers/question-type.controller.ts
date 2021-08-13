import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateQuestionTypeDto } from '../dto/create-question-type.dto';
import { UpdateQuestionTypeDto } from '../dto/update-question-type.dto';
import { QuestionTypeService } from '../services/question-type.service';

@Controller('types')
export class QuestionTypeController {
  constructor(private readonly questionTypeService: QuestionTypeService) {}

  @Post()
  create(@Body() dto: CreateQuestionTypeDto) {
    return this.questionTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.questionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionTypeService.findOne(+id);
  }

  @Get('/find/:id')
  findTypes(@Param('id') id: string) {
    return this.questionTypeService.findQuestions(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuestionTypeDto) {
    return this.questionTypeService.updateElement(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionTypeService.deleteElement(+id);
  }
}
