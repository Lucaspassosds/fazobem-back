import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { BaseService } from '../../api/common/services/base.service';

@Injectable()
export class UserService extends BaseService<User> {}
