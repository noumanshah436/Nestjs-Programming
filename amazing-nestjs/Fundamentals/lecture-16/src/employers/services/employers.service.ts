import { Injectable } from '@nestjs/common';
import { JobsApplicationsService } from 'src/jobs/jobs-applications/jobs-applications.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class EmployersService {
  constructor(
    private jobsAppService: JobsApplicationsService,
    private usersService: UsersService,
  ) {
    console.log('[EmployersService]: constructor');
    console.log('[EmployersService]: Jobs applications service injected');
    console.log('[EmployersService]: users service injected');
  }
}
