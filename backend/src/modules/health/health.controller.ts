import { Controller, Get, Head } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  @Head()
  root() {
    return { status: 'OK', message: 'Studio Ca Nhan API is running', timestamp: new Date() };
  }

  @Get('api/health')
  health() {
    return { status: 'OK', message: 'Studio Ca Nhan API is running', timestamp: new Date() };
  }
}
