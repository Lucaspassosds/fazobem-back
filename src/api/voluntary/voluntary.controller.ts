import { Controller } from '@nestjs/common';
import { VoluntaryService } from './voluntary.service';

@Controller('voluntary')
export class VoluntaryController {
  constructor(private readonly voluntaryService: VoluntaryService) {}
}
