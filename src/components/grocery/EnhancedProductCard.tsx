import React from "react";
import AddToCartButton from "./AddToCartButton";

interface EnhancedProductCardProps {
  image: string;
  name: string;
  price: string;
  altText: string;
  discount?: string;
  onAddToCart: (quantity: number) => void;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  image,
  name,
  price,
  altText,
  discount,
  onAddToCart,
}) => {
  return (
    <article className="bg-white p-3 rounded-[10px] shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative">
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}
          </span>
        )}
        <img
          src={image}
          alt={altText}
          className="w-full h-32 object-cover mb-3 rounded-lg"
        />
      </div>
      <h3 className="font-medium text-[#333] mb-1">{name}</h3>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-[#4caf50] font-semibold">{price}</span>
        <AddToCartButton onAddToCart={onAddToCart} />
      </div>
    </article>
  );
};

export default EnhancedProductCard;
