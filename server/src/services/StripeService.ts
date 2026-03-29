import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16' as Stripe.LatestApiVersion,
    });
  }

  async createPaymentIntent(amountCents: number): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      metadata: {
        organization: 'Get Well',
        type: 'donation',
      },
    });
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }
}
