import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as basic from 'basic-authorization-header';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    const username = createAuthDto.username;
    const password = createAuthDto.password;

    if (username && password) {
      const authToken = basic(username, password).slice(6);

      if (authToken) {
        const verifiedToken = this.authService.authenticate(authToken);
        if (verifiedToken) return verifiedToken;
      }
    }

    throw new HttpException('User Not Found', 400);
  }
}
