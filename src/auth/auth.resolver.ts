import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AdminUser } from '../admin-users/entities/admin-user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AdminUser)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const adminUser = context.user as AdminUser;
    context.res.set({
      'Set-Cookie': [this.authService.getCookieWithJwtToken(adminUser.id)],
    });
    return adminUser;
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context) {
    context.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
