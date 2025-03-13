
import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { performVoiceSearch } from '@/services/AISearchService';

interface UseVoiceSearchProps {
  onTranscriptionComplete: (text: string) => void;
  language?: string; // Add language parameter
}

export const useVoiceSearch = ({ onTranscriptionComplete, language = 'en-US' }: UseVoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startVoiceSearch = useCallback(async () => {
    try {
      // First check if the browser supports the Web Speech API
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Use SpeechRecognition API for browsers that support it
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        recognition.lang = language;
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onTranscriptionComplete(transcript);
          setIsListening(false);
          
          toast("Voice recognized", {
            description: `You said: "${transcript}"`,
          });
        };
        
        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          toast("Voice recognition failed", {
            description: "Please try typing your search instead",
          });
          setIsListening(false);
        };
        
        recognition.start();
        setIsListening(true);
        
        toast("Listening...", {
          description: "Speak clearly to search for products",
        });
        
        return;
      }
      
      // Fallback to MediaRecorder if SpeechRecognition is not supported
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
          setIsProcessing(true);
          const transcription = await performVoiceSearch(audioBlob, language);
          onTranscriptionComplete(transcription);
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
        description: "Speak clearly to search for products",
      });
      
    } catch (error) {
      console.error("Microphone access error:", error);
      toast("Microphone access denied", {
        description: "Please allow microphone access to use voice search",
      });
    }
  }, [language, onTranscriptionComplete]);

  const stopVoiceSearch = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const toggleVoiceSearch = useCallback(() => {
    if (isListening) {
      stopVoiceSearch();
    } else {
      startVoiceSearch();
    }
  }, [isListening, startVoiceSearch, stopVoiceSearch]);

  return {
    isListening,
    isProcessing,
    toggleVoiceSearch
  };
};
