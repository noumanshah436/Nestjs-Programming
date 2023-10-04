import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {  
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()       // this is related to nestjs validation
  email: string;     // this is related to typescript 

  @IsNotEmpty()
  age: number;
}

//  we will use this for the request in users controller to apply above nestjs validations:

// @UsePipes(new ValidationPipe())   