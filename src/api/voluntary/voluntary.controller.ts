import { Controller, Get, Param } from '@nestjs/common';
import { VoluntaryService } from './voluntary.service';
import { UserAuth } from 'src/auth/auth.decorator';
import { UserRole } from 'src/constants/constants';

@Controller('voluntary')
export class VoluntaryController {
  constructor(private readonly voluntaryService: VoluntaryService) {}

  @Get()
  @UserAuth(UserRole.organizationAdmin)
  findAll() {
    return this.voluntaryService.findAll();
  }
}
