import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let method = 'GRAPHQL';
    let url = '';

    // ✅ Handle REST (HTTP)
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      method = req.method;
      url = req.url;
    }

    // ✅ Handle GraphQL
    if (context.getType<'graphql'>() === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const info = gqlCtx.getInfo();
      method = 'GRAPHQL';
      url = info.fieldName; // query or mutation name
    }

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`[${method}] ${url} - ${ms}ms`);
      }),
    );
  }
}