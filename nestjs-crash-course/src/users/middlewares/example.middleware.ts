import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// in this middleware we are validating our token
@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log('Example Middleware');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;

    if (!authorization)
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    
    if (authorization === 'my_token') next();  // next function invokes our actual controller function
    else
      throw new HttpException(
        'Invalid Authorization Token',
        HttpStatus.FORBIDDEN,
      );
  }
}
