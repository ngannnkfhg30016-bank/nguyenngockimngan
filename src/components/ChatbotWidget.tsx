import React, { useState, useEffect, useRef } from 'react';
import { KienSangMascot } from './KienSangMascot';
import { MascotState, GradeLevel, PageId, ChatMessage } from '../types';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Radio,
  AlertCircle,
} from 'lucide-react';

interface ChatbotWidgetProps {
  currentPage: PageId;
  gradeLevel: GradeLevel;
  currentGrade: number;
  activeContext?: string;
  onNavigate?: (page: PageId) => void;
  equippedCostume?: string;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  currentPage,
  gradeLevel,
  currentGrade,
  activeContext,
  onNavigate,
  equippedCostume,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('normal');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Xin chào! Mình là Kiến Sáng 🐜\nLinh vật của FPT School, đồng hành cùng bạn khám phá Biển Đông!\nMình giao tiếp 100% bằng Tiếng Việt cả bằng văn bản chữ viết lẫn âm thanh giọng nói. Bạn có thể gõ câu hỏi hoặc bấm Micro 🎙️ để trò chuyện cùng mình nhé!',
      timestamp: Date.now(),
      state: 'normal',
      suggestedPrompts: [
        'Biển Đông là gì?',
        'Biển Đông quan trọng thế nào với Việt Nam?',
        'Giúp mình đọc bản đồ',
        'Mình không biết chơi',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Assistant Hook
  const {
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
  } = useVoiceAssistant({
    defaultAutoSpeak: true,
    onAutoSubmit: (transcript) => {
      if (transcript && transcript.trim()) {
        handleSendMessage(transcript.trim());
      }
    },
  });

  // Update input text with interim transcript while listening
  useEffect(() => {
    if (isListening && interimTranscript) {
      setInputValue(interimTranscript);
    }
  }, [isListening, interimTranscript]);

  // Mascot animation sync with speech
  useEffect(() => {
    if (isSpeaking) {
      setMascotState('explaining');
    } else if (!isLoading) {
      setMascotState((prev) => (prev === 'explaining' ? 'normal' : prev));
    }
  }, [isSpeaking, isLoading]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isListening]);

