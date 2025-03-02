
import React from "react";
import { SearchResult } from "@/services/AISearchService";
import { Sparkles, X } from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, onClose }) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg mt-1 p-4 z-10">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#355E3B]"></div>
          <span className="ml-2 text-gray-600">Searching with AI...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg mt-1 z-10">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-medium text-gray-700 flex items-center">
          <Sparkles size={16} className="text-[#355E3B] mr-2" />
          Search Results
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {results.map((result) => (
          <div key={result.id} className="p-3 border-b hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              {result.image && (
                <div className="w-12 h-12 bg-gray-100 rounded mr-3">
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{result.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-1">{result.description}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs px-2 py-1 bg-[#F2FCE2] text-[#355E3B] rounded-full">
                    {result.category}
                  </span>
                  <span className="font-medium text-[#355E3B]">${result.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
