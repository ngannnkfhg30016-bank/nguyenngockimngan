import React, { useState, useEffect, useRef } from 'react';
import {
  MILLIONAIRE_QUESTIONS,
  PRIZE_LADDER,
  MillionaireQuestion,
  PrizeLevel,
} from '../data/millionaireData';
import { millionaireAudio } from '../utils/millionaireAudio';
import {
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  Clock,
  Sparkles,
  PhoneCall,
  Users,
  Percent,
  RefreshCw,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  LogOut,
  Flame,
  Award,
  ChevronRight,
  Shield,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MillionaireGameProps {
  onAddXp: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenShop?: () => void;
}

export const MillionaireGame: React.FC<MillionaireGameProps> = ({
  onAddXp,
  onAddCoins,
  onUnlockBadge,
  onOpenShop,
}) => {
  // Game state
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<MillionaireQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'locked' | 'correct' | 'wrong'>('idle');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'walked_away'>('playing');
  const [timer, setTimer] = useState<number>(45);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Lifelines state
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    askAudience: true,
    callExpert: true,
    switchQuestion: true,
  });

  // Active lifeline modals
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [audiencePoll, setAudiencePoll] = useState<{ [key: number]: number } | null>(null);
  const [expertModal, setExpertModal] = useState<{
    expert: string;
    advice: string;
    confidence: number;
  } | null>(null);

  // Stats
  const [earnedMoney, setEarnedMoney] = useState<string>('0 VNĐ');
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [explanationText, setExplanationText] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load question for current level
  const loadQuestionForLevel = (lvl: number, isAlternate = false) => {
    const list = MILLIONAIRE_QUESTIONS[lvl] || MILLIONAIRE_QUESTIONS[1];
    const q = isAlternate && list.length > 1 ? list[1] : list[0];
    setCurrentQuestion(q);
    setSelectedOption(null);
    setAnswerState('idle');
    setHiddenOptions([]);
    setAudiencePoll(null);
    setExpertModal(null);
    setExplanationText(null);
    setTimer(45);
    setIsTimerPaused(false);
  };

  // Initial mount
  useEffect(() => {
    loadQuestionForLevel(1);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (gameStatus !== 'playing' || answerState !== 'idle' || isTimerPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        if (prev <= 10) {
          millionaireAudio.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, answerState, isTimerPaused, currentLevel]);

  // Handle timeout
  const handleTimeOut = () => {
    millionaireAudio.playWrong();
    setAnswerState('wrong');
    calculateFinalPrize(false);
    setGameStatus('lost');
  };

  // Select Option & Lock In
  const handleSelectOption = (index: number) => {
    if (answerState !== 'idle' || !currentQuestion || hiddenOptions.includes(index)) return;

    setSelectedOption(index);
    setAnswerState('locked');
    millionaireAudio.playSelect();

    // Suspense delay of 1.6s
    setTimeout(() => {
      if (index === currentQuestion.correctAnswer) {
        // CORRECT
        setAnswerState('correct');
        setExplanationText(currentQuestion.explanation);

        const currentPrize = PRIZE_LADDER.find((p) => p.level === currentLevel);
        const xpGain = currentPrize ? currentPrize.xpReward : 50;

        if (currentLevel === 5 || currentLevel === 10 || currentLevel === 15) {
          millionaireAudio.playMilestone();
          try {
            confetti({ particleCount: 60, spread: 60 });
          } catch {}
        } else {
          millionaireAudio.playCorrect();
        }

        if (currentLevel === 15) {
          // VICTORY!
          setTimeout(() => {
            setEarnedMoney('150.000.000 VNĐ');
            setEarnedXp(10000);
            onAddXp(10000);
            if (onAddCoins) {
              onAddCoins(300);
            }
            onUnlockBadge('millionaire');
            setGameStatus('won');
            try {
              confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
            } catch {}
          }, 2000);
        } else {
          // Advance to next question after 2 seconds
          setTimeout(() => {
            const nextLvl = currentLevel + 1;
            setCurrentLevel(nextLvl);
            loadQuestionForLevel(nextLvl);
          }, 2400);
        }
      } else {
        // WRONG
        setAnswerState('wrong');
        setExplanationText(currentQuestion.explanation);
        millionaireAudio.playWrong();

        setTimeout(() => {
          calculateFinalPrize(false);
          setGameStatus('lost');
        }, 2200);
      }
    }, 1600);
  };

  // Calculate safe milestone rewards
  const calculateFinalPrize = (isWalkAway: boolean) => {
    let finalRewardText = '0 VNĐ';
    let finalXp = 0;

    if (isWalkAway) {
      // Walks away with previous question's prize
      const prevLvl = currentLevel - 1;
      const prevPrize = PRIZE_LADDER.find((p) => p.level === prevLvl);
      if (prevPrize) {
        finalRewardText = prevPrize.rewardText;
        finalXp = prevPrize.xpReward;
      }
    } else {
      // Fell back to last safe milestone
      if (currentLevel > 10) {
        finalRewardText = '22.000.000 VNĐ';
        finalXp = 3000;
      } else if (currentLevel > 5) {
        finalRewardText = '1.000.000 VNĐ';
        finalXp = 500;
      } else {
        finalRewardText = '0 VNĐ';
        finalXp = 20;
      }
    }

    setEarnedMoney(finalRewardText);
    setEarnedXp(finalXp);
    if (finalXp > 0) {
      onAddXp(finalXp);
    }
    if (onAddCoins) {
      if (currentLevel === 15) onAddCoins(1500);
      else if (currentLevel >= 10) onAddCoins(600);
      else if (currentLevel >= 5) onAddCoins(250);
      else onAddCoins(80);
    }
  };

  // Walk Away
  const handleWalkAway = () => {
    if (currentLevel <= 1 || answerState !== 'idle') return;
    setIsTimerPaused(true);
    calculateFinalPrize(true);
    setGameStatus('walked_away');
  };

  // LIFELINE 1: 50:50
  const handleUse5050 = () => {
    if (!lifelines.fiftyFifty || !currentQuestion || answerState !== 'idle') return;
    millionaireAudio.play5050();

    const correct = currentQuestion.correctAnswer;
    const wrongIndices = [0, 1, 2, 3].filter((i) => i !== correct);
    // Shuffle and pick 2 to hide
    const shuffled = wrongIndices.sort(() => 0.5 - Math.random());
    const toHide = [shuffled[0], shuffled[1]];

    setHiddenOptions(toHide);
    setLifelines((prev) => ({ ...prev, fiftyFifty: false }));
  };

  // LIFELINE 2: Ask Audience
  const handleAskAudience = () => {
    if (!lifelines.askAudience || !currentQuestion || answerState !== 'idle') return;
    millionaireAudio.playLifeline();
    setIsTimerPaused(true);

    const correct = currentQuestion.correctAnswer;
    // Higher probability for audience on lower questions
    const correctChance = Math.max(45, 85 - currentLevel * 2.5);
    const remainder = 100 - correctChance;

    const r1 = Math.floor(Math.random() * (remainder - 10));
    const r2 = Math.floor(Math.random() * (remainder - r1 - 5));
    const r3 = remainder - r1 - r2;

    const wrongShares = [r1, r2, r3];
    let shareIdx = 0;

    const poll: { [key: number]: number } = {};
    for (let i = 0; i < 4; i++) {
      if (i === correct) {
        poll[i] = Math.round(correctChance);
      } else {
        poll[i] = wrongShares[shareIdx++] || 5;
      }
    }

    setAudiencePoll(poll);
    setLifelines((prev) => ({ ...prev, askAudience: false }));
  };

  // LIFELINE 3: Call Expert / Kiến Sáng FPT
  const handleCallExpert = () => {
    if (!lifelines.callExpert || !currentQuestion || answerState !== 'idle') return;
    millionaireAudio.playLifeline();
    setIsTimerPaused(true);

    setExpertModal(currentQuestion.expertAdvice);
    setLifelines((prev) => ({ ...prev, callExpert: false }));
  };

  // LIFELINE 4: Switch Question
  const handleSwitchQuestion = () => {
    if (!lifelines.switchQuestion || !currentQuestion || answerState !== 'idle') return;
    millionaireAudio.playLifeline();
    loadQuestionForLevel(currentLevel, true);
    setLifelines((prev) => ({ ...prev, switchQuestion: false }));
  };

  // Restart Game
  const handleRestart = () => {
    setCurrentLevel(1);
    setGameStatus('playing');
    setEarnedMoney('0 VNĐ');
    setEarnedXp(0);
    setLifelines({
      fiftyFifty: true,
      askAudience: true,
      callExpert: true,
      switchQuestion: true,
    });
    loadQuestionForLevel(1);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    millionaireAudio.isMuted = nextMute;
  };

  const currentPrize = PRIZE_LADDER.find((p) => p.level === currentLevel);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-700 bg-linear-to-b from-[#060b19] via-[#091535] to-[#040817] text-white p-4 sm:p-6 shadow-2xl space-y-6 select-none font-sans">
      {/* ================= STAGE TOP BAR ================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-blue-900/60 pb-4">
        {/* Title & Level Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 text-2xl font-black shrink-0 border border-amber-300/40">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-950 text-amber-400 border border-amber-600/40">
                Ai Là Triệu Phú Biển Đông
              </span>
              <span className="text-xs font-bold text-slate-400">Chuyên đề Địa lí 11</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              CÂU HỎI SỐ {currentLevel} / 15
            </h2>
          </div>
        </div>

        {/* 4 Classic Lifelines & Controls */}
        <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
          {/* Lifeline: 50:50 */}
          <button
            onClick={handleUse5050}
            disabled={!lifelines.fiftyFifty || answerState !== 'idle'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              lifelines.fiftyFifty && answerState === 'idle'
                ? 'bg-blue-950/80 hover:bg-blue-900 text-amber-300 border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 line-through cursor-not-allowed'
            }`}
            title="50:50 - Loại bỏ 2 phương án sai"
          >
            <Percent className="w-3.5 h-3.5" />
            <span>50:50</span>
          </button>

          {/* Lifeline: Ask Audience */}
          <button
            onClick={handleAskAudience}
            disabled={!lifelines.askAudience || answerState !== 'idle'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              lifelines.askAudience && answerState === 'idle'
                ? 'bg-blue-950/80 hover:bg-blue-900 text-sky-300 border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 line-through cursor-not-allowed'
            }`}
            title="Hỏi ý kiến khán giả trường quay"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Khán giả</span>
          </button>

          {/* Lifeline: Call Expert */}
          <button
            onClick={handleCallExpert}
            disabled={!lifelines.callExpert || answerState !== 'idle'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              lifelines.callExpert && answerState === 'idle'
                ? 'bg-blue-950/80 hover:bg-blue-900 text-emerald-300 border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 line-through cursor-not-allowed'
            }`}
            title="Gọi điện thoại cho Kiến Sáng FPT / Chuyên gia"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Kiến Sáng</span>
          </button>

          {/* Lifeline: Switch Question */}
          <button
            onClick={handleSwitchQuestion}
            disabled={!lifelines.switchQuestion || answerState !== 'idle'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              lifelines.switchQuestion && answerState === 'idle'
                ? 'bg-blue-950/80 hover:bg-blue-900 text-purple-300 border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 line-through cursor-not-allowed'
            }`}
            title="Đổi sang câu hỏi khác cùng bậc"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Đổi câu</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Walk Away Button */}
          {currentLevel > 1 && gameStatus === 'playing' && answerState === 'idle' && (
            <button
              onClick={handleWalkAway}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700/60 transition-all hover:scale-105"
              title="Dừng cuộc chơi và bảo toàn giải thưởng"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Dừng cuộc chơi</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= MAIN ARENA GRID (STAGE + PRIZE LADDER) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT ARENA: Question, Answers & Suspense Clock (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Suspense Countdown Timer & Safe Milestone Notice */}
          <div className="flex items-center justify-between bg-blue-950/40 p-3 rounded-2xl border border-blue-900/50">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>
                Mốc an toàn: {currentLevel <= 5 ? 'Câu 5 (1.000.000đ)' : currentLevel <= 10 ? 'Câu 10 (22.000.000đ)' : 'Câu 15 (150.000.000đ)'}
              </span>
            </div>

            {/* Circular Tension Clock */}
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timer <= 10 ? 'text-red-400 animate-pulse' : 'text-sky-400'}`} />
              <div
                className={`font-mono font-black text-sm px-3 py-0.5 rounded-full border ${
                  timer <= 10
                    ? 'bg-red-950 text-red-400 border-red-500 animate-pulse'
                    : 'bg-blue-950 text-sky-300 border-sky-600/40'
                }`}
              >
                {timer}s
              </div>
            </div>
          </div>

          {/* QUESTION BOX (Classic Diamond / Hexagon Metallic Frame) */}
          {currentQuestion && (
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500 via-blue-600 to-amber-500 rounded-3xl blur-sm opacity-40 group-hover:opacity-75 transition duration-500" />

              <div className="relative bg-linear-to-b from-[#0c1a40] to-[#08112c] p-6 sm:p-8 rounded-3xl border-2 border-amber-400/50 text-center shadow-2xl">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-900/80 text-blue-200 text-[11px] font-extrabold uppercase tracking-wider border border-blue-700/50 mb-3">
                  {currentQuestion.category}
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white leading-relaxed tracking-wide drop-shadow-md">
                  {currentQuestion.question}
                </h3>

                <div className="mt-4 text-xs font-bold text-amber-300 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Giải thưởng hiện tại: {currentPrize?.rewardText}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-400">+{currentPrize?.xpReward} XP</span>
                </div>
              </div>
            </div>
          )}

          {/* 4 ANSWER BUTTONS (A, B, C, D) */}
          {currentQuestion && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {currentQuestion.options.map((opt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isHidden = hiddenOptions.includes(idx);
                const isSelected = selectedOption === idx;
                const isCorrect = currentQuestion.correctAnswer === idx;

                let btnStyles =
                  'bg-linear-to-r from-[#0d1e4c] to-[#0a1638] text-slate-100 border-blue-900/80 hover:border-amber-400 hover:from-[#132c6e] hover:to-[#0f2150] shadow-md';

                if (isSelected) {
                  if (answerState === 'locked') {
                    btnStyles =
                      'bg-linear-to-r from-amber-600 to-orange-600 text-white border-amber-300 animate-pulse shadow-lg shadow-orange-500/30 font-black';
                  } else if (answerState === 'correct') {
                    btnStyles =
                      'bg-linear-to-r from-emerald-600 to-green-600 text-white border-green-300 shadow-xl shadow-emerald-500/40 font-black ring-2 ring-white';
                  } else if (answerState === 'wrong') {
                    btnStyles =
                      'bg-linear-to-r from-red-600 to-rose-700 text-white border-red-300 shadow-xl shadow-red-500/40 font-black';
                  }
                } else if (answerState === 'wrong' && isCorrect) {
                  // Reveal correct answer when user was wrong
                  btnStyles =
                    'bg-linear-to-r from-emerald-600 to-green-600 text-white border-green-300 animate-bounce shadow-xl shadow-emerald-500/40 font-black';
                }

                if (isHidden) {
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/30 text-slate-700 opacity-20 cursor-not-allowed select-none"
                    >
                      <span className="font-mono font-bold">{letter}:</span> [Đã loại trừ]
                    </div>
                  );
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={answerState !== 'idle'}
                    className={`relative p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-3 text-left group ${btnStyles} ${
                      answerState === 'idle' ? 'hover:scale-[1.02] active:scale-98 cursor-pointer' : ''
                    }`}
                  >
                    {/* Option Diamond Prefix (A:, B:, C:, D:) */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm shrink-0 border ${
                        isSelected
                          ? 'bg-white text-slate-900 border-white'
                          : 'bg-blue-950 text-amber-400 border-amber-400/40 group-hover:bg-amber-400 group-hover:text-slate-950'
                      }`}
                    >
                      {letter}
                    </div>

                    <span className="text-xs sm:text-sm font-semibold tracking-wide flex-1 leading-relaxed">
                      {opt}
                    </span>

                    {/* Feedback Icon */}
                    {isSelected && answerState === 'correct' && (
                      <CheckCircle2 className="w-5 h-5 text-white animate-spin shrink-0" style={{ animationDuration: '3s' }} />
                    )}
                    {isSelected && answerState === 'wrong' && (
                      <XCircle className="w-5 h-5 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Pedagogical Explanation Card when answered */}
          {explanationText && (
            <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-700 text-xs sm:text-sm space-y-1 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Lightbulb className="w-4 h-4" />
                <span>Giải thích khoa học (Địa lí 11):</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{explanationText}</p>
            </div>
          )}
        </div>

        {/* RIGHT ARENA: The Iconic 15-Prize Ladder (4 Cols) */}
        <div className="lg:col-span-4 bg-linear-to-b from-[#08122d] to-[#050c20] p-4 rounded-3xl border border-blue-900/60 shadow-xl space-y-1">
          <div className="flex items-center justify-between border-b border-blue-900/50 pb-2 mb-2">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              Thang Giải Thưởng
            </span>
            <span className="text-[10px] font-mono text-slate-400">15 CÂU HỎI</span>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[500px] pr-1 scrollbar-none">
            {PRIZE_LADDER.map((step) => {
              const isCurrent = step.level === currentLevel;
              const isPassed = step.level < currentLevel;

              let stepStyle = 'text-slate-400 bg-transparent hover:bg-blue-950/30';
              if (step.isSafeMilestone) {
                stepStyle = 'text-white font-extrabold bg-blue-900/40 border border-amber-400/30';
              }
              if (isPassed) {
                stepStyle = 'text-emerald-400 bg-emerald-950/20 line-through opacity-60';
              }
              if (isCurrent) {
                stepStyle =
                  'bg-linear-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-lg shadow-orange-500/30 scale-102 border-2 border-white animate-pulse';
              }

              return (
                <div
                  key={step.level}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${stepStyle}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[11px] w-5 text-right font-bold ${
                        isCurrent ? 'text-slate-950' : step.isSafeMilestone ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    >
                      {step.level}
                    </span>
                    {isCurrent && <ChevronRight className="w-3.5 h-3.5 text-slate-950" />}
                    <span className="font-semibold">{step.rewardText}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isCurrent ? 'text-slate-950' : 'text-slate-500'
                    }`}
                  >
                    +{step.xpReward} XP
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MODAL: AUDIENCE POLL (KHÁN GIẢ) ================= */}
      {audiencePoll && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-linear-to-b from-slate-900 to-blue-950 p-6 rounded-3xl border-2 border-sky-500 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-sky-800 pb-3">
              <div className="flex items-center gap-2 text-sky-400">
                <Users className="w-5 h-5" />
                <h4 className="font-black text-lg text-white">Ý Kiến Khán Giả Trường Quay</h4>
              </div>
              <button
                onClick={() => {
                  setAudiencePoll(null);
                  setIsTimerPaused(false);
                }}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              100 khán giả tại trường quay đã đồng loạt biểu quyết phương án của mình:
            </p>

            {/* Bars */}
            <div className="grid grid-cols-4 gap-3 pt-4 items-end h-44">
              {[0, 1, 2, 3].map((idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const pct = audiencePoll[idx] || 0;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-xs font-black text-sky-300 font-mono">{pct}%</span>
                    <div className="w-full bg-slate-800 rounded-t-xl overflow-hidden h-32 flex items-end p-1">
                      <div
                        className="w-full bg-linear-to-t from-sky-600 to-amber-400 rounded-t-lg transition-all duration-1000"
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono font-black text-sm text-white">{letter}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setAudiencePoll(null);
                setIsTimerPaused(false);
              }}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-xs text-white shadow-lg transition-colors mt-2"
            >
              Cảm ơn khán giả, tiếp tục cuộc chơi!
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: CALL EXPERT / KIẾN SÁNG ================= */}
      {expertModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-linear-to-b from-slate-900 to-blue-950 p-6 rounded-3xl border-2 border-emerald-500 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <PhoneCall className="w-5 h-5" />
                <h4 className="font-black text-lg text-white">Trợ Giúp Từ Chuyên Gia</h4>
              </div>
              <button
                onClick={() => {
                  setExpertModal(null);
                  setIsTimerPaused(false);
                }}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 bg-emerald-950/60 p-3 rounded-2xl border border-emerald-700/50">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-bold shrink-0 border border-white/30">
                🐜
              </div>
              <div>
                <h5 className="font-black text-sm text-white">{expertModal.expert}</h5>
                <p className="text-[11px] text-emerald-300">Độ tin cậy ước tính: {expertModal.confidence}%</p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-200 leading-relaxed italic">
              "{expertModal.advice}"
            </div>

            <button
              onClick={() => {
                setExpertModal(null);
                setIsTimerPaused(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg transition-colors"
            >
              Tôi đã hiểu, xin cảm ơn!
            </button>
          </div>
        </div>
      )}

      {/* ================= GAME OVER / VICTORY MODAL ================= */}
      {gameStatus !== 'playing' && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-linear-to-b from-slate-900 via-blue-950 to-slate-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-400 max-w-lg w-full text-center space-y-5 shadow-2xl animate-in zoom-in-90 duration-300">
            {/* Header Icon */}
            <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-4xl mx-auto shadow-xl shadow-orange-500/30 border-2 border-amber-300">
              {gameStatus === 'won' ? '👑' : gameStatus === 'walked_away' ? '💰' : '🎖️'}
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {gameStatus === 'won'
                  ? 'VINH QUANG ĐỈNH CAO'
                  : gameStatus === 'walked_away'
                  ? 'BẢO TOÀN THẮNG LỢI'
                  : 'KẾT THÚC CHẶNG ĐUA'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {gameStatus === 'won'
                  ? 'ĐẠI SỨ TRIỆU PHÚ BIỂN ĐÔNG!'
                  : gameStatus === 'walked_away'
                  ? 'QUYẾT ĐỊNH DỪNG CUỘC CHƠI AN TOÀN!'
                  : 'CHÚC BẠN MAY MẮN LẦN SAU!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                {gameStatus === 'won'
                  ? 'Bạn đã xuất sắc vượt qua toàn bộ 15 câu hỏi chuyên sâu của chương trình Địa lí 11!'
                  : `Bạn dừng lại ở Câu số ${currentLevel}. Hãy tự hào với kho tàng tri thức Biển Đông bạn đã tích lũy!`}
              </p>
            </div>

            {/* Prize summary badge */}
            <div className="bg-blue-950/80 p-4 rounded-2xl border border-blue-700/80 space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase">Giải thưởng đạt được:</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                {earnedMoney}
              </div>
              <div className="flex items-center justify-center gap-3 text-xs font-bold">
                <span className="text-emerald-400">+{earnedXp} XP</span>
                <span className="text-amber-300 font-black">
                  +{gameStatus === 'won' ? 300 : currentLevel > 10 ? 120 : currentLevel > 5 ? 50 : 15} Xu Biển Đông 🪙
                </span>
              </div>
            </div>

            {/* Play Again & Shop Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleRestart}
                className="flex-1 py-3.5 rounded-2xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi Lại Từ Đầu</span>
              </button>
              {onOpenShop && (
                <button
                  onClick={onOpenShop}
                  className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 font-black text-sm transition-all flex items-center justify-center gap-2"
                >
                  🛍️ Đến Shop Kiến Sáng
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
