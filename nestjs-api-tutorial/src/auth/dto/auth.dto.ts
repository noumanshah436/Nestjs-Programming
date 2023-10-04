import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// this is like interface in typescript(check types and attributes)
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
