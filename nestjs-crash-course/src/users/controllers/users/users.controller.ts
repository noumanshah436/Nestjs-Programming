import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user.pipe';
import { UsersService } from '../../services/users/users.service';

// start 1:3:25

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    console.log("inside getUsers")
    return this.userService.fetchUsers();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())   // To validate whether the request body is valid as defined in the DTO.
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    // ValidateCreateUserPipe is the custom pipe to transform age into number 
    console.log("inside createUser")
    console.log(userData.age.toPrecision());
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {  
    // using build-in ParseIntPipe ensures that a method handler parameter 
    // is converted to a JavaScript integer (or throws an exception if the conversion fails)
    console.log("inside getUserById")
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  // express way to handle request
  // @Post('create')
  // createUser(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.send('created');
  // }


  // How to use DTO
  // @Post('create')
  // @UsePipes(new ValidationPipe())    // To validate whether the request body is valid as defined in the DTO.
  // createUser(@Body() userData: CreateUserDto) {
  //   console.log(userData);
  //   return ({})
  // }


  // validate route params using built-in pipe
  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   console.log(id);
  //   return { id };
  // }


  // express way of getting params
  // @Get(':id')
  // getUserById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  //   response.send('')
  // }


  // Get params in nestjs way
  // @Get(':id')
  // getUserById(@Param('id') id: string) {
  //   console.log(id);
  //   return { id };
  // }


  // accept multiple params
  // @Get(':id/:postId')
  // getUserById(@Param('id') id: string, @Param('postId') postId: string) {
  //   console.log(id);
  //   return { id, postId };
  // }


  // query parameters
  // @Get()
  // getUsers(@Query('sortBy') sortBy: string) {
  //   console.log(sortBy)
  //   return { sortBy }
  // }



  
} 
