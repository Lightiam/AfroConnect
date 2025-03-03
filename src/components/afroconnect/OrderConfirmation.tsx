
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import confetti from "canvas-confetti";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  
  // Generate a random order ID
  const orderId = `AFR-${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Mock order data - in a real app, this would come from the checkout process
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    status: "Confirmed",
    total: "$39.26",
    items: [
      {
        id: "p1",
        name: "Premium Spice Mix",
        price: "$12.99",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        vendor: "Mama's Delicacies"
      },
      {
        id: "p2",
        name: "Organic Palm Oil",
        price: "$8.49",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        vendor: "Ghana Spice Co."
      }
    ],
    shipping: {
      address: "123 Maple Avenue, Toronto, Ontario, M5V 2L7, Canada",
      method: "Standard Shipping",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    payment: {
      method: "Credit Card",
      lastFour: "•••• 1234",
      transactionId: "txn_" + Math.random().toString(36).substring(2, 15)
    }
  };
  
  // Trigger confetti effect on component mount
  React.useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      confetti({
        particleCount: 2,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: randomInRange(0.1, 0.9)
        }
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);
  
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
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-3 md:px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
              <i className="ti ti-check text-3xl" aria-hidden="true" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Confirmed!</h1>
            <p className="text-gray-500 mt-2">Thank you for your purchase. Your order has been received.</p>
          </div>
          
          <Card className="overflow-hidden mb-6">
            <div className="bg-gray-50 p-4 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">Order #{order.id}</h2>
                  <p className="text-gray-500 text-sm">Placed on {order.date}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <Badge 
                    className="bg-green-500 hover:bg-green-500 text-white"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                {order.items.map((item) => (
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
                        <span className="font-medium">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-[#355E3B]">{order.total}</span>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2">Shipping Information</h3>
                <p className="text-gray-600 text-sm">{order.shipping.address}</p>
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-medium">Method:</span> {order.shipping.method}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Estimated Delivery:</span> {order.shipping.estimatedDelivery}
                </p>
              </div>
            </Card>
            
            <Card>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Method:</span> {order.payment.method}
                </p>
                {order.payment.lastFour && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Card:</span> {order.payment.lastFour}
                  </p>
                )}
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Transaction ID:</span> {order.payment.transactionId}
                </p>
              </div>
            </Card>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center"
            >
              <i className="ti ti-shopping-cart mr-2" aria-hidden="true" />
              Continue Shopping
            </Button>
            
            <Button
              onClick={() => navigate("/buyer-profile")}
              className="bg-[#355E3B] hover:bg-[#2E5133] flex items-center"
            >
              <i className="ti ti-receipt mr-2" aria-hidden="true" />
              View All Orders
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;

// Badge component for the OrderConfirmation
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};
