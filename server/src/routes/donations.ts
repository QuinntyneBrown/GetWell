import { Router } from 'express';
import { DonationController } from '../controllers/DonationController';

export function createDonationRouter(donationController: DonationController): Router {
  const router = Router();

  router.post('/api/donations/create-payment-intent', (req, res) =>
    donationController.createPaymentIntent(req, res)
  );

  router.post('/api/donations/confirm', (req, res) =>
    donationController.confirmDonation(req, res)
  );

  return router;
}
