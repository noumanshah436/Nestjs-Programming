import { Module } from "@nestjs/common";
import { CacheStoreModule } from "src/cache-store";
import { UsersService } from "./users.service";

@Module({
  imports: [
    // CacheStoreModule,  // default module

    // create a dynamic module with below option
    CacheStoreModule.register({
      storeName: "users",
    }),
  ],
  providers: [UsersService],
})
export class UsersModule {}
