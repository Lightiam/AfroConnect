import React from "react";
import AddToCartButton from "./AddToCartButton";

interface EnhancedProductItemProps {
  image: string;
  name: string;
  price: string;
  altText: string;
  description?: string;
  weight?: string;
  onAddToCart: (quantity: number) => void;
}

const EnhancedProductItem: React.FC<EnhancedProductItemProps> = ({
  image,
  name,
  price,
  altText,
  description,
  weight,
  onAddToCart,
}) => {
  return (
    <article className="flex items-center gap-[15px] bg-white p-3 rounded-[10px] shadow-sm hover:shadow-md transition-shadow">
      <img
        src={image}
        alt={altText}
        className="w-[70px] h-[70px] object-cover rounded-lg"
      />
      <div className="flex flex-col gap-[5px] flex-1">
        <h3 className="font-medium text-[#333]">{name}</h3>
        {weight && <span className="text-xs text-gray-500">{weight}</span>}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-1">{description}</p>
        )}
        <div className="flex justify-between items-center mt-1">
          <span className="text-[#4caf50] font-semibold">{price}</span>
          <AddToCartButton onAddToCart={onAddToCart} />
        </div>
      </div>
    </article>
  );
};

export default EnhancedProductItem;
