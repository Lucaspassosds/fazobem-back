import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAuth } from './auth.decorator';
import { AuthService } from './auth.service';
import { CurrentUser, GetUser } from './get-user.decorator';
import { JwtAuthRefreshGuard } from './jwt-auth-refresh.strategy';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env.validation';
import {
  ChangePasswordDto,
  LoginDto,
  OrganizationAdminRegisterDto,
  RequestChangePasswordDto,
  VoluntaryRegisterDto,
} from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Post('voluntary/register')
  @ApiOperation({
    description: 'Register a voluntary user',
  })
  registerVoluntary(@Body() dto: VoluntaryRegisterDto) {
    return this.authService.registerVoluntary(dto);
  }

  @Post('admins/register')
  @ApiOperation({
    description: 'Register an admin.',
  })
  registerAdmin(@Body() registerAdminDto: OrganizationAdminRegisterDto) {
    return this.authService.registerAdmin(registerAdminDto);
  }

  @Post('login')
  @ApiOperation({
    description: 'Login.',
  })
  loginAdmin(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('request-change-password')
  @ApiOperation({
    description: `Requests change of password.`,
  })
  requestAdminChangePassword(
    @Body() requestChangePasswordDto: RequestChangePasswordDto,
  ) {
    return this.authService.requestChangePassword(requestChangePasswordDto);
  }

  @Post('change-password')
  @ApiOperation({
    description: `Change/reset passsword`,
  })
  changeAdminPassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Post('logout')
  @ApiOperation({
    description: "Signs out user. Deletes user's authentication values",
  })
  @UserAuth()
  logoutUser(@GetUser() user: CurrentUser) {
    return this.authService.logout(user.userId, user.authToken);
  }
}
