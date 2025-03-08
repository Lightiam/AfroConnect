
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import VendorProfile from "./components/afroconnect/VendorProfile";
import BuyerProfile from "./components/afroconnect/BuyerProfile";
import ShoppingCart from "./components/afroconnect/ShoppingCart";
import Checkout from "./components/afroconnect/Checkout";
import OrderConfirmation from "./components/afroconnect/OrderConfirmation";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import AuthGuard from "./components/auth/AuthGuard";
import AfricanFoodCategories from "./components/afroconnect/AfricanFoodCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/african-food" element={<AfricanFoodCategories />} />
              <Route 
                path="/vendor-profile" 
                element={
                  <AuthGuard requireVendor={true}>
                    <VendorProfile />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/buyer-profile" 
                element={
                  <AuthGuard>
                    <BuyerProfile />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <AuthGuard>
                    <ShoppingCart />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <AuthGuard>
                    <Checkout />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/order-confirmation" 
                element={
                  <AuthGuard>
                    <OrderConfirmation />
                  </AuthGuard>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
