
import { loadStripe } from '@stripe/stripe-js';
import type { PaymentResult, OrderDetails, PaymentDetails } from './PaymentService';
import { APIService } from './APIService';

// Initialize Stripe (using public key - this is safe to be in client-side code)
const stripePublicKey = 'pk_test_51OxtXyJGmDRePFQkLJUvPyQnTQcKkB7pCnDGBv6Wjt8ZrCULVuD9MZJFSgP0lYk9jGZiA2c7xXTZwrCWMYBgPHla00vB2f4r1v';
let stripePromise: Promise<any> | null = null;

export const getStripeInstance = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};

// Process Stripe payment - production implementation
export const processStripePayment = async (
  amount: number,
  paymentDetails: PaymentDetails,
  orderDetails: OrderDetails
): Promise<PaymentResult> => {
  try {
    console.log('Processing Stripe payment:', { amount, orderDetails });
    
    // Step 1: Create a payment intent on the server
    const paymentIntentResponse = await APIService.post('/api/payments/create-payment-intent', {
      amount: Math.round(amount * 100), // Convert to cents for Stripe
      currency: 'usd',
      orderId: orderDetails.orderId,
      customerId: orderDetails.customerId,
      metadata: {
        orderId: orderDetails.orderId,
        customerEmail: paymentDetails.email || '',
      }
    });
    
    if (!paymentIntentResponse.success || !paymentIntentResponse.data.clientSecret) {
      throw new Error('Failed to create payment intent');
    }
    
    // Step 2: Confirm the payment with Stripe.js on the client
    const stripe = await getStripeInstance();
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentResponse.data.clientSecret,
      {
        payment_method: {
          card: {
            number: paymentDetails.cardNumber?.replace(/\s/g, '') || '',
            exp_month: parseInt(paymentDetails.expiryDate?.split('/')[0] || '0', 10),
            exp_year: parseInt(`20${paymentDetails.expiryDate?.split('/')[1]}` || '0', 10),
            cvc: paymentDetails.cvv || '',
          },
          billing_details: {
            name: paymentDetails.cardholderName || '',
          },
        },
      }
    );
    
    // Step 3: Handle the payment result
    if (error) {
      console.error('Stripe payment error:', error);
      return {
        success: false,
        error: error.message || 'Payment declined by Stripe. Please check your card details and try again.',
        provider: 'stripe'
      };
    }
    
    if (paymentIntent.status === 'succeeded') {
      // Step 4: Confirm order on the server
      await APIService.post('/api/orders/confirm', {
        orderId: orderDetails.orderId,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert back from cents
      });
      
      return {
        success: true,
        transactionId: paymentIntent.id,
        timestamp: new Date().toISOString(),
        provider: 'stripe'
      };
    } else {
      return {
        success: false,
        error: `Payment failed with status: ${paymentIntent.status}`,
        provider: 'stripe'
      };
    }
  } catch (error) {
    console.error('Stripe payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred with Stripe payment.',
      provider: 'stripe'
    };
  }
};

// Process global credit/debit card payment (Visa, Mastercard, etc.)
export const processCardPayment = async (
  amount: number,
  paymentDetails: PaymentDetails,
  orderDetails: OrderDetails
): Promise<PaymentResult> => {
  try {
    console.log('Processing card payment:', { amount, paymentDetails, orderDetails });
    
    // Determine card type for reporting
    let cardType = 'unknown';
    if (paymentDetails.cardNumber) {
      // Basic card type detection
      const cardNum = paymentDetails.cardNumber.replace(/\s/g, '');
      if (cardNum.startsWith('4')) {
        cardType = 'visa';
      } else if (cardNum.startsWith('5')) {
        cardType = 'mastercard';
      } else if (cardNum.startsWith('3')) {
        cardType = 'amex';
      }
    }
    
    // Process payment through the payment gateway API
    const paymentResponse = await APIService.post('/api/payments/process-card', {
      amount,
      currency: 'usd',
      cardNumber: paymentDetails.cardNumber?.replace(/\s/g, ''),
      expiryMonth: paymentDetails.expiryDate?.split('/')[0],
      expiryYear: `20${paymentDetails.expiryDate?.split('/')[1]}`,
      cvv: paymentDetails.cvv,
      cardholderName: paymentDetails.cardholderName,
      orderId: orderDetails.orderId,
      cardType
    });
    
    if (paymentResponse.success) {
      // Confirm order on the server
      await APIService.post('/api/orders/confirm', {
        orderId: orderDetails.orderId,
        transactionId: paymentResponse.data.transactionId,
        amount: amount,
      });
      
      return {
        success: true,
        transactionId: paymentResponse.data.transactionId,
        timestamp: new Date().toISOString(),
        provider: cardType
      };
    } else {
      return {
        success: false,
        error: paymentResponse.message || 'Payment was declined. Please verify your card information or try another payment method.',
        provider: cardType
      };
    }
  } catch (error) {
    console.error('Card payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred while processing your card payment.',
      provider: 'card'
    };
  }
};

// Process PayPal payment
export const processPayPalPayment = async (
  amount: number,
  orderDetails: OrderDetails
): Promise<PaymentResult> => {
  try {
    console.log('Processing PayPal payment:', { amount, orderDetails });
    
    // Create PayPal payment on the server
    const paymentResponse = await APIService.post('/api/payments/create-paypal-payment', {
      amount,
      currency: 'usd',
      orderId: orderDetails.orderId,
      returnUrl: `${window.location.origin}/order-confirmation`,
      cancelUrl: `${window.location.origin}/checkout`
    });
    
    if (!paymentResponse.success || !paymentResponse.data.approvalUrl) {
      throw new Error('Failed to create PayPal payment');
    }
    
    // Redirect the user to PayPal approval URL
    window.location.href = paymentResponse.data.approvalUrl;
    
    // This will never be reached due to redirect, but required for type safety
    return {
      success: true,
      transactionId: paymentResponse.data.paymentId,
      provider: 'paypal'
    };
  } catch (error) {
    console.error('PayPal payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred with PayPal payment.',
      provider: 'paypal'
    };
  }
};
