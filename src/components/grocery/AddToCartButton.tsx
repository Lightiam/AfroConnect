import React, { useState } from "react";

interface AddToCartButtonProps {
  onAddToCart: (quantity: number) => void;
  initialQuantity?: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onAddToCart,
  initialQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
      onAddToCart(1);
    } else {
      onAddToCart(quantity);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
    onAddToCart(quantity + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      onAddToCart(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      {quantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className="px-3 py-1.5 bg-[#4caf50] text-white rounded-full text-sm font-medium hover:bg-[#3d8b40] transition-colors"
          aria-label="Add to cart"
        >
          <i className="ti ti-shopping-cart mr-1" aria-hidden="true" />
          Add
        </button>
      ) : (
        <div className="flex items-center bg-[#f0f0f0] rounded-full">
          <button
            onClick={decrementQuantity}
            className="w-8 h-8 flex items-center justify-center text-[#4caf50] hover:bg-gray-200 rounded-full"
            aria-label="Decrease quantity"
          >
            <i className="ti ti-minus" aria-hidden="true" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 flex items-center justify-center text-[#4caf50] hover:bg-gray-200 rounded-full"
            aria-label="Increase quantity"
          >
            <i className="ti ti-plus" aria-hidden="true" />
          </button>
        </div>
      )}

      {isAdded && (
        <span className="ml-2 text-sm text-[#4caf50] animate-fade-in-out">
          Added!
        </span>
      )}
    </div>
  );
};

export default AddToCartButton;
