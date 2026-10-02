import React, { useEffect } from 'react';
import { triggerFireworks, triggerStarBurst } from '../utils/fireworks';
import { soundManager } from '../utils/soundManager';
import { KienSangMascot } from './KienSangMascot';
import {
  Sparkles,
  Trophy,
  Award,
  CheckCircle2,
  X,
  Coins,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export interface CelebrationEvent {
  type: 'chapter' | 'badge';
  title: string;
  name: string;
  desc?: string;
  icon?: string;
  xpReward: number;
  coinReward: number;
}

interface CelebrationModalProps {
  event: CelebrationEvent | null;
  onClose: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToShop?: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  event,
  onClose,
  onNavigateToProfile,
  onNavigateToShop,
}) => {
  // Fire fireworks and play celebration audio whenever a new celebration event triggers
  useEffect(() => {
    if (event) {
      triggerFireworks(3200);
      triggerStarBurst();
      soundManager.playSuccessChime();
      setTimeout(() => {
        soundManager.playCoinReward();
      }, 500);
    }
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden relative text-center animate-in zoom-in-95 duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 pt-8 relative overflow-hidden">
          {/* Background Sparkles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-around text-4xl">
            <span>✨</span>
            <span>🎆</span>
            <span>⭐</span>
            <span>🎉</span>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-xs font-black uppercase tracking-wider text-amber-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
              <span>{event.title}</span>
            </div>

            {/* Mascot & Icon Badge */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border-2 border-white/40 animate-bounce duration-1000">
                {event.icon || (event.type === 'badge' ? '🎖️' : '📚')}
              </div>
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 overflow-hidden p-1 shadow-inner">
                <KienSangMascot state="celebrating" size={68} animated={true} />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white pt-2 leading-tight">
              {event.name}
            </h3>

            {event.desc && (
              <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-sm mx-auto">
                {event.desc}
              </p>
            )}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="p-6 space-y-5 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Phần Thưởng Đạt Được
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {/* XP Box */}
            <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 shadow-2xs flex flex-col items-center">
              <div className="flex items-center gap-1 text-orange-600 font-black text-lg">
                <Sparkles className="w-5 h-5 fill-current" />
                <span>+{event.xpReward}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-0.5">Điểm kinh nghiệm XP</span>
            </div>

            {/* Coins Box */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-800 font-black text-lg">
                <span className="text-xl">🪙</span>
                <span>+{event.coinReward}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-0.5">Xu Biển Đông</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 italic">
            "Kiến Sáng chúc mừng bạn! Kiến thức đại dương của bạn ngày càng phong phú và vững vàng."
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onClose();
                soundManager.playPop();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm shadow-md shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <span>Tiếp Tục Khám Phá 🚀</span>
            </button>

            {event.type === 'badge' && onNavigateToProfile && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToProfile();
                  soundManager.playTabSwitch();
                }}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Chiêm ngưỡng Huy hiệu trong Hồ sơ cá nhân</span>
              </button>
            )}

            {event.type === 'chapter' && onNavigateToShop && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToShop();
                  soundManager.playPop();
                }}
                className="w-full py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Dùng {event.coinReward} Xu sắm trang phục Kiến Sáng 🛍️</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
