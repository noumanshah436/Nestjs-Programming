import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  // this will export prisma service to other providers
})
export class PrismaModule {}


// if we have a prisma module, we need to import it in to the auth module to make it work
// but as we have other module that needs prisma module so we need to import prisma in every module
// so we can make it global module

// Also make sure that this global module should be imported in the app_module