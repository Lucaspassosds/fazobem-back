import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoluntaryShiftsService } from './voluntary-shifts.service';
import { CreateVoluntaryShiftDto } from './dto/create-voluntary-shift.dto';
import { UpdateVoluntaryShiftDto } from './dto/update-voluntary-shift.dto';

@Controller('voluntary-shifts')
export class VoluntaryShiftsController {
  constructor(
    private readonly voluntaryShiftsService: VoluntaryShiftsService,
  ) {}

  @Post()
  create(@Body() createVoluntaryShiftDto: CreateVoluntaryShiftDto) {
    return this.voluntaryShiftsService.create(createVoluntaryShiftDto);
  }

  @Get()
  findAll() {
    return this.voluntaryShiftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voluntaryShiftsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVoluntaryShiftDto: UpdateVoluntaryShiftDto,
  ) {
    return this.voluntaryShiftsService.update(+id, updateVoluntaryShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voluntaryShiftsService.delete(+id);
  }
}
