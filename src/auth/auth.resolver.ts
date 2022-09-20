import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { GqlJwtAuthGuard } from './guards/gql-jwt-auth.guard';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { AdminUser } from '../admin-users/entities/admin-user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AdminUser, { name: 'login' })
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ): Promise<AdminUser> {
    const adminUser = context.user as AdminUser;
    context.res.set({
      'Set-Cookie': [this.authService.getCookieWithJwtToken(adminUser.id)],
    });
    return adminUser;
  }

  @Mutation(() => Boolean, { name: 'logout', nullable: true })
  @UseGuards(GqlJwtAuthGuard)
  async logout(@Context() context) {
    context.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
