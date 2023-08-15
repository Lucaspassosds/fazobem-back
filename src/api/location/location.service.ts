import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService extends BaseService<Location> {}
