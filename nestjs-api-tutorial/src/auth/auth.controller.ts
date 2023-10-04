import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// auth is just the prefix we will use for request
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Post http://localhost:3333/auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // instead of doing logic work here, we will move our logic to services and execute it here
    // console.log(dto)
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
