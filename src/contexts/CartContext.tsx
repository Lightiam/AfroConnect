
import React, { createContext, useContext, useState, useEffect } from "react";

// Define cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

// Define cart context type
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});

// Custom hook for using cart context
export const useCart = () => useContext(CartContext);

// Cart Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("afroconnect-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Calculate total item count
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("afroconnect-cart", JSON.stringify(items));
  }, [items]);
  
  // Add item to cart
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, newItem];
      }
    });
  };
  
  // Remove item from cart
  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // Update quantity of an item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        itemCount,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
