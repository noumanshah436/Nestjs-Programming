import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

// we are using our guard(JwtGuard: which will validate the token) for all the endpoints of the controller.
// we are linking our strategy with the AuthGuard.

// we can use it in that way, but we can make it more cleaner by abstracting it in it's own class.
// @UseGuards(AuthGuard('jwt'))   

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  
  constructor(private userService: UserService) {}

  // http://localhost:3333/users/me
  @Get('me')
  getMe(@GetUser() user: User) {
    // whatever our custom decorator return will be availlable in user
    return user;
  }

  // @Get('me')
  // getMe(@GetUser() user: User, @GetUser('email') email: string) {
  //   console.log({email})
  //   return user;
  // }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
