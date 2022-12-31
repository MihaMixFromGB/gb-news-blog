import { Controller, Get } from '@nestjs/common';

// import { existsSync } from 'fs';
// import { join } from 'path';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('console')
  getLog() {
    let log = '';
    log += '__dirname: ' + __dirname + ' /n';
    // log += '__dirname: ' + join(__dirname, '..');

    return log;
  }
}
