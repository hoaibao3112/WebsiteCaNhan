import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';

let hasWarned = false;

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    const expectedApiKey = process.env.API_KEY;

    if (!expectedApiKey) {
      if (process.env.NODE_ENV !== 'production') {
        if (!hasWarned) {
          console.warn('Warning: API_KEY environment variable is not defined. Bypassing API Key check.');
          hasWarned = true;
        }
        return true;
      }
      throw new InternalServerErrorException('Server configuration error: API_KEY is not set');
    }

    if (!apiKey || apiKey !== expectedApiKey) {
      throw new UnauthorizedException('Unauthorized: Invalid or missing API Key');
    }

    return true;
  }
}
