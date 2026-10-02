import React, { useState, useEffect, useRef } from 'react';
import { KienSangMascot } from '../components/KienSangMascot';
import { MascotState, GradeLevel, UserProgress } from '../types';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { MASCOT_COSTUMES } from '../data/mascotCostumes';
import {
  Bot,
  Sparkles,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Radio,
  AlertCircle,
  RotateCcw,
  ShoppingBag,
  Shirt,
  Sparkle,
} from 'lucide-react';

interface MascotPageProps {
  gradeLevel: GradeLevel;
  currentGrade: number;
  userProgress?: UserProgress;
  onOpenShop?: () => void;
}

interface MascotMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export const MascotPage: React.FC<MascotPageProps> = ({
  gradeLevel,
  currentGrade,
  userProgress,
  onOpenShop,
}) => {
  const [selectedState, setSelectedState] = useState<MascotState>('normal');
  const [interactiveMessages, setInteractiveMessages] = useState<MascotMessage[]>([
    {
      id: 'welcome-mascot',
      sender: 'bot',
      text: 'Chào bạn! Mình là Kiến Sáng 🐜 linh vật thân thiện của trường FPT! Mình giao tiếp hoàn toàn 100% bằng Tiếng Việt cả bằng chữ viết lẫn giọng nói âm thanh. Bạn có thể gõ câu hỏi hoặc bấm nút Micro 🎙️ để trò chuyện cùng mình nhé!',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
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
        handleSendPrompt(transcript.trim());
      }
    },
  });

  // Sync interim transcript into input
  useEffect(() => {
    if (isListening && interimTranscript) {
      setChatInput(interimTranscript);
    }
  }, [isListening, interimTranscript]);

  // Mascot gesture sync with speech
  useEffect(() => {
    if (isSpeaking) {
      setSelectedState('explaining');
    } else if (!isBotThinking) {
      setSelectedState((prev) => (prev === 'explaining' ? 'normal' : prev));
    }
  }, [isSpeaking, isBotThinking]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [interactiveMessages, isListening]);

  const handleSendPrompt = async (text: string) => {
    const q = text.trim();
    if (!q || isBotThinking) return;

    stopSpeech();

    const userMsgId = `user-${Date.now()}`;
    setInteractiveMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: q }]);
    setChatInput('');
    setIsBotThinking(true);
    setSelectedState('thinking');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          gradeLevel,
          currentGrade,
          currentPage: 'mascot',
          contextInfo: 'Trang giao lưu cùng Kiến Sáng có giọng nói tiếng Việt',
        }),
      });

      if (!res.ok) throw new Error('Lỗi máy chủ');

      const data = await res.json();
      const reply = data.reply || 'Kiến Sáng luôn đồng hành cùng bạn trên Biển Đông Quest!';
      const botMsgId = `bot-${Date.now()}`;

      setInteractiveMessages((prev) => [
        ...prev,
        { id: botMsgId, sender: 'bot', text: reply },
      ]);
      setSelectedState('explaining');

      if (autoSpeak) {
        speakText(reply, botMsgId);
      }
    } catch {
      const fallbackId = `bot-${Date.now()}`;
      const fallbackText =
        'Kiến Sáng 🐜 luôn bên bạn! Biển Đông rộng 3,44 triệu km², chứa đựng nguồn tài nguyên vô tận và hai quần đảo thiêng liêng Hoàng Sa, Trường Sa của Tổ quốc!';
      setInteractiveMessages((prev) => [
        ...prev,
        {
          id: fallbackId,
          sender: 'bot',
          text: fallbackText,
        },
      ]);
      setSelectedState('normal');

      if (autoSpeak) {
        speakText(fallbackText, fallbackId);
      }
    } finally {
      setIsBotThinking(false);
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeech();
      startListening();
    }
  };

  const handleResetChat = () => {
    stopSpeech();
    setInteractiveMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Chào bạn! Kiến Sáng 🐜 đã sẵn sàng. Bạn muốn đặt câu hỏi gì hay muốn mình kể về các hòn đảo, eo biển trên Biển Đông?',
      },
    ]);
    setSelectedState('normal');
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-3xl border border-sky-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-sky-700 uppercase tracking-wider">
            <Bot className="w-4 h-4 text-sky-600" />
            Linh Vật FPT School & Trợ Lí AI Giọng Nói
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-3">
            <span>Gặp Gỡ & Giao Lưu Cùng Kiến Sáng 🐜</span>
            <span className="text-xs bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-sky-600 animate-pulse" />
              100% Tiếng Việt (Chữ & Âm thanh)
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Biểu tượng của lòng kiên trì, kỷ luật, sáng tạo và tình yêu biển đảo quê hương Việt Nam.
          </p>
        </div>

        {/* Global Sound Control */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Voice Engine Toggle */}
          <button
            onClick={() => setVoiceEngine((prev) => (prev === 'ai' ? 'browser' : 'ai'))}
            className="px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all border bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            title="Chuyển đổi công nghệ giọng nói tiếng Việt"
          >
            <span>{voiceEngine === 'ai' ? '✨ Giọng AI tiếng Việt chuẩn' : '💻 Giọng đọc hệ thống'}</span>
          </button>

          {isTtsSupported && (
            <button
              onClick={toggleAutoSpeak}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all border ${
                autoSpeak
                  ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title="Bật/tắt chế độ Kiến Sáng tự động đọc to câu trả lời bằng tiếng Việt"
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-orange-600" /> : <VolumeX className="w-4 h-4" />}
              <span>{autoSpeak ? 'Tự động phát âm: BẬT' : 'Tự động phát âm: TẮT'}</span>
            </button>
          )}

          <button
            onClick={handleResetChat}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Mascot Interactive Stage & Expressions */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-sky-200/80 shadow-xs flex flex-col items-center text-center space-y-5">
          <div className="relative p-6 rounded-3xl bg-linear-to-b from-sky-50 to-blue-50/50 border border-sky-200/80 w-full flex flex-col items-center">
            <KienSangMascot
              state={selectedState}
              size={200}
              animated={true}
              showCaption={true}
              costumeId={userProgress?.equippedCostume}
            />

            {/* Speaking voice ripple badge */}
            {isSpeaking && (
              <div className="absolute top-4 right-4 bg-sky-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-pulse">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Đang nói...</span>
              </div>
            )}
          </div>

          {/* Costume Shop & Wardrobe Quick Access Card */}
          <div className="w-full bg-linear-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-300/80 rounded-2xl p-4 text-left space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span className="font-extrabold text-sm text-slate-900">
                  Shop Trang Phục Kiến Sáng
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-amber-300 text-xs font-black text-amber-900 shadow-2xs">
                <span>🪙</span>
                <span>{userProgress?.coins ?? 100} Xu</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Trang phục đang mặc:{' '}
              <strong className="text-orange-700">
                {MASCOT_COSTUMES.find((c) => c.id === (userProgress?.equippedCostume || 'default'))?.name ||
                  'Mặc định'}
              </strong>
              . Hãy tích lũy Xu từ việc học và chơi trò chơi để mở khóa trọn bộ {MASCOT_COSTUMES.length} trang phục, công cụ & bảo vật biển đảo!
            </p>

            {onOpenShop && (
              <button
                onClick={onOpenShop}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Mở Cửa Hàng Trang Phục Kiến Sáng 🛍️</span>
              </button>
            )}
          </div>

          {/* Interactive State Selector */}
          <div className="w-full space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-left">
              Chuyển đổi trạng thái biểu cảm của Kiến Sáng:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { id: 'normal', label: '😊 Vẫy tay', state: 'normal' },
                { id: 'explaining', label: '💡 Giải thích', state: 'explaining' },
                { id: 'thinking', label: '🤔 Suy nghĩ', state: 'thinking' },
                { id: 'celebrating', label: '🎉 Hoan hô', state: 'celebrating' },
                { id: 'suggesting', label: '✨ Gợi ý', state: 'suggesting' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedState(st.state as MascotState)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedState === st.state
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50/50 hover:border-sky-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mascot Lore Card */}
          <div className="text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 w-full">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Câu chuyện về Kiến Sáng FPT:
            </h4>
            <p className="leading-relaxed">
              Kiến là biểu tượng mẫu mực của sự bền bỉ, cần cù và tinh thần đồng đội. Được khoác lên bộ giáp công nghệ robot tiên tiến cùng hai màu cam – xanh đặc trưng của Tập đoàn FPT, Kiến Sáng tích hợp công nghệ AI và giọng nói tiếng Việt để hỗ trợ học sinh học Địa lí dễ hiểu, sinh động.
            </p>
          </div>
        </div>

        {/* Right: Direct Voice & Conversation Chamber */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sky-200/80 shadow-xs flex flex-col h-[620px]">
          <div className="border-b border-slate-200 pb-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                Phòng Trò Chuyện Trực Tuyến & Tương Tác Giọng Nói
              </h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Voice AI Online
            </span>
          </div>

          {/* Error Notice if any */}
          {recognitionError && (
            <div className="mb-3 bg-red-50 text-red-700 p-2.5 rounded-xl text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="flex-1">{recognitionError}</span>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
            {interactiveMessages.map((msg) => {
              const isMsgSpeaking = isSpeaking && speakingMessageId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-br-xs font-medium shadow-xs'
                        : `bg-slate-100 text-slate-800 rounded-bl-xs border ${
                            isMsgSpeaking
                              ? 'border-sky-400 ring-2 ring-sky-300 bg-sky-50/50'
                              : 'border-slate-200'
                          }`
                    }`}
                  >
                    <div>{msg.text}</div>

                    {/* Speaker Read-Aloud Button */}
                    {msg.sender === 'bot' && isTtsSupported && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between">
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                            isMsgSpeaking
                              ? 'bg-sky-600 text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                          }`}
                        >
                          {isMsgSpeaking ? (
                            <>
                              <Square className="w-3 h-3 fill-current" />
                              <span>Dừng đọc</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                              <span>Đọc bằng giọng nói</span>
                            </>
                          )}
                        </button>
                        {isMsgSpeaking && (
                          <span className="text-[11px] text-sky-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                            Kiến Sáng đang nói...
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Listening in progress box */}
            {isListening && (
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-300 shadow-xs flex items-center gap-3 animate-in fade-in">
                <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center animate-pulse shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-sky-950 flex items-center gap-1.5">
                    <span>Đang lắng nghe giọng nói tiếng Việt của bạn...</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  </div>
                  <p className="text-xs text-sky-800 italic truncate mt-0.5">
                    {interimTranscript ? `"${interimTranscript}"` : 'Hãy nói câu hỏi của bạn vào micro...'}
                  </p>
                </div>
                <button
                  onClick={stopListening}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer"
                >
                  Hoàn tất
                </button>
              </div>
            )}

            {isBotThinking && (
              <div className="text-xs italic text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-fit">
                <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></span>
                Kiến Sáng đang suy nghĩ câu trả lời...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="py-2 flex flex-wrap gap-1.5 border-t border-slate-100 mt-2 text-xs">
            {[
              'Biển Đông rộng bao nhiêu km²?',
              'Hoàng Sa và Trường Sa thuộc tỉnh nào?',
              'Hiệp định Vịnh Bắc Bộ ký năm nào?',
              'Tài nguyên dầu khí Biển Đông có gì?',
            ].map((q, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSendPrompt(q)}
                className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-medium cursor-pointer transition-colors"
              >
                ❓ {q}
              </button>
            ))}
          </div>

          {/* Input Box with Voice Interaction */}
          <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
            {/* Vietnamese Speech-to-Text Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-red-500 border-red-600 text-white animate-pulse shadow-lg shadow-red-500/30 ring-4 ring-red-200'
                  : 'bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100 hover:border-sky-300'
              }`}
              title={isListening ? 'Dừng thu âm' : 'Nói câu hỏi bằng tiếng Việt'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendPrompt(chatInput);
              }}
              placeholder={isListening ? 'Đang lắng nghe tiếng Việt...' : 'Nhập hoặc bấm Micro 🎙️ để nói với Kiến Sáng...'}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
            />

            <button
              onClick={() => handleSendPrompt(chatInput)}
              disabled={isBotThinking || !chatInput.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 text-white transition-colors disabled:text-slate-400 cursor-pointer"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
