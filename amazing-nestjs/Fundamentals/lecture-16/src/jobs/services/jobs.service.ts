import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
  constructor() {
    console.log('[JobsService]: constructor');
  }
}
