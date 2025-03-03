
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
      className="bg-white text-center p-3 rounded-[12px] shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
      onClick={onPress}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={altText}
          className="w-full h-28 md:h-40 object-cover mb-2 md:mb-3 transform hover:scale-105 transition-all duration-300"
        />
        {isNew && (
          <Badge 
            variant="success" 
            className="absolute top-2 right-2 text-xs font-bold"
          >
            New
          </Badge>
        )}
        {country && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 right-2 text-xs"
          >
            {country}
          </Badge>
        )}
      </div>
      {name && <div className="font-medium text-gray-800 mb-1 text-sm md:text-base truncate">{name}</div>}
      <div className="text-[#4caf50] font-semibold text-sm md:text-base">{price}</div>
    </div>
  );
};

export default ProductCard;
