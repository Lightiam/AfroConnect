
// Payment processing service for AfroConnect marketplace
// This is a mock implementation - in production, you would integrate with a real payment processor

export type PaymentMethod = 'credit_card' | 'debit_card' | 'mobile_money' | 'bank_transfer';

export interface PaymentDetails {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  mobileNumber?: string;
  provider?: string;
  accountNumber?: string;
  bankName?: string;
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
}

// Generate a random transaction ID
const generateTransactionId = () => {
  return 'txn_' + Math.random().toString(36).substring(2, 15);
};

// Process a payment (mock implementation)
export const processPayment = async (
  amount: number,
  paymentMethod: PaymentMethod,
  paymentDetails: PaymentDetails,
  orderDetails: OrderDetails
): Promise<PaymentResult> => {
  console.log('Processing payment:', { amount, paymentMethod, orderDetails });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, you would make API calls to a payment processor here
  
  // Simulate success (90% of the time) or failure
  const isSuccessful = Math.random() < 0.9;
  
  if (isSuccessful) {
    return {
      success: true,
      transactionId: generateTransactionId(),
      timestamp: new Date().toISOString()
    };
  } else {
    return {
      success: false,
      error: 'Payment processor declined the transaction. Please try again or use a different payment method.'
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
