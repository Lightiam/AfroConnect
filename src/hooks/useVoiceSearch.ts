
import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { performVoiceSearch } from '@/services/AISearchService';

interface UseVoiceSearchProps {
  onTranscriptionComplete: (text: string) => void;
}

export const useVoiceSearch = ({ onTranscriptionComplete }: UseVoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startVoiceSearch = useCallback(async () => {
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
          setIsProcessing(true);
          const transcription = await performVoiceSearch(audioBlob);
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
  }, [onTranscriptionComplete]);

  const stopVoiceSearch = useCallback(() => {
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
