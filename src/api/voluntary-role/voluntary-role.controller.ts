import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoluntaryRoleService } from './voluntary-role.service';
import { CreateVoluntaryRoleDto } from './dto/create-voluntary-role.dto';
import { UpdateVoluntaryRoleDto } from './dto/update-voluntary-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('voluntary-role')
@ApiTags('voluntary-role')
export class VoluntaryRoleController {
  constructor(private readonly voluntaryRoleService: VoluntaryRoleService) {}

  @Post()
  create(@Body() createVoluntaryRoleDto: CreateVoluntaryRoleDto) {
    return this.voluntaryRoleService.create(createVoluntaryRoleDto);
  }

  @Get()
  findAll() {
    return this.voluntaryRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voluntaryRoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVoluntaryRoleDto: UpdateVoluntaryRoleDto,
  ) {
    return this.voluntaryRoleService.update(+id, updateVoluntaryRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voluntaryRoleService.delete(+id);
  }
}
