import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';

@Controller('shift')
@ApiTags('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @UserAuth(UserRole.organizationAdmin)
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  @UserAuth(UserRole.organizationAdmin, UserRole.voluntary)
  findAll(@Query() expand = false) {
    if (expand) {
      return this.shiftService.findAllExpanded();
    }
    return this.shiftService.findAll();
  }

  @Get('voluntary/:voluntaryId')
  @UserAuth(UserRole.voluntary)
  findByVoluntary(@Param('voluntaryId') voluntaryId: string) {
    return this.shiftService.findByVoluntary(voluntaryId);
  }

  @Get(':id')
  @UserAuth(UserRole.organizationAdmin)
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(id);
  }

  @Patch(':id')
  @UserAuth(UserRole.organizationAdmin)
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  @UserAuth(UserRole.organizationAdmin)
  remove(@Param('id') id: string) {
    return this.shiftService.delete(id);
  }
}
