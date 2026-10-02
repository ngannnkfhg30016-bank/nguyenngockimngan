// Vietnamese Voice Interaction Utilities for Kiến Sáng Chatbot
// 100% Vietnamese Text-to-Speech (AI Audio Stream + Web Speech API fallback)
// and Vietnamese Speech-to-Text (vi-VN)

// Audio element singleton for server-streamed authentic Vietnamese TTS
let currentAudio: HTMLAudioElement | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices listener safely in browser
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Normalizes Vietnamese text into phonetic-friendly spoken Vietnamese
 * Expands numbers, coordinates, treaties, abbreviations, and removes markdown/emojis.
 */
export function cleanTextForTTS(text: string): string {
  if (!text) return '';
  return text
    // Strip emojis
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      ''
    )
    // Strip markdown bold, italic, headings, code
    .replace(/[#*_~`]/g, '')
    // Expand specific numbers and geography units into Vietnamese words
    .replace(/1\.010\.274\s*km²/gi, 'hơn một triệu ki-lô-mét vuông')
    .replace(/1010274\s*km²/gi, 'hơn một triệu ki-lô-mét vuông')
    .replace(/3\.260\s*km/gi, 'ba nghìn hai trăm sáu mươi ki-lô-mét')
    .replace(/3260\s*km/gi, 'ba nghìn hai trăm sáu mươi ki-lô-mét')
    .replace(/3,44\s*triệu/gi, 'ba phẩy bốn mươi bốn triệu')
    .replace(/(\d+)\s*km²/gi, '$1 ki-lô-mét vuông')
    .replace(/(\d+)\s*km/gi, '$1 ki-lô-mét')
    .replace(/(\d+)\s*°\s*B/gi, '$1 độ Bắc')
    .replace(/(\d+)\s*°\s*Đ/gi, '$1 độ Đông')
    .replace(/(\d+)\s*°/gi, '$1 độ ')
    .replace(/200\s*hải\s*lý/gi, 'hai trăm hải lý')
    // Abbreviations & treaties
    .replace(/UNCLOS\s*1982/gi, 'Công ước Luật biển Liên Hợp Quốc năm 1982')
    .replace(/UNCLOS/gi, 'Công ước Luật biển An-clốt')
    .replace(/DOC/gi, 'Tuyên bố Đi-ô-xi')
    .replace(/DK1/gi, 'nhà giàn Đê-Ka một')
    .replace(/TP\.\s*Hồ Chí Minh/gi, 'Thành phố Hồ Chí Minh')
    .replace(/TP\.\s*Đà Nẵng/gi, 'Thành phố Đà Nẵng')
    .replace(/TP\./g, 'Thành phố ')
    .replace(/QĐ\./g, 'Quần đảo ')
    .replace(/SGK/gi, 'sách giáo khoa')
    .replace(/GDPT/gi, 'giáo dục phổ thông')
    .replace(/CHXHCN/gi, 'Cộng hòa xã hội chủ nghĩa')
    .replace(/VN/gi, 'Việt Nam')
    // Punctuation and pauses
    .replace(/•\s*/g, '. ')
    .replace(/-\s+/g, '. ')
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Searches browser speech synthesis voices for the best Vietnamese voice available
 */
export function getVietnameseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  
  // 1. Exact match for vi-VN or vi_VN
  const exactVi = voices.find(
    (v) => v.lang.toLowerCase() === 'vi-vn' || v.lang.toLowerCase() === 'vi_vn'
  );
  if (exactVi) return exactVi;

  // 2. Starts with 'vi'
  const viPrefix = voices.find((v) => v.lang.toLowerCase().startsWith('vi'));
  if (viPrefix) return viPrefix;

  // 3. Name indicates Vietnamese
  const viName = voices.find(
    (v) =>
      v.name.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('tiếng việt') ||
      v.name.toLowerCase().includes('vietnamese')
  );
  return viName || null;
}

/**
 * Plays Vietnamese voice using the server-side high-fidelity audio stream (/api/tts)
 */
export function playVietnameseAudioStream(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === 'undefined') return false;

  try {
    stopSpeaking();

    const cleaned = cleanTextForTTS(text);
    if (!cleaned) {
      onEnd?.();
      return false;
    }

    const audioUrl = `/api/tts?text=${encodeURIComponent(cleaned)}`;
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onplay = () => {
      onStart?.();
    };

    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
      onEnd?.();
    };

    audio.onerror = (e) => {
      console.warn('Audio stream playback failed, falling back to Web Speech API:', e);
      if (currentAudio === audio) {
        currentAudio = null;
      }
      // Fallback to speech synthesis
      const fallbackSuccess = speakVietnameseSpeechSynthesis(text, onStart, onEnd, onError);
      if (!fallbackSuccess) {
        onError?.(e);
        onEnd?.();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play prevented or interrupted:', err);
        // Fallback to SpeechSynthesis if autoplay or network was blocked
        const fallbackSuccess = speakVietnameseSpeechSynthesis(text, onStart, onEnd, onError);
        if (!fallbackSuccess) {
          onError?.(err);
          onEnd?.();
        }
      });
    }

    return true;
  } catch (err) {
    console.warn('playVietnameseAudioStream error:', err);
    onError?.(err);
    onEnd?.();
    return false;
  }
}

/**
 * Speaks Vietnamese text using browser's native Web Speech API
 */
export function speakVietnameseSpeechSynthesis(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    const cleaned = cleanTextForTTS(text);
    if (!cleaned) {
      onEnd?.();
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95; // Slightly measured rate for clear articulation
    utterance.pitch = 1.05; // Friendly mascot tone

    const viVoice = getVietnameseVoice();
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      onError?.(e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    onError?.(err);
    onEnd?.();
    return false;
  }
}

/**
 * Universal Vietnamese Voice Player
 * By default utilizes the high-fidelity AI Audio Stream for natural tone,
 * seamlessly falling back to browser SpeechSynthesis when appropriate.
 */
export function speakVietnamese(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void,
  preferredEngine: 'ai' | 'browser' = 'ai'
): boolean {
  if (preferredEngine === 'browser') {
    const success = speakVietnameseSpeechSynthesis(text, onStart, onEnd, (err) => {
      // Fallback to audio stream if browser engine errors
      playVietnameseAudioStream(text, onStart, onEnd, onError);
    });
    return success;
  }

  return playVietnameseAudioStream(text, onStart, onEnd, onError);
}

/**
 * Immediately stops all active Vietnamese audio playback and speech synthesis
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined') {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

/**
 * Speech recognition helper configured for Vietnamese language
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof Audio !== 'undefined' || 'speechSynthesis' in window;
}
