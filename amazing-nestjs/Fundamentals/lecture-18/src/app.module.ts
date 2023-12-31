import { Module } from "@nestjs/common";
import { CacheStoreModule, StoreType } from "./cache-store";
import { join } from "path";
import { UsersModule } from "./users/users.module";
import { JobsModule } from "./jobs/jobs.module";
import { AppService } from "./app.service";
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    UsersModule,
    JobsModule,

    // NOTE: create dynamic module with below options asynchronously
    // `storeName` is not set therefore default name is used (DEFAULT_CACHE)
    CacheStoreModule.forRootAsync({
      storeType: StoreType.FILE,
      storeDir: join(__dirname, "stores"),
    }),

    StripeModule.forRoot("Nouman"),  // another example of forRoot
  ],
  providers: [AppService],
})
export class AppModule {}

// Summary of what we want to achieve for CacheStoreModule:
// In root configuration of CacheStoreModule(forRootAsync) we will configure what should be the type of store(File or Memory)
// and in feature configuration(forFeature) we will decide the name of the store.