import React, { useState } from 'react';
import { curriculumPillars } from '../data/curriculumData';
import { GradeLevel, KnowledgePillar } from '../types';
import { MindMapViewer } from '../components/MindMapViewer';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Fish,
  Globe2,
  Anchor,
  HelpCircle,
  Award,
} from 'lucide-react';
import { triggerFireworks, triggerStarBurst } from '../utils/fireworks';
import { soundManager } from '../utils/soundManager';

interface LearnPageProps {
  gradeLevel: GradeLevel;
  currentGrade: number;
  initialSectionId?: string;
  onAddXp: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
  completedPillars?: string[];
  onCompletePillar?: (pillarId: string, pillarTitle: string) => void;
  onUnlockBadge?: (badgeId: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  gradeLevel,
  currentGrade,
  initialSectionId,
  onAddXp,
  onAddCoins,
  completedPillars: propCompletedPillars,
  onCompletePillar,
  onUnlockBadge,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(
    initialSectionId || curriculumPillars[0].id
  );
  const [localCompletedPillars, setLocalCompletedPillars] = useState<string[]>([]);
  const completedPillars = propCompletedPillars || localCompletedPillars;
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const activePillar =
    curriculumPillars.find((p) => p.id === selectedPillarId) || curriculumPillars[0];

  const handleSelectPillar = (id: string) => {
    setSelectedPillarId(id);
    setQuizAnswerSelected(null);
    setIsQuizSubmitted(false);
  };

  const handleCompletePillar = () => {
    if (!completedPillars.includes(activePillar.id)) {
      setLocalCompletedPillars((prev) => [...prev, activePillar.id]);
      if (onCompletePillar) {
        onCompletePillar(activePillar.id, activePillar.title);
      } else {
        triggerFireworks(3200);
        triggerStarBurst();
        soundManager.playSuccessChime();
        onAddXp(50);
        onAddCoins?.(150);
      }

      // Khi người học hoàn thành trọn bộ 5 chương học, mở khóa huy hiệu Chuyên Gia Khám Phá!
      if (completedPillars.length + 1 >= curriculumPillars.length && onUnlockBadge) {
        setTimeout(() => {
          onUnlockBadge('explorer');
        }, 1500);
      }
    }
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'location':
        return <Globe2 className="w-5 h-5" />;
      case 'resources':
        return <Fish className="w-5 h-5" />;
      case 'cooperation':
        return <ShieldCheck className="w-5 h-5" />;
      case 'cause-effect':
        return <ArrowRight className="w-5 h-5" />;
      case 'vietnam':
        return <span className="text-base">🇻🇳</span>;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Giáo Trình Số Hóa Chuyên Đề Địa Lí 11 – GDPT 2018
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Chuyên Đề 11.1: Một Số Vấn Đề Về Biển Đông
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Nội dung được cấu trúc thành 5 trụ cột chuẩn xác, kèm số liệu thống kê và sơ đồ tư duy logic.
          </p>
        </div>

        {/* Learning Progress Badge */}
        <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 px-4 py-2.5 rounded-2xl self-start md:self-auto shadow-2xs">
          <Award className="w-5 h-5 text-sky-600" />
          <div className="text-xs">
            <div className="font-bold text-slate-900">
              Đã hoàn thành: {completedPillars.length}/5 bài học
            </div>
            <div className="text-sky-700 font-semibold mt-0.5">
              +{completedPillars.length * 50} XP tích lũy
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Menu (5 Pillars) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
            Mục lục chuyên đề:
          </span>

          <div className="space-y-2">
            {curriculumPillars.map((pillar, idx) => {
              const isActive = selectedPillarId === pillar.id;
              const isDone = completedPillars.includes(pillar.id);

              return (
                <button
                  key={pillar.id}
                  onClick={() => handleSelectPillar(pillar.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-sky-500 shadow-md shadow-sky-600/25 scale-[1.01]'
                      : 'bg-white hover:bg-sky-50/60 text-slate-800 border-sky-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-600'
                      }`}
                    >
                      {getPillarIcon(pillar.id)}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isActive ? 'text-sky-100' : 'text-slate-400'
                        }`}
                      >
                        Trụ cột {idx + 1}
                      </div>
                      <div className="font-extrabold text-sm mt-0.5 leading-snug">
                        {pillar.title}
                      </div>
                      <div
                        className={`text-xs mt-1 line-clamp-1 ${
                          isActive ? 'text-sky-100' : 'text-slate-500'
                        }`}
                      >
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>

                  {isDone && (
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? 'text-white' : 'text-emerald-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Content Box */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* Header of Active Pillar */}
          <div className="border-b border-slate-200 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Chuyên đề Địa lí 11 – GDPT 2018
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activePillar.title}
            </h2>
            <p className="text-sm font-semibold text-orange-600 mt-1">
              {activePillar.subtitle}
            </p>
          </div>

          {/* Adapted description for current Grade Level */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 block mb-1">
              {gradeLevel === 'tieuhoc'
                ? '🐜 Lời nhắn của Kiến Sáng cho Tiểu học:'
                : gradeLevel === 'thcs'
                ? '🐜 Hướng dẫn tiếp cận cho THCS:'
                : '🐜 Phân tích học thuật cho THPT Lớp 11:'}
            </strong>
            {activePillar.adaptedSummary[gradeLevel]}
          </div>

          {/* Key Numerical Fact Highlights */}
          {activePillar.keyFacts && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Số liệu & Thông tin then chốt:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePillar.keyFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-200/80 flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5"></span>
                    <span className="text-xs sm:text-sm text-slate-800 font-medium">
                      {fact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Sections breakdown */}
          <div className="space-y-6 pt-2">
            {activePillar.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 text-xs font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  {sec.heading}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed">{sec.content}</p>

                {sec.bulletPoints && (
                  <ul className="space-y-2 pt-1">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <span className="text-orange-500 font-bold shrink-0 mt-0.5">✔</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Special Visual: Cause-Effect Chain if on Pillar 4 */}
          {activePillar.id === 'cause-effect' && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-4">
              <h4 className="font-bold text-base text-amber-300 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Mô Hình Nhân Quả: Phát Triển Biển Đông Bền Vững
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs font-bold">
                <div className="bg-white/10 p-3 rounded-xl border border-white/20 w-full sm:w-auto">
                  Hợp tác hòa bình
                </div>
                <span className="text-amber-400 text-lg">➔</span>
                <div className="bg-white/10 p-3 rounded-xl border border-white/20 w-full sm:w-auto">
                  Khai thác hợp lí
                </div>
                <span className="text-amber-400 text-lg">➔</span>
                <div className="bg-white/10 p-3 rounded-xl border border-white/20 w-full sm:w-auto">
                  Phát triển kinh tế
                </div>
                <span className="text-amber-400 text-lg">➔</span>
                <div className="bg-white/10 p-3 rounded-xl border border-white/20 w-full sm:w-auto">
                  Bảo vệ môi trường
                </div>
                <span className="text-amber-400 text-lg">➔</span>
                <div className="bg-emerald-500 text-white p-3 rounded-xl w-full sm:w-auto shadow-md">
                  Bền vững
                </div>
              </div>
            </div>
          )}

          {/* Completion button & Quick jump to Mind Map */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href="#mindmap-section"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>🧠 Sơ đồ tư duy tổng hợp ở cuối trang</span>
              <ChevronRight className="w-4 h-4 text-sky-600" />
            </a>

            <button
              onClick={handleCompletePillar}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                completedPillars.includes(activePillar.id)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 hover:scale-[1.02]'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {completedPillars.includes(activePillar.id)
                  ? 'Đã ghi nhận bài học (+50 XP, +150 Xu)'
                  : 'Đánh dấu đã hoàn thành (+50 XP, +150 Xu 🪙)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SƠ ĐỒ TƯ DUY HỆ THỐNG HÓA TOÀN BỘ KIẾN THỨC Ở CUỐI MỤC HỌC TẬP */}
      {/* ============================================================== */}
      <div className="space-y-4 pt-4">
        {/* Visual Banner */}
        <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 text-white p-6 sm:p-7 rounded-3xl shadow-md border border-sky-400 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-100">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              Hệ Thống Hóa Trực Quan – SGK Chuyên Đề Địa Lí 11 Mới (GDPT 2018)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white">
              Sơ Đồ Tư Duy Hệ Thống Hóa Toàn Bộ Kiến Thức
            </h2>
            <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl leading-relaxed">
              Sau khi hoàn thành nội dung bài đọc, sơ đồ tư duy trực quan dưới đây tổng hợp cô đọng toàn bộ 5 trụ cột kiến thức cốt lõi của Chuyên đề Biển Đông. Học sinh có thể tương tác chọn từng nhánh, xem sơ đồ khối hoặc tra cứu từ khóa thi nhanh.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-xs p-4 rounded-2xl border border-white/30 text-center shrink-0 self-start md:self-auto">
            <span className="text-2xl block mb-0.5">💡</span>
            <div className="text-xs font-bold text-white">Dễ Nhớ • Dễ Thuộc</div>
            <div className="text-[10px] text-sky-100 font-medium">Chuẩn SGK 11 mới</div>
          </div>
        </div>

        {/* The Mind Map Viewer Component */}
        <MindMapViewer
          pillarId="all"
          onSelectPillar={(id) => {
            handleSelectPillar(id);
            // Optionally scroll up smoothly if clicked on sub-pillar
          }}
          showAllOption={true}
        />
      </div>
    </div>
  );
};
