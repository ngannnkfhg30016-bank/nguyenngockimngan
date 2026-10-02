import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Heart,
  Zap,
  Play,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { millionaireAudio } from '../../utils/millionaireAudio';

interface FloatingTarget {
  id: number;
  type: 'plastic' | 'ghost_net' | 'oil_slick' | 'coral_branch' | 'turtle';
  label: string;
  icon: string;
  points: number;
  healthDelta: number;
  x: number; // percentage
  y: number; // percentage
  speedX: number;
  speedY: number;
}

const SPAWN_TYPES: {
  type: FloatingTarget['type'];
  label: string;
  icon: string;
  points: number;
  healthDelta: number;
}[] = [
  { type: 'plastic', label: 'Chai nhựa trôi nổi', icon: '🧴', points: 15, healthDelta: 4 },
  { type: 'plastic', label: 'Túi nilon rác thải', icon: '🛍️', points: 15, healthDelta: 4 },
  { type: 'ghost_net', label: 'Lưới ma bỏ hoang', icon: '🕸️', points: 20, healthDelta: 6 },
  { type: 'oil_slick', label: 'Vệt dầu tràn', icon: '🛢️', points: 25, healthDelta: 8 },
  { type: 'coral_branch', label: 'Cành san hô non cần cấy', icon: '🪸', points: 30, healthDelta: 10 },
  { type: 'turtle', label: 'Rùa biển (ĐỪNG NHẤP!)', icon: '🐢', points: -20, healthDelta: -8 },
];

interface MarineRescueGameProps {
  onAddXp: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenShop?: () => void;
}

