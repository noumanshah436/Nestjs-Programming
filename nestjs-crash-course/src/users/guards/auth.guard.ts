import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // we can access reuest object from our context
    const request = context.switchToHttp().getRequest() as Request;

    // Guard returns booleon value:
    //  when true: User can access the endpoint
    //  when false: user cannot access the endpoint

    return true;
    // return false;
  }
}

// In TypeScript, the as keyword is used for type assertions, also known as type casting