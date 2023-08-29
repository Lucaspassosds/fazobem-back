import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from 'src/auth/entities/user-session.entity';
import { OrganizationAdmin } from '../organization-admin/entities/organization-admin.entity';
import { Voluntary } from '../voluntary/entities/voluntary.entity';
import { VoluntaryShift } from '../voluntary-shifts/entities/voluntary-shift.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSession,
      OrganizationAdmin,
      Voluntary,
      VoluntaryShift,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
