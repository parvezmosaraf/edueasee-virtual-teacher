
import { useState, useRef } from 'react';
import { Mic, MicOff, StopCircle } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

// We don't need to redefine these interfaces since they're already in vite-env.d.ts
// Just import them by reference

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
}

const VoiceInput = ({ onTranscript, isListening: externalIsListening }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    try {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        toast.error('Speech recognition is not supported in your browser');
        return;
      }

      const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
      if (!SpeechRecognitionAPI) {
        toast.error('Speech recognition is not supported in your browser');
        return;
      }
      
      recognitionRef.current = new SpeechRecognitionAPI();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast.info('Listening...');
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        
        if (event.results[0].isFinal) {
          onTranscript(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Error occurred while listening');
        stopListening();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start voice input');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!isListening ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={startListening}
          className="h-9 w-9"
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only">Start voice input</span>
        </Button>
      ) : (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={stopListening}
          className="h-9 w-9"
        >
          <StopCircle className="h-4 w-4" />
          <span className="sr-only">Stop voice input</span>
        </Button>
      )}
    </div>
  );
};

export default VoiceInput;
