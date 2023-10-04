import { AuthGuard } from '@nestjs/passport';

// Guards are used for 
//     authentication(authentic user can access endpoint) and 
//     authorization(authentic user have permissions to do this action)

// Guard allow or not allow the execution of endpoint. 

// custom guard,
// By passing jwt in AuthGuard we are saying that use our JwtStrategy 
// which authenticate the request by validating the token with the request

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}


// We generate the token with the auth.service and we have a strategy that we can decorate other routes with, 
// so only people with valid token can access the route