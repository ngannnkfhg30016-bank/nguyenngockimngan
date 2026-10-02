import React, { useState } from 'react';
import { challengeQuizzes, QuizQuestion } from '../data/quizData';
import { GradeLevel } from '../types';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChallengesPageProps {
  gradeLevel: GradeLevel;
  currentGrade: number;
  onAddXp: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onAddCoins?: (amount: number) => void;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({
  gradeLevel,
  currentGrade,
  onAddXp,
  onUnlockBadge,
  onAddCoins,
}) => {
  const [activeLevel, setActiveLevel] = useState<GradeLevel>(gradeLevel);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Filter quizzes for the active grade level
  const questions = challengeQuizzes.filter((q) => q.gradeLevel === activeLevel);
  const currentQ: QuizQuestion | undefined = questions[currentIdx] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 20);
      onAddXp(20);
      onAddCoins?.(35);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
      onUnlockBadge('master');
      onAddCoins?.(300);
    }
  };

  const resetQuiz = (lvl?: GradeLevel) => {
    if (lvl) setActiveLevel(lvl);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-sky-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-sky-700 uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-sky-600" />
            Đấu Trường Tri Thức – Kiểm Tra Phân Hóa Cấp Học
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Thử Thách Trắc Nghiệm Biển Đông
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Câu hỏi được thiết kế theo 3 cấp độ nhận thức bám sát chương trình GDPT 2018.
          </p>
        </div>

        {/* Grade switchers */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold self-start md:self-auto">
          {(['tieuhoc', 'thcs', 'thpt'] as GradeLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => resetQuiz(lvl)}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeLevel === lvl
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl === 'tieuhoc' ? 'Tiểu học' : lvl === 'thcs' ? 'THCS' : 'THPT (Lớp 11) ⭐'}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz arena card */}
      {!isFinished && currentQ ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-150 shadow-xs space-y-6">
          {/* Progress Bar & Counter */}
          <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-500">
            <span>
              Câu hỏi {currentIdx + 1} / {questions.length}
            </span>
            <span className="bg-sky-100 text-sky-800 font-black px-3 py-1 rounded-full border border-sky-200">
              Điểm: {score} XP
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question text */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === currentQ.correctIndex;

              let styleClasses =
                'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  styleClasses = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  styleClasses = 'bg-red-50 border-red-500 text-red-950 font-bold';
                } else {
                  styleClasses = 'bg-slate-50 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${styleClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when answered */}
          {isAnswered && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                Kiến Sáng giải thích đáp án:
              </div>
              <p className="text-slate-800 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <span>
                  {currentIdx + 1 < questions.length ? 'Câu hỏi tiếp theo' : 'Xem kết quả'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-sky-200 shadow-xs text-center space-y-6">
          <span className="text-7xl">🏆</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Hoàn Thành Đấu Trường Tri Thức!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Bạn đã xuất sắc đạt được <strong className="text-sky-600 text-lg font-black">{score} XP</strong> trong thử thách này!
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => resetQuiz()}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 cursor-pointer"
            >
              Làm lại thử thách
            </button>
            <button
              onClick={() => resetQuiz(activeLevel === 'thpt' ? 'thcs' : 'thpt')}
              className="px-6 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-sm border border-sky-200 cursor-pointer"
            >
              Thử sức cấp độ khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
