import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      // if (
      //   error instanceof
      //   PrismaClientKnownRequestError
      // ) {
      //   if (error.code === 'P2002') {
      //     throw new ForbiddenException(
      //       'Credentials taken',
      //     );
      //   }
      // }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // delete user.hash
    // return user;
    return this.signToken(user.id, user.email);
  }

  // Promise<{ access_token: string }>   is the return type
  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    // We will generate token with the user id and email. 
    // so that when he passes back his token with the request, 
    //  we can get those information back and validate this user
    const payload = {
      sub: userId, // sub is a convention to use a unique identifier 
      email,
    };

    // access secret from env file
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
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