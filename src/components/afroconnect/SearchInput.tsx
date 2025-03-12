
import React from "react";
import { Mic, MicOff, Search, Sparkles } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isListening: boolean;
  toggleVoiceSearch: () => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  isListening,
  toggleVoiceSearch,
  handleSearch,
}) => {
  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
      <div className="relative w-full">
        <div className="relative flex bg-white rounded-full overflow-hidden shadow-lg border border-gray-100 w-full">
          <div className="flex-grow flex items-center">
            <div className="absolute left-3 md:left-4 flex items-center justify-center">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for African food products..."
              className="w-full py-3 md:py-4 pl-10 md:pl-14 pr-2 md:pr-4 outline-none text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={toggleVoiceSearch}
            className={`px-2 ${isListening ? 'text-red-500' : 'text-gray-500'} hover:text-[#355E3B] transition-colors`}
            title={isListening ? "Stop voice search" : "Search with your voice"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button
            type="submit"
            className="bg-[#355E3B] text-white px-3 md:px-6 py-3 md:py-4 font-medium hover:bg-opacity-90 transition-colors flex items-center text-sm md:text-base"
          >
            <Sparkles size={16} className="mr-1 md:mr-2" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