export const MarineRescueGame: React.FC<MarineRescueGameProps> = ({
  onAddXp,
  onAddCoins,
  onUnlockBadge,
  onOpenShop,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(40);
  const [targets, setTargets] = useState<FloatingTarget[]>([]);
  const [score, setScore] = useState<number>(0);
  const [oceanHealth, setOceanHealth] = useState<number>(45);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [rescuedCount, setRescuedCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const nextIdRef = useRef<number>(1);

  // Spawn new target
  const spawnTarget = () => {
    const template = SPAWN_TYPES[Math.floor(Math.random() * SPAWN_TYPES.length)];
    const newTarget: FloatingTarget = {
      id: nextIdRef.current++,
      type: template.type,
      label: template.label,
      icon: template.icon,
      points: template.points,
      healthDelta: template.healthDelta,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    };
    setTargets((prev) => [...prev.slice(-10), newTarget]);
  };

  // Start game
  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(40);
    setScore(0);
    setOceanHealth(45);
    setStreak(0);
    setMaxStreak(0);
    setRescuedCount(0);
    setIsGameOver(false);
    setTargets([]);
    millionaireAudio.playPowerup();

    // Initial batch of targets
    for (let i = 0; i < 5; i++) {
      spawnTarget();
    }
  };

  // Main game loop (Timer & Target movements & Spawning)
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    // Countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Game Over!
          setIsGameOver(true);
          setIsPlaying(false);
          millionaireAudio.playPowerup();
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          onAddXp(Math.max(30, Math.floor(score / 2)));
          if (onAddCoins) {
            onAddCoins(Math.max(20, Math.floor(score / 3)));
          }
          onUnlockBadge('protector');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    // Spawning interval
    const spawnInterval = setInterval(() => {
      setTargets((prev) => {
        if (prev.length < 8) {
          const template = SPAWN_TYPES[Math.floor(Math.random() * SPAWN_TYPES.length)];
          const newTarget: FloatingTarget = {
            id: nextIdRef.current++,
            type: template.type,
            label: template.label,
            icon: template.icon,
            points: template.points,
            healthDelta: template.healthDelta,
            x: 8 + Math.random() * 84,
            y: 12 + Math.random() * 76,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
          };
          return [...prev, newTarget];
        }
        return prev;
      });
    }, 1200);

    // Float drift animation
    const driftInterval = setInterval(() => {
      setTargets((prev) =>
        prev.map((target) => {
          let nx = target.x + target.speedX;
          let ny = target.y + target.speedY;
          let nsx = target.speedX;
          let nsy = target.speedY;

          // Bounce off boundary
          if (nx < 5 || nx > 90) nsx = -nsx;
          if (ny < 10 || ny > 85) nsy = -nsy;

          return { ...target, x: nx, y: ny, speedX: nsx, speedY: nsy };
        })
      );
    }, 100);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      clearInterval(driftInterval);
    };
  }, [isPlaying, isGameOver, score, onAddXp, onUnlockBadge]);

  // Click on target
  const handleTargetClick = (target: FloatingTarget, e: React.MouseEvent) => {
    e.stopPropagation();

    // Remove from screen
    setTargets((prev) => prev.filter((t) => t.id !== target.id));

    if (target.type === 'turtle') {
      // Penalty! Clicked innocent turtle
      millionaireAudio.playWrong();
      setStreak(0);
      setScore((s) => Math.max(0, s + target.points));
      setOceanHealth((h) => Math.max(0, h + target.healthDelta));
    } else {
      // Good action!
      if (target.type === 'coral_branch' || target.type === 'oil_slick') {
        millionaireAudio.playMatchSuccess();
      } else {
        millionaireAudio.playPop();
      }

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const comboMultiplier = newStreak >= 5 ? 2 : newStreak >= 3 ? 1.5 : 1;
      const ptsGained = Math.round(target.points * comboMultiplier);

      setScore((s) => s + ptsGained);
      setOceanHealth((h) => Math.min(100, h + target.healthDelta));
      setRescuedCount((c) => c + 1);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Bảo Tồn Rạn San Hô & Hành Động Khẩn Cấp • GDPT 2018
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            🪸 Biệt Đội Cứu Hộ & Tái Sinh Rạn San Hô
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Nhấp thật nhanh để thu gom rác nhựa, quây hút dầu loang và cấy ghép cành san hô non! Tránh nhấp vào rùa biển!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isPlaying && (
            <div className="flex items-center gap-2 bg-sky-100 text-sky-900 px-3.5 py-2 rounded-2xl text-xs font-bold font-mono">
              <Clock className="w-4 h-4 text-sky-600" />
              {timeLeft}s
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            Điểm làm sạch: <span className="text-emerald-600 text-base font-black">{score} XP</span>
          </div>

          {isPlaying && (
            <button
              onClick={startGame}
              className="p-2.5 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 border border-slate-200"
              title="Chơi lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Ocean Health Meter & Combo status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Sức khỏe rạn san hô Biển Đông
            </span>
            <span className="font-mono font-black text-emerald-600">{oceanHealth}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                oceanHealth >= 70
                  ? 'bg-emerald-500'
                  : oceanHealth >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${oceanHealth}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700 space-y-0.5">
            <div>Đã xử lý thành công:</div>
            <div className="text-sm font-black text-slate-900">{rescuedCount} đối tượng ô nhiễm</div>
          </div>
          {streak > 2 && (
            <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-black animate-pulse">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              Combo x{streak}!
            </div>
          )}
        </div>
      </div>

      {/* Interactive Ocean Tank Stage */}
      <div className="relative w-full h-96 sm:h-[420px] rounded-3xl overflow-hidden border-2 border-sky-600/40 bg-linear-to-b from-sky-600 via-sky-800 to-indigo-950 shadow-inner select-none cursor-crosshair">
        {/* Undersea ambient effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#38bdf8_0,transparent_70%)] opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-slate-950/80 to-transparent pointer-events-none" />

        {/* Coral reef silhouettes at bottom */}
        <div className="absolute bottom-2 inset-x-4 flex justify-between items-end opacity-40 pointer-events-none text-4xl sm:text-5xl">
          <span>🪸</span>
          <span>🌿</span>
          <span>🪸</span>
          <span>🫧</span>
          <span>🪸</span>
          <span>🌿</span>
          <span>🪸</span>
        </div>

        {!isPlaying && !isGameOver && (
          /* Start Overlay */
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 z-40">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-lg animate-bounce">
              🪸
            </div>
            <h3 className="text-2xl font-black">Sẵn Sàng Cứu Hộ Rạn San Hô?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              Bạn có 40 giây. Nhấp nhanh vào các mảnh chai nhựa, vệt dầu loang và lưới ma. Cấy ghép cành san hô non để phục hồi sinh thái! Tuyệt đối không nhấp rùa biển!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-xl transition-all flex items-center gap-2 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" /> Bắt Đầu Cứu Hộ
            </button>
          </div>
        )}

        {isGameOver && (
          /* Game Over Overlay */
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4 z-40 animate-fade-in">
            <div className="text-5xl">🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black">Hết Giờ! Hoàn Thành Xuất Sắc!</h3>
            <p className="text-xs sm:text-sm text-emerald-300 max-w-md">
              Bạn đã giải cứu đại dương với điểm số {score} XP và nâng độ khỏe rạn san hô lên {oceanHealth}%!
            </p>
            <div className="grid grid-cols-4 gap-2 bg-white/10 p-3.5 rounded-2xl text-center max-w-sm w-full text-xs">
              <div>
                <div className="text-slate-400">Thu gom</div>
                <div className="text-lg font-black text-white">{rescuedCount}</div>
              </div>
              <div>
                <div className="text-slate-400">Xu Biển</div>
                <div className="text-lg font-black text-amber-400">+{Math.max(20, Math.floor(score / 3))} 🪙</div>
              </div>
              <div>
                <div className="text-slate-400">Combo đỉnh</div>
                <div className="text-lg font-black text-amber-400">x{maxStreak}</div>
              </div>
              <div>
                <div className="text-slate-400">Huy hiệu</div>
                <div className="text-lg font-black text-emerald-400">Vệ Binh 🪸</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <button
                onClick={startGame}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-lg transition-all"
              >
                Chơi Lại Lượt Mới
              </button>
              {onOpenShop && (
                <button
                  onClick={onOpenShop}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all"
                >
                  🛍️ Shop Kiến Sáng
                </button>
              )}
            </div>
          </div>
        )}

        {/* Floating targets */}
        {isPlaying &&
          targets.map((target) => (
            <button
              key={target.id}
              onClick={(e) => handleTargetClick(target, e)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl backdrop-blur-xs border transition-transform duration-100 hover:scale-125 active:scale-90 flex items-center gap-1.5 shadow-lg group cursor-pointer ${
                target.type === 'turtle'
                  ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-200 animate-pulse'
                  : target.type === 'coral_branch'
                  ? 'bg-rose-950/70 border-rose-400 text-rose-200 ring-2 ring-rose-400/50'
                  : target.type === 'oil_slick'
                  ? 'bg-slate-950/80 border-amber-500 text-amber-300'
                  : 'bg-sky-950/70 border-sky-400 text-sky-200'
              }`}
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {target.icon}
              </span>
              <span className="text-[10px] font-bold whitespace-nowrap pr-1 hidden sm:inline">
                {target.label}
              </span>
            </button>
          ))}
      </div>

      {/* Educational takeaway footnote */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong>Thông điệp Chuyên đề 11:</strong> Bảo vệ môi trường biển không chỉ là dọn rác mà còn bao gồm bảo tồn rạn san hô, rừng ngập mặn, thảm cỏ biển và đấu tranh chống khai thác hải sản bất hợp pháp (IUU), gìn giữ màu xanh cho thế hệ mai sau.
        </div>
      </div>
    </div>
  );
};
