import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';

@Controller('location')
@ApiTags('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UserAuth(UserRole.organizationAdmin)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @UserAuth(UserRole.organizationAdmin)
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @UserAuth(UserRole.organizationAdmin)
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @UserAuth(UserRole.organizationAdmin)
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @UserAuth(UserRole.organizationAdmin)
  remove(@Param('id') id: string) {
    return this.locationService.delete(id);
  }
}
