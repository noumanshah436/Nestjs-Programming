import { Inject, Injectable } from '@nestjs/common';
import { Store } from '../cache-store';
import { STRIPE_CLIENT } from '../stripe/constants';
import { StripeModule } from 'src/stripe/stripe.module';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS-STORE') private store: Store,
    @Inject(STRIPE_CLIENT) private stripe: StripeModule,
  ) {
    console.log(`[UsersService]:`, this.store);
    console.log(`[UsersService]:`, this.stripe); // [UsersService]: { name: 'Nouman' }
  }
}
