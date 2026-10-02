import { useState, useEffect, useRef, useCallback } from 'react';
import { speakVietnamese, stopSpeaking } from '../utils/voiceAssistant';

interface UseVoiceAssistantOptions {
  onAutoSubmit?: (transcript: string) => void;
  defaultAutoSpeak?: boolean;
}

export function useVoiceAssistant({
  onAutoSubmit,
  defaultAutoSpeak = true,
}: UseVoiceAssistantOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('bdq_auto_speak');
      return saved !== null ? saved === 'true' : defaultAutoSpeak;
    } catch {
      return defaultAutoSpeak;
    }
  });
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Check speech recognition support
  const isSpeechRecognitionSupported =
    typeof window !== 'undefined' &&
    !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const isTtsSupported =
    typeof window !== 'undefined' &&
    (typeof Audio !== 'undefined' || 'speechSynthesis' in window);

  const [voiceEngine, setVoiceEngine] = useState<'ai' | 'browser'>('ai');

  // Toggle auto speak
  const toggleAutoSpeak = useCallback(() => {
    setAutoSpeak((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('bdq_auto_speak', String(next));
      } catch {
        // ignore
      }
      if (!next) {
        stopSpeaking();
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      }
      return next;
    });
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (!isSpeechRecognitionSupported) return;

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'vi-VN'; // Tiếng Việt
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setRecognitionError(null);
      setInterimTranscript('');
      // Stop speaking if currently speaking when user starts talking
      stopSpeaking();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    recognition.onresult = (event: any) => {
      let currentInterim = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptText = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptText;
        } else {
          currentInterim += transcriptText;
        }
      }

      if (currentInterim) {
        setInterimTranscript(currentInterim);
      }

      if (finalTranscript) {
        setInterimTranscript(finalTranscript);
        if (onAutoSubmit) {
          onAutoSubmit(finalTranscript.trim());
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setRecognitionError('Vui lòng cấp quyền Micro trên trình duyệt để tương tác bằng giọng nói.');
      } else if (event.error === 'no-speech') {
        setRecognitionError('Chưa nhận được âm thanh giọng nói, bạn hãy thử lại nhé.');
      } else {
        setRecognitionError('Không thể nhận dạng giọng nói, vui lòng thử lại.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // ignore
      }
    };
  }, [isSpeechRecognitionSupported, onAutoSubmit]);

  // Start listening
  const startListening = useCallback(() => {
    setRecognitionError(null);
    if (!recognitionRef.current) {
      setRecognitionError('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói tiếng Việt.');
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (err: any) {
      // If already started, try stopping and restarting
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, []);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // Speak specific text
  const speakText = useCallback(
    (text: string, messageId?: string, onCompleted?: () => void) => {
      if (!isTtsSupported) return;

      if (isSpeaking && speakingMessageId === messageId) {
        // Toggle pause/stop if clicking the same message
        stopSpeaking();
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        return;
      }

      setSpeakingMessageId(messageId || 'generic');
      setIsSpeaking(true);

      speakVietnamese(
        text,
        () => {
          setIsSpeaking(true);
        },
        () => {
          setIsSpeaking(false);
          setSpeakingMessageId(null);
          onCompleted?.();
        },
        (err) => {
          console.warn('Speech playback issue:', err);
          setIsSpeaking(false);
          setSpeakingMessageId(null);
        },
        voiceEngine
      );
    },
    [isTtsSupported, isSpeaking, speakingMessageId, voiceEngine]
  );

  // Stop speaking
  const stopSpeech = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  }, []);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return {
    isListening,
    interimTranscript,
    isSpeaking,
    speakingMessageId,
    autoSpeak,
    toggleAutoSpeak,
    voiceEngine,
    setVoiceEngine,
    recognitionError,
    isSpeechRecognitionSupported,
    isTtsSupported,
    startListening,
    stopListening,
    speakText,
    stopSpeech,
  };
}
