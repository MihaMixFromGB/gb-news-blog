import { Controller, Get } from '@nestjs/common';

// import { existsSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

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
    log += '__dirname: ' + __dirname + ' --- ';
    // log += 'assets: ' + join(__dirname, '..', 'assets');
    // log += 'assets: ' + existsSync(join(__dirname, '..', 'assets')) + ' --- ';
    // log +=
    //   'batman.jpg: ' +
    //   existsSync(join(__dirname, '..', 'assets/images/batman.jpg'));

    const testFolder = join(__dirname, '..');
    readdirSync(testFolder).forEach((file) => {
      log += file + ' --- ';
    });

    return log;
  }
}
