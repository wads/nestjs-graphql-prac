import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('xsrf-token')
export class TokenController {
  @Get()
  @HttpCode(204)
  getXsrfToken() {
    return;
  }
}
