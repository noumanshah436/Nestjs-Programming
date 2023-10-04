import { DynamicModule, Module, Provider } from '@nestjs/common';
import { STRIPE_CLIENT } from './constants';

@Module({})
export class StripeModule {
  static forRoot(name: string): DynamicModule {
    
    const stripe = {
      name: name,
    };

    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    };

    return {
      module: StripeModule, // in most cases it's same module in which class we are in
      providers: [stripeProvider],
      exports: [stripeProvider], // we also need to export it so that it can be used in other modules
      global: true,
    };
  }
}

// nest g mo stripe
// CREATE src/stripe/stripe.module.ts (83 bytes)
// UPDATE src/app.module.ts (735 bytes)
