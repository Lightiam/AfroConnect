
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
      className="bg-white text-center p-2 md:p-3 rounded-[10px] shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={onPress}
    >
      <div className="relative">
        <img
          src={image}
          alt={altText}
          className="w-full h-28 md:h-40 object-cover mb-1.5 md:mb-2.5 rounded-lg"
        />
        {isNew && (
          <Badge 
            variant="success" 
            className="absolute top-1 md:top-2 right-1 md:right-2 text-xs"
          >
            New
          </Badge>
        )}
        {country && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-1 md:bottom-2 right-1 md:right-2 text-xs"
          >
            {country}
          </Badge>
        )}
      </div>
      {name && <div className="font-medium text-gray-800 mb-0.5 md:mb-1 text-sm md:text-base truncate">{name}</div>}
      <div className="text-[#4caf50] font-medium text-sm md:text-base">{price}</div>
    </div>
  );
};

export default ProductCard;
