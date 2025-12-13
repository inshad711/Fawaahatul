declare module "cashfree-pg" {
  export const Cashfree: {
    PGOrderFetchPayments: (version: string, order_id: any) => Promise<any>;
    XClientId: string;
    XClientSecret: string;
    XEnvironment: any;
    Environment: {
      PRODUCTION: string;
      SANDBOX: string;
    };
    PGCreateOrder: (version: string, payload: any) => Promise<any>;
  };
}
