import { Controller, Get } from '@nestjs/common';

@Controller('theater')
export class TheaterController {
  @Get('/home')
  getHello(): string {
    return 'im from theater controller';
  }
}
