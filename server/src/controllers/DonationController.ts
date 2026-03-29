import { Request, Response } from 'express';
import { StripeService } from '../services/StripeService';

const MIN_AMOUNT_CENTS = 100;       // $1.00
const MAX_AMOUNT_CENTS = 99_999_900; // ~$999,999

export class DonationController {
  private stripeService: StripeService;

  constructor(stripeService: StripeService) {
    this.stripeService = stripeService;
  }

  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number' || !Number.isInteger(amount)) {
      res.status(400).json({ message: 'Amount must be an integer (cents).' });
      return;
    }

    if (amount < MIN_AMOUNT_CENTS) {
      res.status(400).json({ message: 'Amount must be at least $1.00 (100 cents).' });
      return;
    }

    if (amount > MAX_AMOUNT_CENTS) {
      res.status(400).json({ message: 'Amount exceeds maximum.' });
      return;
    }

    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(amount);

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      });
    } catch (error) {
      console.error('Stripe PaymentIntent creation failed:', error);
      res.status(500).json({ message: 'Payment processing error. Please try again.' });
    }
  }

  async confirmDonation(req: Request, res: Response): Promise<void> {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
      res.status(400).json({ message: 'paymentIntentId is required.' });
      return;
    }

    try {
      const paymentIntent = await this.stripeService.retrievePaymentIntent(paymentIntentId);

      res.json({
        status: paymentIntent.status,
        amount: paymentIntent.amount,
      });
    } catch (error) {
      console.error('Donation confirmation failed:', error);
      res.status(500).json({ message: 'Could not confirm donation.' });
    }
  }
}
