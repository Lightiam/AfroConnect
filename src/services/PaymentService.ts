
// Payment processing service for AfroConnect marketplace
import { 
  processStripePayment, 
  processCardPayment,
  processPayPalPayment
} from './PaymentProcessor';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'mobile_money' | 'bank_transfer' | 'stripe' | 'paypal';

export interface PaymentDetails {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  mobileNumber?: string;
  provider?: string;
  accountNumber?: string;
  bankName?: string;
  email?: string; // For PayPal
}

export interface OrderDetails {
  orderId: string;
  customerId: string;
  vendorId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  timestamp?: string;
  error?: string;
  provider?: string; // Added to track which payment provider was used
}

// Generate a random transaction ID
const generateTransactionId = () => {
  return 'txn_' + Math.random().toString(36).substring(2, 15);
};

// Process a payment
export const processPayment = async (
  amount: number,
  paymentMethod: PaymentMethod,
  paymentDetails: PaymentDetails,
  orderDetails: OrderDetails
): Promise<PaymentResult> => {
  console.log('Processing payment:', { amount, paymentMethod, orderDetails });
  
  // Route to the appropriate payment processor based on method
  switch (paymentMethod) {
    case 'stripe':
      return processStripePayment(amount, paymentDetails, orderDetails);
      
    case 'credit_card':
    case 'debit_card':
      return processCardPayment(amount, paymentDetails, orderDetails);
      
    case 'paypal':
      return processPayPalPayment(amount, orderDetails);
      
    case 'mobile_money':
    case 'bank_transfer':
      // Use existing implementation for these methods
      return processLegacyPayment(amount, paymentMethod, paymentDetails, orderDetails);
      
    default:
      return {
        success: false,
        error: 'Unsupported payment method',
      };
  }
};

// Legacy payment processor (for mobile money and bank transfer)
const processLegacyPayment = async (
  amount: number,
  paymentMethod: PaymentMethod,
  paymentDetails: PaymentDetails,
  orderDetails: OrderDetails
): Promise<PaymentResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, you would make API calls to a payment processor here
  
  // Simulate success (90% of the time) or failure
  const isSuccessful = Math.random() < 0.9;
  
  if (isSuccessful) {
    return {
      success: true,
      transactionId: generateTransactionId(),
      timestamp: new Date().toISOString(),
      provider: paymentMethod
    };
  } else {
    return {
      success: false,
      error: 'Payment processor declined the transaction. Please try again or use a different payment method.',
      provider: paymentMethod
    };
  }
};

// Validate card details (basic validation)
export const validateCardDetails = (cardNumber: string, expiryDate: string, cvv: string): boolean => {
  // Basic validation - in production, use a proper validation library
  const isCardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiryDate);
  const isCvvValid = /^\d{3}$/.test(cvv);
  
  return isCardNumberValid && isExpiryValid && isCvvValid;
};

// Validate mobile money details
export const validateMobileMoneyDetails = (mobileNumber: string, provider: string): boolean => {
  // Basic validation
  const isMobileNumberValid = /^\d{10,12}$/.test(mobileNumber.replace(/\s/g, ''));
  const isProviderValid = provider.trim().length > 0;
  
  return isMobileNumberValid && isProviderValid;
};

// Format currency amount
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

// Detect credit card type from number
export const detectCardType = (cardNumber: string): string => {
  const cleanedNumber = cardNumber.replace(/\s+/g, '');
  
  if (/^4\d{12}(?:\d{3})?$/.test(cleanedNumber)) {
    return 'visa';
  } else if (/^5[1-5]\d{14}$/.test(cleanedNumber)) {
    return 'mastercard';
  } else if (/^3[47]\d{13}$/.test(cleanedNumber)) {
    return 'amex';
  } else if (/^6(?:011|5\d{2})\d{12}$/.test(cleanedNumber)) {
    return 'discover';
  } else {
    return 'unknown';
  }
};
