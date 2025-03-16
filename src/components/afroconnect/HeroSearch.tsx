
import React, { useState, useEffect } from "react";
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
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [searchAttempts, setSearchAttempts] = useState(0);

  const handleTranscriptionComplete = (transcription: string) => {
    setSearchQuery(transcription);
    performSearch(transcription);
  };

  const { isListening, toggleVoiceSearch } = useVoiceSearch({
    onTranscriptionComplete: handleTranscriptionComplete,
    language: selectedLanguage
  });

  useEffect(() => {
    // If we've tried searching and got no results, show a more helpful message
    if (searchAttempts > 0 && results.length === 0 && !isSearching) {
      toast("Search tips", {
        description: "Try different keywords or check your spelling",
        duration: 5000,
      });
    }
  }, [searchAttempts, results.length, isSearching]);

  const performSearch = async (query: string, retryWithBroader = false) => {
    if (isSearching) return; // Prevent multiple simultaneous searches
    
    const searchTerm = retryWithBroader 
      ? `African food ${query}` // Add context for better results
      : query;

    setLastSearchQuery(query);
    setIsSearching(true);
    setShowResults(true);
    
    try {
      console.log('Performing AI search for:', searchTerm);
      const searchResults = await performAISearch(searchTerm);
      setResults(searchResults);
      
      if (searchResults.length === 0 && !retryWithBroader) {
        // If no results and this is the first attempt, try again with broader terms
        toast("Expanding search", {
          description: "Trying broader search terms",
        });
        performSearch(query, true);
        return;
      }
      
      if (searchResults.length === 0) {
        toast("No results found", {
          description: "Try searching for something else",
        });
        
        // Only update the attempts count on final search (after retry)
        setSearchAttempts(prev => prev + 1);
        setShowResults(false);
      } else {
        // Reset attempts on successful search
        setSearchAttempts(0);
        toast(`Found ${searchResults.length} results`, {
          description: `Results for "${query}"`,
        });
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
          isSearching={isSearching}
        />
        
        {showResults && (
          <SearchResults 
            results={results} 
            isLoading={isSearching} 
            onClose={() => setShowResults(false)} 
            searchQuery={lastSearchQuery}
          />
        )}
        
        <SearchKeywords onKeywordClick={handleKeywordClick} />
      </div>
    </HeroSection>
  );
};

export default HeroSearch;
