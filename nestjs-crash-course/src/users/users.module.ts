import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middlewares/another.middleware';
import { ExampleMiddleware } from './middlewares/example.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})

// To register our middleware we need our module to implements NestModule and then configure it
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    // apply for all the users routes
    // consumer.apply( ).forRoutes('users');

    // apply middleware to all the controller routes 
    // consumer.apply(ExampleMiddleware).forRoutes(UsersController);

    consumer
      .apply(AnotherMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      )
      .apply(ExampleMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
