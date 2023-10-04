import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

// The logic that verify that the token is correct is called a Strategy.
// Here we are using JWT strategy, but we can have other strateges like login with facebook, and login with google etc.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      // this says that the jwt should be extract from the headers as a bearer toeken
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // we need to allow the strategy to decode that same token with our secret key that was used to sign the JWT initially
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  // token is going to be transformed into that object(see at the end) and put into payload automatically
  async validate(payload: {
    sub: number;
    email: string;
  }) {

    // user can be found or not found(we get null)
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.hash;
    // whatever we return from this validate function, our strategy is going to append 
    // that to the user attribute of the request object automatically
    return user;
  }
}

// -> token format:
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibm91bWFuQGdtYWlsLmNvbSIsImlhdCI6MTY5NDAzODEzOCwiZXhwIjoxNjk0MDM5MDM4fQ.jlgEh3IzZrmPHeAQwEs0YzC1tGrE9LHvnCtZ_B4DCk0

// -> payload for this token (check here https://jwt.io/ ):
// {
//   "sub": 1,
//   "email": "nouman@gmail.com",
//   "iat": 1694038138,
//   "exp": 1694039038
// }

// **************

// In a JWT-based authentication system, the token's validity, including whether it has been tampered with or has expired, 
// is typically verified before the validate method is invoked. This verification is performed by the passport-jwt strategy and the underlying JWT library.

// **************

// Validation Callback (validate Method): 

// Only if the token passes all these checks (signature verification, expiration), the validate method is invoked.
// The purpose of the validate method is to perform application-specific checks, 

// For example, 
//    it might check if the user exists in the database, 
//    if they have the required permissions for a specific route, or if they are allowed to perform a particular action.

// If the user is valid, you return the user object, and Passport considers the user authenticated, attaching the user object to the request for use in subsequent route handlers.
// If the user is not valid, you can return an error or null to indicate that the authentication failed.

// **************

// so basically we can get the information from the token and do something with it 
// Since we have an ID in it, we can get the user