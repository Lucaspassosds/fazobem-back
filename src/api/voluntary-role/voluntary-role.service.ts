import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { VoluntaryRole } from './entities/voluntary-role.entity';

@Injectable()
export class VoluntaryRoleService extends BaseService<VoluntaryRole> {}
