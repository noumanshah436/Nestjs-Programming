import { Global, Module } from "@nestjs/common";
import { AccountsController } from "./controllers/accounts.controller";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";

@Global()   // now we do not need to import that module, it is available throughout the application
@Module({
  controllers: [UsersController, AccountsController],
  providers: [UsersService],  //  that can be used as a dependencies
  exports: [UsersService],    // which things another module(B) can use if module(B) import this module
})
export class UsersModule {}