  // Context-aware quick prompt suggestions
  const getContextualPrompts = (): string[] => {
    switch (currentPage) {
      case 'map':
        return ['Giúp mình đọc bản đồ', 'Hoàng Sa và Trường Sa ở đâu?', 'Các cảng biển lớn nằm ở đâu?'];
      case 'games':
        return ['Mình không biết chơi trò này', 'Gợi ý câu này', 'Mẹo đạt điểm cao trong game'];
      case 'learn':
        return [
          'Giải thích kiến thức này',
          'Ý nghĩa của Hiệp định Vịnh Bắc Bộ 2000?',
          'Tại sao cần bảo vệ môi trường biển?',
        ];
      case 'challenges':
        return ['Gợi ý câu hỏi này', 'Quy tắc suy luận câu hỏi', 'Giải thích vì sao đáp án đúng'];
      default:
        return [
          'Biển Đông là gì?',
          'Biển Đông quan trọng thế nào với Việt Nam?',
          'Giúp mình đọc bản đồ',
          'Đề xuất bài học hôm nay',
        ];
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    // Stop speaking any ongoing reply
    stopSpeech();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setMascotState('thinking');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          gradeLevel,
          currentGrade,
          currentPage,
          contextInfo: activeContext || `Đang ở trang ${currentPage}`,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.role,
            text: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('Lỗi máy chủ');
      }

      const data = await res.json();
      const replyText = data.reply || 'Kiến Sáng luôn ở đây để giúp bạn học tập tốt hơn!';

      const newBotMsgId = `bot-${Date.now()}`;

      // Set state based on response content
      let nextState: MascotState = 'explaining';
      if (replyText.includes('Chúc mừng') || replyText.includes('Tuyệt vời') || replyText.includes('Chính xác')) {
        nextState = 'celebrating';
      } else if (replyText.includes('Gợi ý') || replyText.includes('Mẹo')) {
        nextState = 'suggesting';
      }
      setMascotState(nextState);

      const botMsg: ChatMessage = {
        id: newBotMsgId,
        role: 'assistant',
        content: replyText,
        timestamp: Date.now(),
        state: nextState,
        suggestedPrompts: getContextualPrompts().slice(0, 3),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Auto-speak response in Vietnamese if enabled
      if (autoSpeak) {
        speakText(replyText, newBotMsgId);
      }
    } catch (err) {
      console.warn('Fallback response triggered:', err);
      const fallbackId = `bot-${Date.now()}`;
      const fallbackText =
        'Kiến Sáng sẵn sàng giúp bạn! 🐜 Hãy nhớ rằng Biển Đông có diện tích khoảng 3,44 triệu km², trải rộng từ 3°B đến 26°B. Vùng biển Việt Nam rộng hơn 1 triệu km² với hai quần đảo thiêng liêng Hoàng Sa và Trường Sa!';
      
      const botMsg: ChatMessage = {
        id: fallbackId,
        role: 'assistant',
        content: fallbackText,
        timestamp: Date.now(),
        state: 'explaining',
      };
      setMessages((prev) => [...prev, botMsg]);
      setMascotState('explaining');

      if (autoSpeak) {
        speakText(fallbackText, fallbackId);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMascotState((s) => (s === 'celebrating' ? 'normal' : s));
      }, 5000);
    }
  };

  const handleResetChat = () => {
    stopSpeech();
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          'Xin chào bạn! Kiến Sáng 🐜 đã sẵn sàng hỗ trợ. Bạn muốn tìm hiểu thêm về bài học, bản đồ hay cùng chơi trò chơi nào?',
        timestamp: Date.now(),
        state: 'normal',
        suggestedPrompts: getContextualPrompts(),
      },
    ]);
    setMascotState('normal');
  };

  const handleToggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeech();
      startListening();
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
          {/* Friendly prompt bubble */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 text-slate-800 px-3.5 py-2 rounded-2xl shadow-lg border border-orange-200 cursor-pointer hover:scale-105 transition-all text-xs font-semibold select-none group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Hỏi giọng nói Kiến Sáng 🎙️</span>
            <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-md font-bold">
              AI Voice
            </span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setMascotState('normal');
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl shadow-orange-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-white relative group"
            title="Mở trò chuyện giọng nói với Kiến Sáng FPT"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <KienSangMascot
                state="normal"
                size={54}
                animated={false}
                costumeId={equippedCostume}
              />
            </div>
            {/* Notification pip */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
              🎙️
            </span>
          </button>
        </div>
      )}

      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] max-h-[90vh] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Window Header */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 overflow-hidden relative">
                <KienSangMascot
                  state={mascotState}
                  size={48}
                  animated={isSpeaking}
                  costumeId={equippedCostume}
                />
                {isSpeaking && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border border-white animate-ping"></span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                    Kiến Sáng 🐜
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/25 text-white flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 text-emerald-300 animate-pulse" />
                    100% Tiếng Việt (Chữ & Giọng nói)
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-orange-100 font-medium">
                    {gradeLevel === 'tieuhoc'
                      ? 'Bạn đồng hành Tiểu học'
                      : gradeLevel === 'thcs'
                      ? 'Trợ lí Địa lí THCS'
                      : 'Chuyên gia Chuyên đề 11 THPT'}
                  </p>
                  <button
                    onClick={() => setVoiceEngine((prev) => (prev === 'ai' ? 'browser' : 'ai'))}
                    className="text-[9px] bg-white/20 hover:bg-white/30 text-white px-1.5 py-0.5 rounded-md font-semibold transition-colors flex items-center gap-1"
                    title="Chuyển đổi giữa Giọng AI tiếng Việt chuẩn tự nhiên và Giọng đọc trình duyệt"
                  >
                    <span>{voiceEngine === 'ai' ? '✨ Giọng AI chuẩn' : '💻 Giọng hệ thống'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice auto-speak toggle button */}
              {isTtsSupported && (
                <button
                  onClick={toggleAutoSpeak}
                  className={`p-1.5 rounded-lg transition-colors ${
                    autoSpeak
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title={autoSpeak ? 'Tắt tự động đọc giọng nói' : 'Bật tự động đọc giọng nói tiếng Việt'}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Làm mới cuộc trò chuyện"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  stopSpeech();
                  stopListening();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Thu nhỏ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context & Audio Status Bar */}
          <div className="bg-amber-50/90 px-3.5 py-1.5 border-b border-amber-200 text-[11px] text-amber-900 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
              <span>
                Đang xem:{' '}
                <strong className="capitalize">
                  {currentPage === 'home'
                    ? 'Trang chủ'
                    : currentPage === 'map'
                    ? 'Bản đồ Biển Đông'
                    : currentPage === 'learn'
                    ? 'Bài học SGK 11'
                    : currentPage === 'games'
                    ? 'Trò chơi'
                    : currentPage === 'challenges'
                    ? 'Thử thách'
                    : 'Khám phá'}
                </strong>
              </span>
            </span>

            {/* Audio Indicator */}
            {isSpeaking ? (
              <button
                onClick={stopSpeech}
                className="flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 px-2 py-0.5 rounded-full transition-colors"
              >
                <Square className="w-2.5 h-2.5 fill-current" />
                <span>Dừng đọc</span>
              </button>
            ) : (
              <span className="text-amber-700 font-medium">Lớp {currentGrade}</span>
            )}
          </div>

          {/* Error Notice */}
          {recognitionError && (
            <div className="bg-red-50 text-red-700 px-3 py-2 text-xs flex items-center gap-2 border-b border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span className="flex-1">{recognitionError}</span>
              <button
                onClick={() => handleToggleVoiceInput()}
                className="text-[11px] font-bold underline shrink-0 hover:text-red-900"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm bg-slate-50/50">
            {messages.map((msg) => {
              const isThisMsgSpeaking = isSpeaking && speakingMessageId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed relative group ${
                      msg.role === 'user'
                        ? 'bg-orange-600 text-white rounded-br-xs shadow-xs font-medium'
                        : `bg-white text-slate-800 rounded-bl-xs shadow-xs border whitespace-pre-line ${
                            isThisMsgSpeaking
                              ? 'border-orange-400 ring-2 ring-orange-400/20 bg-orange-50/20'
                              : 'border-slate-200'
                          }`
                    }`}
                  >
                    <div>{msg.content}</div>

                    {/* Text to Speech Control Button for Assistant message */}
                    {msg.role === 'assistant' && isTtsSupported && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <button
                          onClick={() => speakText(msg.content, msg.id)}
                          className={`flex items-center gap-1 font-semibold px-2 py-1 rounded-lg transition-colors ${
                            isThisMsgSpeaking
                              ? 'bg-orange-100 text-orange-700 font-bold'
                              : 'hover:bg-slate-100 text-slate-600'
                          }`}
                          title="Đọc câu trả lời này bằng giọng nói tiếng Việt"
                        >
                          {isThisMsgSpeaking ? (
                            <>
                              <Square className="w-3 h-3 fill-current" />
                              <span>Dừng đọc</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-orange-500" />
                              <span>Nghe Kiến Sáng nói</span>
                            </>
                          )}
                        </button>
                        {isThisMsgSpeaking && (
                          <span className="flex items-center gap-1 text-[10px] text-orange-600 font-bold animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            Đang phát âm...
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Prompts under assistant message */}
                  {msg.role === 'assistant' && msg.suggestedPrompts && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-colors text-left"
                        >
                          💡 {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Listening in progress indicator */}
            {isListening && (
              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-300 shadow-sm flex items-center gap-3 animate-in fade-in">
                <div className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center animate-pulse shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-orange-950 flex items-center gap-1.5">
                    <span>Kiến Sáng đang lắng nghe bạn nói...</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  </div>
                  <p className="text-[11px] text-orange-800 italic truncate mt-0.5">
                    {interimTranscript ? `"${interimTranscript}"` : 'Hãy nói câu hỏi của bạn bằng tiếng Việt...'}
                  </p>
                </div>
                <button
                  onClick={stopListening}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                >
                  Xong
                </button>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-white px-3 py-2 rounded-xl border border-slate-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></span>
                <span>Kiến Sáng đang suy nghĩ và tra cứu dữ liệu...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Prompt Chips Bar */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-[11px]">
            <button
              onClick={() => handleSendMessage('Gợi ý câu này')}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0"
            >
              🔍 Gợi ý câu này
            </button>
            <button
              onClick={() => handleSendMessage('Biển Đông rộng bao nhiêu?')}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0"
            >
              🌊 Diện tích Biển Đông
            </button>
            <button
              onClick={() => handleSendMessage('Hoàng Sa và Trường Sa thuộc tỉnh nào?')}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0"
            >
              🏝️ Hoàng Sa & Trường Sa
            </button>
            <button
              onClick={() => handleSendMessage('Ý nghĩa Hiệp định Vịnh Bắc Bộ 2000')}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0"
            >
              🤝 Hiệp định 2000
            </button>
          </div>

          {/* Message Input Box with Microphone Voice Button */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            {/* Vietnamese Speech-to-Text Button */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-red-500 border-red-600 text-white animate-pulse shadow-md shadow-red-500/30 ring-2 ring-red-300'
                  : 'bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300'
              }`}
              title={isListening ? 'Bấm để dừng nói' : 'Bấm để nói bằng tiếng Việt'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={isListening ? 'Đang nghe bạn nói...' : 'Nhập hoặc nói câu hỏi cho Kiến Sáng...'}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 text-white transition-all disabled:text-slate-400 shrink-0 shadow-xs"
              title="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
