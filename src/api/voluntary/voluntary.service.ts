import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Voluntary } from './entities/voluntary.entity';

@Injectable()
export class VoluntaryService extends BaseService<Voluntary> {}
