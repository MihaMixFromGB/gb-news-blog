import {
  Controller,
  UseGuards,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@gb-news-blog/dto';

@ApiTags('api/auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('session')
  @ApiResponse({
    status: 200,
    description: 'Jwt token is valid. Return a current user',
  })
  async getCurrentUser(@Request() req) {
    const { userId } = req.user;
    if (!userId) {
      return null;
    }
    return this.authService.getCurrentUser(userId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('session')
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'The credentials is valid. Set jwt token and return a valid user',
  })
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);

    res.setHeader(
      'Set-Cookie',
      `token=${access_token}; Max-Age=${parseInt(
        process.env.JWT_EXPIRESIN_SEC
      )}; Path=/; SameSite=None; Secure`
    );

    return req.user;
  }
}
