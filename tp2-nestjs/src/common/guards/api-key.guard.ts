import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { headers: any }>();
    const apiKey = req.headers['x-api-key'];

    // 👇 debug logs
    console.log('ENV API KEY:', process.env.API_KEY);
    console.log('HEADER API KEY:', apiKey);

    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}