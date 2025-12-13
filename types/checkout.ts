export interface CustomerData {
  [key: string]: any;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  apartment: string;
  address: string;
  state: string;
  city: string;
  postalCode: string;
  contactNumber: string;
  country: string;
  countryCode: any;
}

export interface ShippingMethod {}

export interface ShippingRate {
  flatRate: number;
  currency: string;
  calculated: boolean;
  MIN_AMOUNT_FOR_FREE_SHIPPING: any;
}

export interface PaymentMethod {
  logo: {
    src: string;
    width: number;
    height: number;
    blurWidth: number;
    blurHeight: number;
  };
  name: string;
  value: string;
  statuc: boolean;
  credentials: {
    key: string;
    secret: string;
  };
}

export interface CartItems {
  cartItems: any[];
  totalAmount: number;
  totalTax: number;
  totalDiscount: string;
  discount_value: number;
  discountType: string;
  totalTaxableAmount: number;
}

export interface CheckoutState {
  currency: string;
  customerData: CustomerData | null;
  shippingAddress: ShippingAddress | null;
  shippingRate: any;
  shippingMethod: ShippingMethod | null;
  paymentMethod: PaymentMethod[] | null;
  cartData: CartItems;
  selectedPaymentMethod: string | null;
  formErrors: any;
  is_cod_enabled: boolean;
  min_order_amount: number;
  internalShippingRate: ShippingRate | null;
  // orderSummary: any;
}
