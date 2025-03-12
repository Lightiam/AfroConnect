import React, { useState, useRef } from "react";
import { Mic, MicOff, Search } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { performVoiceSearch } from "@/services/AISearchService";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for groceries...",
}) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast("Please enter a search term", {
        description: "Type something to search",
      });
      return;
    }

    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
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
        try {
          setIsProcessing(true);
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const transcription = await performVoiceSearch(audioBlob);
          setQuery(transcription);
          
          if (transcription && onSearch) {
            onSearch(transcription);
          } else if (transcription) {
            navigate(`/search?q=${encodeURIComponent(transcription)}`);
          }
          
          toast("Voice recognized", {
            description: `You said: "${transcription}"`,
          });
        } catch (error) {
          console.error("Voice processing error:", error);
          toast("Voice recognition failed", {
            description: "Please try typing your search instead",
          });
        } finally {
          setIsProcessing(false);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      
      toast("Listening...", {
        description: "Speak clearly to search",
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

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-md mx-auto mt-4 mb-6"
    >
      <div className="absolute left-3 text-gray-400">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-16 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent"
        aria-label="Search"
      />
      <div className="absolute right-14">
        <button
          type="button"
          onClick={toggleVoiceSearch}
          disabled={isProcessing}
          className={`p-2 rounded-full ${isListening ? 'text-red-500' : 'text-gray-400'} hover:text-[#4caf50] transition-colors focus:outline-none`}
          aria-label={isListening ? "Stop voice search" : "Search with voice"}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>
      <button
        type="submit"
        className="absolute right-2 p-1.5 text-white bg-[#4caf50] rounded-full hover:bg-[#3d8b40] focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:ring-offset-2"
        aria-label="Submit search"
      >
        <Search size={16} className="text-white" />
      </button>
    </form>
  );
};

export default SearchBar;
