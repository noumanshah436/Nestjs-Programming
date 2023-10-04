import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// As user is sending token with the request and we are using our stratery that
// appends user object to our request, we can access it here.

// This is the custom decorator to get the user from the request.
// we should not use req object directly in our service as this can be error prone.
// That's why we are creating that custom decorator 
// https://docs.nestjs.com/custom-decorators

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {

    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (data) {
      // if we get data(in our case attribute of user i.e. id , email), 
      // we will return only that attribute of the user
      return request.user[data];
    }
    return request.user;
  },
);
