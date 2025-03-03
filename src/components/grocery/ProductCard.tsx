
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart, CartItem } from "@/contexts/CartContext";

interface ProductCardProps {
  image: string;
  price: string;
  name: string;
  country?: string;
  isNew?: boolean;
  altText?: string;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  name,
  country,
  isNew = false,
  altText = "",
  onPress,
}) => {
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Convert price string (e.g. "$12.99") to number
    const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ''));
    
    const cartItem: CartItem = {
      id: `p-${Math.random().toString(36).substring(2, 10)}`, // generate random id
      name,
      price: priceNumber,
      quantity: 1,
      image,
      vendor: country || "Unknown Vendor"
    };
    
    addItem(cartItem);
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };
  
  return (
    <div
      className="relative bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden"
      onClick={onPress}
    >
      <div className="relative h-40 md:h-48">
        <img
          src={image}
          alt={altText || name}
          className="w-full h-full object-cover"
        />
        
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white">
            New
          </Badge>
        )}
        
        <button 
          className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
          onClick={handleAddToCart}
        >
          <i className="ti ti-shopping-cart text-[#355E3B]" aria-hidden="true" />
        </button>
      </div>
      
      <div className="p-2">
        <h3 className="font-medium text-sm md:text-base truncate">{name}</h3>
        
        {country && (
          <p className="text-gray-500 text-xs mt-1 truncate">{country}</p>
        )}
        
        <p className="font-semibold text-[#355E3B] mt-1">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
