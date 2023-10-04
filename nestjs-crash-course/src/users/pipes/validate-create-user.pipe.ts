import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';

// this custom pipe will transform age into a number (ensure that age is a number )
@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe!');

    // value contains request body (as we will apply this pipe to our body)
    console.log(value); 
    // { username: 'nouman', email: 'nouman@gmail.com', age: '23' }
    console.log(metadata);
    // { metatype: [class CreateUserDto], type: 'body', data: undefined }

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number!`);
      throw new HttpException(
        'Invalid Data Type for property age. Expected Number',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(`${parseAgeToInt} is a number. Returning...`);
    return { ...value, age: parseAgeToInt };
  }
}

// we can use pipes for routes parameters and query parameters as well 