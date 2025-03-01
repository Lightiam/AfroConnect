
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  image: string;
  price: string;
  altText: string;
  name?: string;
  country?: string;
  isNew?: boolean;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  price, 
  altText, 
  name, 
  country, 
  isNew,
  onPress
}) => {
  return (
    <div 
      className="bg-white text-center p-3 rounded-[10px] shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={onPress}
    >
      <div className="relative">
        <img
          src={image}
          alt={altText}
          className="w-full h-40 object-cover mb-2.5 rounded-lg"
        />
        {isNew && (
          <Badge 
            variant="success" 
            className="absolute top-2 right-2"
          >
            New
          </Badge>
        )}
        {country && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 right-2"
          >
            {country}
          </Badge>
        )}
      </div>
      {name && <div className="font-medium text-gray-800 mb-1">{name}</div>}
      <div className="text-[#4caf50] font-medium">{price}</div>
    </div>
  );
};

export default ProductCard;
