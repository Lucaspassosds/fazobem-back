import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.strategy';
import { UserRole } from '../constants/constants';

export const UserAuth = (...roles: Array<UserRole>) => {
  if (roles.length > 0) {
    return applyDecorators(
      ApiBearerAuth(),
      UseGuards(JwtAuthGuard, RolesGuard),
      Roles(...roles),
    );
  }
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
};
