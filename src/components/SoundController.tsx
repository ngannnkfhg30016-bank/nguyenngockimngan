import React, { useState, useEffect, useRef } from 'react';
import { soundManager, BgmMode } from '../utils/soundManager';
import {
  Volume2,
  VolumeX,
  Music,
  Waves,
  Sparkles,
  Sliders,
  Check,
  X,
  Play,
  Pause,
} from 'lucide-react';

export const SoundController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(soundManager.getStatus());
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe(() => {
      setStatus(soundManager.getStatus());
    });
    return unsubscribe;
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const bgmModes: { id: BgmMode; label: string; icon: string; desc: string }[] = [
    {
      id: 'ocean_harmony',
      label: 'Hòa Âm Đại Dương',
      icon: '🎼',
      desc: 'Kết hợp sóng biển rì rào và giai điệu du dương',
    },
    {
      id: 'ocean_waves',
      label: 'Sóng Biển Êm Đềm',
      icon: '🌊',
      desc: 'Tiếng sóng biển vỗ bờ tự nhiên, thư giãn sâu',
    },
    {
      id: 'peaceful_melody',
      label: 'Giai Điệu Biển Xanh',
      icon: '🎵',
      desc: 'Hợp âm ngũ cung thanh thoát, tập trung học tập',
    },
  ];

  return (
    <div className="relative" ref={panelRef}>
      {/* Sound Toggle Button in Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
          status.isPlaying && !status.isBgmMuted
            ? 'bg-sky-500/15 border-sky-400 text-sky-800 shadow-xs'
            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
        }`}
        title="Cài đặt Âm thanh nền & Âm thanh tương tác"
      >
        {status.isPlaying && !status.isBgmMuted ? (
          <div className="flex items-center gap-1">
            <span className="text-sm">🌊</span>
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-sky-600 h-2 animate-pulse"></span>
              <span className="w-0.5 bg-sky-600 h-3.5 animate-pulse delay-75"></span>
              <span className="w-0.5 bg-sky-600 h-1.5 animate-pulse delay-150"></span>
            </div>
            <span className="hidden xl:inline text-[11px] font-extrabold text-sky-800">
              Nhạc biển
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-500">
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline text-[11px]">Âm thanh</span>
          </div>
        )}
      </button>

      {/* Popover Control Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800 text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎧</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Trung Tâm Âm Thanh</h4>
                <p className="text-[11px] text-slate-500">Âm thanh nền & Hiệu ứng nút bấm</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: Background Ambient Audio */}
          <div className="space-y-3 bg-sky-50/60 p-3 rounded-2xl border border-sky-100 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-black text-slate-900">
                <Waves className="w-4 h-4 text-sky-600" />
                <span>Âm Thanh Nền Thư Giãn</span>
              </div>

              {/* Main Play/Pause Button */}
              <button
                onClick={() => {
                  soundManager.toggleBgm();
                  soundManager.playButtonClick();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  status.isPlaying && !status.isBgmMuted
                    ? 'bg-sky-600 hover:bg-sky-700 text-white'
                    : 'bg-white hover:bg-sky-100 text-sky-800 border border-sky-300'
                }`}
              >
                {status.isPlaying && !status.isBgmMuted ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Đang phát</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Bật nhạc</span>
                  </>
                )}
              </button>
            </div>

            {/* Mode selection buttons */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Giai điệu đại dương:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {bgmModes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      soundManager.setBgmMode(m.id);
                      if (!status.isPlaying) soundManager.startBgm();
                      soundManager.playButtonClick();
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      status.bgmMode === m.id
                        ? 'bg-white border-sky-500 shadow-xs ring-1 ring-sky-400'
                        : 'bg-white/60 hover:bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{m.icon}</span>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{m.label}</div>
                        <div className="text-[10px] text-slate-500">{m.desc}</div>
                      </div>
                    </div>
                    {status.bgmMode === m.id && (
                      <Check className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* BGM Volume Slider */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-sky-600" /> Âm lượng nhạc nền:
                </span>
                <span className="font-bold text-sky-700">
                  {Math.round(status.bgmVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={status.bgmVolume}
                onChange={(e) => soundManager.setBgmVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          {/* Section 2: Interactive Button SFX */}
          <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Hiệu Ứng Nút Bấm & Phản Hồi</span>
              </div>

              {/* Mute/Unmute SFX Toggle */}
              <button
                onClick={() => {
                  soundManager.setSfxMuted(!status.isSfxMuted);
                  if (status.isSfxMuted) soundManager.playPop();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  status.isSfxMuted
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {status.isSfxMuted ? 'Đang tắt' : 'Đang bật'}
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              Phát âm thanh click nhẹ nhàng khi ấn nút, chuyển trang và nhận phần thưởng.
            </p>

            {/* Test SFX buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => soundManager.playButtonClick()}
                className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 font-semibold text-[11px] text-slate-700 text-center transition-colors cursor-pointer"
              >
                🔘 Thử Click
              </button>
              <button
                onClick={() => soundManager.playCoinReward()}
                className="flex-1 py-1.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 font-bold text-[11px] text-amber-900 text-center transition-colors cursor-pointer"
              >
                🪙 Thử Keng Xu
              </button>
              <button
                onClick={() => soundManager.playSuccessChime()}
                className="flex-1 py-1.5 px-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 font-bold text-[11px] text-sky-900 text-center transition-colors cursor-pointer"
              >
                ✨ Thử Chúc Mừng
              </button>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="mt-3 pt-2 text-[10px] text-slate-400 text-center">
            💡 Âm thanh tổng hợp thuần Web Audio API, giúp học tập sinh động và thư giãn.
          </div>
        </div>
      )}
    </div>
  );
};
