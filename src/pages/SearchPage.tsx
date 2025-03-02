
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { performAISearch, SearchResult } from "@/services/AISearchService";
import { Search, Sparkles } from "lucide-react";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const searchResults = await performAISearch(query);
          setResults(searchResults);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-[#F2FCE2] flex items-center justify-center mr-3">
          <Search className="text-[#355E3B]" size={20} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {query ? `Search results for "${query}"` : "Search Results"}
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#355E3B]"></div>
          <span className="ml-3 text-gray-600">Searching with AI...</span>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4">
              <div className="h-40 bg-gray-100 rounded-lg mb-4">
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{result.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{result.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-[#F2FCE2] text-[#355E3B] rounded-full">
                  {result.category}
                </span>
                <span className="font-bold text-[#355E3B]">${result.price}</span>
              </div>
              <button className="w-full mt-4 bg-[#355E3B] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center">
                <Sparkles size={16} className="mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={24} />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">No results found</h2>
          <p className="text-gray-600">
            We couldn't find any products matching "{query}". Try different keywords or categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
