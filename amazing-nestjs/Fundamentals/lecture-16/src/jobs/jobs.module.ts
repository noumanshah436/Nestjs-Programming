import { Module } from "@nestjs/common";
import { JobsController } from "./controllers/jobs.controller";
import { OfficeController } from "./controllers/office.controller";
import { JobsService } from "./services/jobs.service";

import { JobsApplicationsModule } from "./jobs-applications/jobs-applications.module";

@Module({
  // NOTE: `JobsApplicationsService` can be injected wherever `JobsModule` is imported
  // because `JobsModule` exports the `JobsApplicationsModule`

  imports: [JobsApplicationsModule],  // now we can use JobsApplicationsService in this module
  controllers: [JobsController, OfficeController],
  providers: [JobsService],
  exports: [JobsService, JobsApplicationsModule],
})
export class JobsModule {}


// No need to register(import) JobsApplicationsModule in root module because it is already registered in job.module(in imports)
// Job module depends on JobsApplicationsModule so it will be initialized also.