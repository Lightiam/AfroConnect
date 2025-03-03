
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/services/PaymentService";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  
  // Calculate shipping, tax, and total
  const shipping = items.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  // Handle proceed to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };
  
  if (items.length === 0) {
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
              <Link to="/" className="text-white/80 hover:text-white text-sm">
                <i className="ti ti-arrow-left mr-1" aria-hidden="true" />
                Back to Shopping
              </Link>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-3 md:px-4 py-6">
          <div className="max-w-2xl mx-auto text-center py-12">
            <i className="ti ti-shopping-cart text-6xl text-gray-300 mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start adding items to your cart to see them here</p>
            <Link to="/">
              <Button className="bg-[#355E3B] hover:bg-[#2E5133]">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
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
            <Link to="/" className="text-white/80 hover:text-white text-sm">
              <i className="ti ti-arrow-left mr-1" aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-3 md:px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-500">Review your items before checkout</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800">
                  Items ({items.length})
                </h2>
                <button 
                  className="text-red-500 text-sm font-medium hover:text-red-600"
                  onClick={clearCart}
                >
                  Remove All
                </button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map(item => (
                  <div key={item.id} className="py-4 flex flex-col md:flex-row space-y-3 md:space-y-0">
                    <div className="flex space-x-3">
                      <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.vendor}</p>
                        <p className="text-[#355E3B] font-medium mt-1">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center md:pl-4">
                      <div className="flex items-center border rounded-md">
                        <button 
                          className="px-3 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="ti ti-trash text-lg" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 sticky top-4">
              <h2 className="font-semibold text-lg text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm mb-4">
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
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-[#355E3B]">{formatCurrency(total)}</span>
              </div>
              
              <Button 
                className="w-full bg-[#355E3B] hover:bg-[#2E5133]"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>We accept:</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <i className="ti ti-brand-visa text-lg" aria-hidden="true" />
                  <i className="ti ti-brand-mastercard text-lg" aria-hidden="true" />
                  <i className="ti ti-brand-paypal text-lg" aria-hidden="true" />
                  <i className="ti ti-device-mobile text-lg" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;
