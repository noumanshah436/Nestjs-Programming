import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  // JwtModule is to sigin the json web tokens
  // We need to register JwtModule in this module, so that it will be accessible to this module.
  // Now we can use it's AuthService in this module.
  imports: [JwtModule.register({})],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
