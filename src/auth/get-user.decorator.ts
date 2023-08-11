import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { OrganizationAdmin } from 'src/api/organization-admin/entities/organization-admin.entity';
import { User } from 'src/api/user/entities/user.entity';
import { Voluntary } from 'src/api/voluntary/entities/voluntary.entity';
import { UserRole } from 'src/constants/constants';

export type CurrentUser = {
  user: User;
  voluntary?: Voluntary;
  userId: string;
  userEmail: string;
  authToken?: string;
  role: UserRole;
  userAdmin: {
    organizationAdmin: OrganizationAdmin[];
  };
};

export const GetUser = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const authToken = request.headers.authorization.split(' ')[1];
  request.user.authToken = authToken;
  return request.user as CurrentUser;
});
