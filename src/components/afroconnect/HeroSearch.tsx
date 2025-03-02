import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Mic, MicOff, Search, Sparkles } from "lucide-react";
import { performAISearch, performVoiceSearch, SearchResult } from "@/services/AISearchService";
import SearchResults from "./SearchResults";

const HeroSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast("Please enter a search term", {
        description: "Type something to search for African food products",
      });
      return;
    }
    
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const searchResults = await performAISearch(searchQuery);
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

  const startVoiceSearch = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsListening(true);
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        try {
          setIsSearching(true);
          const transcription = await performVoiceSearch(audioBlob);
          setSearchQuery(transcription);
          
          // Automatically search after voice input is processed
          const searchResults = await performAISearch(transcription);
          setResults(searchResults);
          setShowResults(true);
          
          if (searchResults.length === 0) {
            toast("No results found", {
              description: "Try saying something else",
            });
            setShowResults(false);
          }
        } catch (error) {
          console.error("Voice processing error:", error);
          toast("Voice recognition failed", {
            description: "Please try typing your search instead",
          });
        } finally {
          setIsSearching(false);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      
      toast("Listening...", {
        description: "Speak clearly to search for products",
      });
      
    } catch (error) {
      console.error("Microphone access error:", error);
      toast("Microphone access denied", {
        description: "Please allow microphone access to use voice search",
      });
    }
  };

  const stopVoiceSearch = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopVoiceSearch();
    } else {
      startVoiceSearch();
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    // Auto search when clicking a keyword
    setIsSearching(true);
    setShowResults(true);
    
    performAISearch(keyword)
      .then((searchResults) => {
        setResults(searchResults);
        if (searchResults.length === 0) {
          toast("No results found", {
            description: "Try searching for something else",
          });
          setShowResults(false);
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
        toast("Search failed", {
          description: "Please try again later",
        });
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  return (
    <section className="bg-[#355E3B] py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connect with Authentic African Food Products
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Discover and order genuine African ingredients, spices, and food products from verified vendors worldwide.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="relative flex bg-white rounded-full overflow-hidden shadow-lg border border-gray-100">
              <div className="flex-grow flex items-center">
                <div className="absolute left-4 flex items-center justify-center">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for African food products, spices, ingredients..."
                  className="w-full py-4 pl-14 pr-4 outline-none"
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
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                type="submit"
                className="bg-[#355E3B] text-white px-6 py-4 font-medium hover:bg-opacity-90 transition-colors flex items-center"
              >
                <Sparkles size={18} className="mr-2" />
                Search
              </button>
            </div>
            
            {showResults && (
              <SearchResults 
                results={results} 
                isLoading={isSearching} 
                onClose={() => setShowResults(false)} 
              />
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Jollof Rice", "Shea Butter", "Palm Oil", "African Spices"].map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/30 text-white cursor-pointer hover:bg-white/40 transition-colors"
                onClick={() => handleKeywordClick(keyword)}
              >
                <Search className="mr-1" size={14} />
                {keyword}
              </span>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSearch;
