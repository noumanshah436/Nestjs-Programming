import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { JOBS_ROUTES } from "./jobs/jobs-routes";
import { ADMIN_ROUTES } from "./admin/admin-routes";

const ROUTES = [...JOBS_ROUTES, ...ADMIN_ROUTES];

@Module({
  imports: [RouterModule.register(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

//  why RouterModule?
// Whenever we need to prefix the nested routes or need to register the routes with a module-level prefix the RouterModule provides the way to organize the routes hierarchy in such scenarios
// as in case of admin routes we have nest routes
// admin/offices/locations
// admin/users/students