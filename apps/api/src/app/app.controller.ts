import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Default api service response if it is OK.',
  })
  getData() {
    return this.appService.getData();
  }
}
