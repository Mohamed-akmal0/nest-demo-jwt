import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  gethello(): string {
    return 'im from admin controller';
  }
}
