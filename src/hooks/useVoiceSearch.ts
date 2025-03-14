import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { performVoiceSearch } from '@/services/AISearchService';

interface UseVoiceSearchProps {
  onTranscriptionComplete: (text: string) => void;
  language?: string;
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
        // Enable interim results to improve accuracy by allowing the API to refine results
        recognition.interimResults = true;
        // Increase maxAlternatives to get more potential matches
        recognition.maxAlternatives = 5;
        
        let finalTranscript = '';
        
        recognition.onresult = (event) => {
          let interimTranscript = '';
          
          // Process results to get the most accurate transcript
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          // Only use final transcript if available, otherwise use interim
          const textToUse = finalTranscript || interimTranscript;
          
          if (textToUse && event.results[0].isFinal) {
            console.log('Final transcript:', textToUse);
            
            // Only call onTranscriptionComplete when we have a final result
            // This prevents pre-populating with interim results
            onTranscriptionComplete(textToUse);
            setIsListening(false);
            
            toast("Voice recognized", {
              description: `You said: "${textToUse}"`,
            });
          }
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
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      setIsListening(true);
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
        
        try {
          setIsProcessing(true);
          const transcription = await performVoiceSearch(audioBlob, language);
          console.log('Server transcription:', transcription);
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
      
      // Record for longer to get more accurate transcription
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
      recognitionRef.current = null;
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
