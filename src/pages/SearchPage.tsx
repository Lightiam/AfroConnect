
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { performAISearch, SearchResult } from "@/services/AISearchService";
import { Search, Sparkles, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const category = queryParams.get("category") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTerm = query || category || "";
    if (searchTerm) {
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const searchResults = await performAISearch(searchTerm);
          setResults(searchResults);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchResults();
    }
  }, [query, category]);

  const displayTerm = query || category || "";

  return (
    <div className="container mx-auto py-4 md:py-8 px-3 md:px-4">
      <div className="flex items-center mb-4 md:mb-6">
        <Link to="/" className="mr-2 md:mr-3">
          <ArrowLeft className="text-gray-700" size={20} />
        </Link>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F2FCE2] flex items-center justify-center mr-2 md:mr-3">
          <Search className="text-[#355E3B]" size={16} />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
          {displayTerm ? `Search results for "${displayTerm}"` : "Search Results"}
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12 md:py-20">
          <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-[#355E3B]"></div>
          <span className="ml-3 text-gray-600 text-sm md:text-base">Searching with AI...</span>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 md:p-4">
              <div className="h-32 md:h-40 bg-gray-100 rounded-lg mb-3 md:mb-4">
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-1 md:mb-2">{result.name}</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{result.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-[#F2FCE2] text-[#355E3B] rounded-full">
                  {result.category}
                </span>
                <span className="font-bold text-[#355E3B] text-sm md:text-base">${result.price}</span>
              </div>
              <button className="w-full mt-3 md:mt-4 bg-[#355E3B] text-white py-1.5 md:py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center text-sm md:text-base">
                <ShoppingCart size={14} className="mr-1 md:mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 md:py-16">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Search className="text-gray-400" size={20} />
          </div>
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-1 md:mb-2">No results found</h2>
          <p className="text-sm md:text-base text-gray-600">
            We couldn't find any products matching "{displayTerm}". Try different keywords or categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
