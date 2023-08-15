import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { VoluntaryShift } from './entities/voluntary-shift.entity';

@Injectable()
export class VoluntaryShiftsService extends BaseService<VoluntaryShift> {}
