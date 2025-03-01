import React from "react";

interface ProductItemProps {
  image: string;
  name: string;
  price: string;
  altText: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  name,
  price,
  altText,
}) => {
  return (
    <div className="flex items-center gap-[15px] bg-white p-2.5 rounded-[10px]">
      <img
        src={image}
        alt={altText}
        className="w-[60px] h-[60px] object-cover rounded-lg"
      />
      <div className="flex flex-col gap-[5px]">
        <div className="font-medium">{name}</div>
        <div className="text-[#4caf50]">{price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
