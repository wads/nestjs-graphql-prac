import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerResponse } from 'http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class XsrfTokenInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<ServerResponse>();

    return next.handle().pipe(
      tap(() => {
        const token = req['csrfToken']?.();
        const name = this.configService.get('csrf_token.name');
        const maxAge = this.configService.get('csrf_token.max_age');
        res.setHeader(
          'Set-Cookie',
          `${name}=${token}; Path=/; Max-Age=${maxAge}`,
        );
      }),
    );
  }
}
