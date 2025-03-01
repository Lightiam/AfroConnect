import React from "react";

interface ProductCardProps {
  image: string;
  price: string;
  altText: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, price, altText }) => {
  return (
    <div className="bg-white text-center p-2.5 rounded-[10px]">
      <img
        src={image}
        alt={altText}
        className="w-full h-auto mb-2.5 rounded-lg"
      />
      <div className="text-[#4caf50] font-medium">{price}</div>
    </div>
  );
};

export default ProductCard;
