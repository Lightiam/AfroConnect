
import React from "react";
import { SearchResult } from "@/services/AISearchService";
import { Sparkles, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, onClose }) => {
  const { addItem } = useCart();

  const handleAddToCart = (result: SearchResult) => {
    addItem({
      id: result.id,
      name: result.name,
      price: result.price,
      quantity: 1,
      image: result.image || "",
      vendor: result.category
    });

    toast("Added to cart", {
      description: `${result.name} has been added to your cart`
    });
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg mt-1 p-3 md:p-4 z-10">
        <div className="flex justify-center items-center py-6 md:py-8">
          <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-[#355E3B]"></div>
          <span className="ml-2 text-gray-600 text-sm md:text-base">Searching with AI...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg mt-1 z-10">
      <div className="flex justify-between items-center p-2 md:p-3 border-b">
        <h3 className="font-medium text-gray-700 flex items-center text-sm md:text-base">
          <Sparkles size={14} className="text-[#355E3B] mr-1 md:mr-2" />
          African Food Ingredients
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="max-h-60 md:max-h-72 overflow-y-auto">
        {results.map((result) => (
          <div key={result.id} className="p-2 md:p-3 border-b hover:bg-gray-50">
            <div className="flex items-center">
              {result.image && (
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded mr-2 md:mr-3 flex-shrink-0">
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">{result.name}</h4>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-1">{result.description}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-[#F2FCE2] text-[#355E3B] rounded-full">
                    {result.category}
                  </span>
                  <span className="font-medium text-[#355E3B] text-xs md:text-sm">${result.price}</span>
                </div>
              </div>
            </div>
            <button 
              className="mt-2 w-full text-xs md:text-sm bg-[#355E3B] text-white rounded-lg py-1 px-2 flex items-center justify-center"
              onClick={() => handleAddToCart(result)}
            >
              <ShoppingCart size={12} className="mr-1" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
