import {
  Controller,
  UseGuards,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';

import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('session')
  async getCurrentUser(@Request() req) {
    const { userId } = req.user;
    if (!userId) {
      return null;
    }
    return this.authService.getCurrentUser(userId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('session')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);

    res.setHeader(
      'Set-Cookie',
      `token=${access_token}; Max-Age=${parseInt(
        process.env.JWT_EXPIRESIN_SEC
      )}; Path=/`
    );

    return req.user;
  }
}
