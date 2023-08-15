import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftService extends BaseService<Shift> {}
