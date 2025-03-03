
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  PaymentMethod, 
  PaymentDetails, 
  OrderDetails, 
  processPayment, 
  validateCardDetails,
  validateMobileMoneyDetails,
  formatCurrency
} from "@/services/PaymentService";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  
  // Card payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  
  // Mobile money form state
  const [mobileNumber, setMobileNumber] = useState("");
  const [provider, setProvider] = useState("MTN");
  
  // Bank transfer form state
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  
  // Mock cart data - in a real app, this would come from a cart context/state
  const cartItems = [
    {
      id: "p1",
      name: "Premium Spice Mix",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      vendor: "Mama's Delicacies"
    },
    {
      id: "p2",
      name: "Organic Palm Oil",
      price: 8.49,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      vendor: "Ghana Spice Co."
    }
  ];
  
  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 4.99;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  // Mock customer data - in a real app, this would come from user context/state
  const customer = {
    id: "b1",
    name: "James Wilson",
    email: "james.wilson@example.com",
    shippingAddress: {
      street: "123 Maple Avenue",
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
      postalCode: "M5V 2L7"
    }
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentMethod);
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    const value = e.target.value.replace(/\s/g, "");
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setExpiryDate(value);
    } else if (value.length <= 4) {
      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
    }
  };
  
  const validatePaymentDetails = (): boolean => {
    if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
      if (!validateCardDetails(cardNumber, expiryDate, cvv)) {
        toast({
          title: "Invalid Card Details",
          description: "Please check your card information and try again.",
          variant: "destructive",
        });
        return false;
      }
      if (!cardholderName.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter the cardholder's name.",
          variant: "destructive",
        });
        return false;
      }
    } else if (paymentMethod === "mobile_money") {
      if (!validateMobileMoneyDetails(mobileNumber, provider)) {
        toast({
          title: "Invalid Mobile Money Details",
          description: "Please check your mobile number and provider.",
          variant: "destructive",
        });
        return false;
      }
    } else if (paymentMethod === "bank_transfer") {
      if (!accountNumber.trim() || !bankName.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter your account number and bank name.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePaymentDetails()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Prepare payment details based on selected method
    let paymentDetails: PaymentDetails = {};
    
    if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
      paymentDetails = {
        cardNumber,
        expiryDate,
        cvv,
        cardholderName
      };
    } else if (paymentMethod === "mobile_money") {
      paymentDetails = {
        mobileNumber,
        provider
      };
    } else if (paymentMethod === "bank_transfer") {
      paymentDetails = {
        accountNumber,
        bankName
      };
    }
    
    // Prepare order details
    const orderDetails: OrderDetails = {
      orderId: "ord_" + Math.random().toString(36).substring(2, 10),
      customerId: customer.id,
      vendorId: "v1", // In a real app, this might be different for each product
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: customer.shippingAddress
    };
    
    try {
      const result = await processPayment(total, paymentMethod, paymentDetails, orderDetails);
      
      if (result.success) {
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${result.transactionId}`,
        });
        // Navigate to order confirmation page
        navigate("/order-confirmation");
      } else {
        toast({
          title: "Payment Failed",
          description: result.error || "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-10">
      {/* Header */}
      <header className="bg-[#355E3B] text-white shadow-md">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <img 
                  src="/lovable-uploads/e6dee00a-5d92-435b-a385-666bdf0a083b.png" 
                  alt="AfroConnect Logo" 
                  className="h-8 md:h-10 w-auto bg-white rounded-md p-1"
                />
              </Link>
              <h1 className="text-xl md:text-2xl font-bold">AfroConnect</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-white/80 hover:text-white text-sm">
                <i className="ti ti-arrow-left mr-1" aria-hidden="true" />
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-3 md:px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-500">Complete your purchase</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-1 order-2 md:order-1">
            <Card className="overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg text-gray-800">Order Summary</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-gray-500 text-xs">{item.vendor}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                {/* Price Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>
                
                <Separator />
                
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-[#355E3B]">{formatCurrency(total)}</span>
                </div>
                
                {/* Shipping Address */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-sm mb-2">Shipping To:</h3>
                  <address className="not-italic text-sm text-gray-600">
                    <p>{customer.name}</p>
                    <p>{customer.shippingAddress.street}</p>
                    <p>{customer.shippingAddress.city}, {customer.shippingAddress.state} {customer.shippingAddress.postalCode}</p>
                    <p>{customer.shippingAddress.country}</p>
                  </address>
                  <button className="text-[#355E3B] text-xs font-medium mt-2">
                    Change address
                  </button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Payment Form */}
          <div className="md:col-span-2 order-1 md:order-2">
            <Card>
              <div className="p-4 md:p-6">
                <h2 className="font-semibold text-lg text-gray-800 mb-4">Payment Method</h2>
                
                <form onSubmit={handleSubmitPayment}>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={handlePaymentMethodChange}
                    className="mb-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card" className="flex items-center cursor-pointer">
                          <i className="ti ti-credit-card mr-1" aria-hidden="true" /> Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="debit_card" id="debit_card" />
                        <Label htmlFor="debit_card" className="flex items-center cursor-pointer">
                          <i className="ti ti-credit-card mr-1" aria-hidden="true" /> Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mobile_money" id="mobile_money" />
                        <Label htmlFor="mobile_money" className="flex items-center cursor-pointer">
                          <i className="ti ti-device-mobile mr-1" aria-hidden="true" /> Mobile Money
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex items-center cursor-pointer">
                          <i className="ti ti-building-bank mr-1" aria-hidden="true" /> Bank Transfer
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  <Tabs value={paymentMethod} className="mt-6">
                    <TabsContent value="credit_card" className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input 
                              id="expiryDate" 
                              placeholder="MM/YY" 
                              value={expiryDate}
                              onChange={handleExpiryDateChange}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              placeholder="123" 
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input 
                            id="cardholderName" 
                            placeholder="John Doe" 
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="debit_card" className="mt-4 space-y-4">
                      {/* Same as credit card form */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="debitCardNumber">Card Number</Label>
                          <Input 
                            id="debitCardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="debitExpiryDate">Expiry Date</Label>
                            <Input 
                              id="debitExpiryDate" 
                              placeholder="MM/YY" 
                              value={expiryDate}
                              onChange={handleExpiryDateChange}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="debitCvv">CVV</Label>
                            <Input 
                              id="debitCvv" 
                              placeholder="123" 
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="debitCardholderName">Cardholder Name</Label>
                          <Input 
                            id="debitCardholderName" 
                            placeholder="John Doe" 
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mobile_money" className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile Number</Label>
                          <Input 
                            id="mobileNumber" 
                            placeholder="e.g., 0123456789" 
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="provider">Provider</Label>
                          <select 
                            id="provider"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value)}
                            required
                          >
                            <option value="MTN">MTN Mobile Money</option>
                            <option value="Airtel">Airtel Money</option>
                            <option value="Vodafone">Vodafone Cash</option>
                            <option value="Orange">Orange Money</option>
                            <option value="Wave">Wave</option>
                          </select>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bank_transfer" className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input 
                            id="accountNumber" 
                            placeholder="e.g., 1234567890" 
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input 
                            id="bankName" 
                            placeholder="e.g., Bank of Africa" 
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-[#355E3B] hover:bg-[#2E5133]"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <i className="ti ti-loader animate-spin mr-2" aria-hidden="true" />
                          Processing...
                        </>
                      ) : (
                        <>Pay {formatCurrency(total)}</>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By completing this purchase, you agree to our <a href="#" className="text-[#355E3B]">Terms of Service</a> and <a href="#" className="text-[#355E3B]">Privacy Policy</a>.
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
