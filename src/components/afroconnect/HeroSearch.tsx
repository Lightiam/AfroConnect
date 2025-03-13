
import React, { useState } from "react";
import { toast } from "sonner";
import { performAISearch, SearchResult } from "@/services/AISearchService";
import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";
import SearchKeywords from "./SearchKeywords";
import HeroSection from "./HeroSection";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";
import LanguageSelector from "./LanguageSelector";

const HeroSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const handleTranscriptionComplete = (transcription: string) => {
    setSearchQuery(transcription);
    performSearch(transcription);
  };

  const { isListening, toggleVoiceSearch } = useVoiceSearch({
    onTranscriptionComplete: handleTranscriptionComplete,
    language: selectedLanguage
  });

  const performSearch = async (query: string) => {
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const searchResults = await performAISearch(query);
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast("No results found", {
          description: "Try searching for something else",
        });
        setShowResults(false);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast("Search failed", {
        description: "Please try again later",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast("Please enter a search term", {
        description: "Type something to search for African food products",
      });
      return;
    }
    
    performSearch(searchQuery);
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    performSearch(keyword);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <HeroSection>
      <div className="relative">
        <div className="max-w-2xl mx-auto w-full mb-4">
          <LanguageSelector 
            selectedLanguage={selectedLanguage} 
            onLanguageChange={handleLanguageChange} 
          />
        </div>
        
        <SearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isListening={isListening}
          toggleVoiceSearch={toggleVoiceSearch}
          handleSearch={handleSearch}
        />
        
        {showResults && (
          <SearchResults 
            results={results} 
            isLoading={isSearching} 
            onClose={() => setShowResults(false)} 
          />
        )}
        
        <SearchKeywords onKeywordClick={handleKeywordClick} />
      </div>
    </HeroSection>
  );
};

export default HeroSearch;
