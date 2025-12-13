declare module "@cashfreepayments/cashfree-js" {
  interface CashfreePaymentInstance {
    redirect(): void;
    initiatePayment(): void;
    // You can extend this based on what you actually use.
  }

  export default function Cashfree(
    paymentSessionId: string
  ): Promise<CashfreePaymentInstance>;
}
