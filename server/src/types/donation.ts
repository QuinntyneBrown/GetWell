export interface CreatePaymentIntentRequest {
  amount: number; // Amount in cents
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface ConfirmDonationRequest {
  paymentIntentId: string;
}

export interface ConfirmDonationResponse {
  status: string;
  amount: number;
}
