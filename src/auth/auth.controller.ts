import {
  Req,
  Res,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localAuth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: 一般ユーザーではないのでregisterは不要
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(JwtAuthGuard)
  // @Post('register')
  // async register(@Body() registrationData: CreateAdminUserDto) {
  //   return this.authService.register(registrationData);
  // }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const adminUser = request.user as AdminUser;
    response.set({
      'Set-Cookie': [this.authService.getCookieWithJwtToken(adminUser.id)],
    });
    adminUser.password = undefined;
    return response.send(adminUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(204)
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.send(null);
  }
}
