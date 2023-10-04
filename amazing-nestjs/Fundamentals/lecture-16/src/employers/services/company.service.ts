import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  constructor() {
    console.log('[CompanyService]: constructor');
  }
}
