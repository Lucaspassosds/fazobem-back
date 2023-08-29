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
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';

@Controller('voluntary-shifts')
@ApiTags('voluntary-shifts')
export class VoluntaryShiftsController {
  constructor(
    private readonly voluntaryShiftsService: VoluntaryShiftsService,
  ) {}

  @Post()
  @UserAuth(UserRole.organizationAdmin, UserRole.voluntary)
  create(@Body() createVoluntaryShiftDto: CreateVoluntaryShiftDto) {
    return this.voluntaryShiftsService.create(createVoluntaryShiftDto);
  }

  @Get()
  @UserAuth(UserRole.organizationAdmin)
  findAll() {
    return this.voluntaryShiftsService.findAll();
  }

  @Get('shifts/:shiftId')
  @UserAuth(UserRole.organizationAdmin)
  findByShift(@Param('shiftId') shiftId: string) {
    return this.voluntaryShiftsService.findByShift(shiftId);
  }

  @Get(':id')
  @UserAuth(UserRole.organizationAdmin, UserRole.voluntary)
  findOne(@Param('id') id: string) {
    return this.voluntaryShiftsService.findOne(id);
  }

  @Patch(':id')
  @UserAuth(UserRole.organizationAdmin, UserRole.voluntary)
  update(
    @Param('id') id: string,
    @Body() updateVoluntaryShiftDto: UpdateVoluntaryShiftDto,
  ) {
    return this.voluntaryShiftsService.update(id, updateVoluntaryShiftDto);
  }

  @Delete(':id')
  @UserAuth(UserRole.organizationAdmin, UserRole.voluntary)
  remove(@Param('id') id: string) {
    return this.voluntaryShiftsService.delete(id);
  }
}
