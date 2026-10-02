import React, { useState, useEffect } from 'react';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Clock,
  CheckCircle2,
  HelpCircle,
  Award,
  Layers,
  ShoppingBag,
  ArrowRight,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { millionaireAudio } from '../../utils/millionaireAudio';

interface MemoryCardItem {
  id: string;
  pairId: string;
  title: string;
  subtitle: string;
  badgeText: string;
  icon: string;
}

interface DifficultyLevel {
  level: number;
  name: string;
  cardCount: number; // 6, 10, 14, 18
  pairCount: number; // 3, 5, 7, 9
  gridColsClass: string;
  rewardCoins: number;
  rewardXp: number;
}

const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    level: 1,
    name: 'Cấp 1: Nhập Môn',
    cardCount: 6,
    pairCount: 3,
    gridColsClass: 'grid-cols-3 sm:grid-cols-3',
    rewardCoins: 25,
    rewardXp: 30,
  },
  {
    level: 2,
    name: 'Cấp 2: Khám Phá',
    cardCount: 10,
    pairCount: 5,
    gridColsClass: 'grid-cols-2 sm:grid-cols-5',
    rewardCoins: 45,
    rewardXp: 50,
  },
  {
    level: 3,
    name: 'Cấp 3: Thử Thách',
    cardCount: 14,
    pairCount: 7,
    gridColsClass: 'grid-cols-2 sm:grid-cols-7',
    rewardCoins: 70,
    rewardXp: 70,
  },
  {
    level: 4,
    name: 'Cấp 4: Bậc Thầy Biển Đảo',
    cardCount: 18,
    pairCount: 9,
    gridColsClass: 'grid-cols-3 sm:grid-cols-6',
    rewardCoins: 100,
    rewardXp: 90,
  },
];

// Danh mục các thẻ kiến thức chuẩn SGK Địa lí 11 Biển Đông. Mỗi item sẽ tạo thành 1 CẶP GỒM 2 THẺ GIỐNG NHAU
const ALL_MASTER_CARDS: {
  pairId: string;
  title: string;
  subtitle: string;
  badgeText: string;
  icon: string;
}[] = [
  {
    pairId: 'p1',
    title: 'Đường cơ sở 1982',
    subtitle: 'Nối 11 điểm A1-A11 ven biển',
    badgeText: 'Mốc pháp lý',
    icon: '📏',
  },
  {
    pairId: 'p2',
    title: 'Lãnh hải 12 hải lý',
    subtitle: 'Biên giới quốc gia trên biển',
    badgeText: 'Chủ quyền VN',
    icon: '🌊',
  },
  {
    pairId: 'p3',
    title: 'Vùng tiếp giáp 12 hải lý',
    subtitle: 'Quyền tài phán an ninh, thuế quan',
    badgeText: 'Vùng biển',
    icon: '🛡️',
  },
  {
    pairId: 'p4',
    title: 'Đặc quyền kinh tế EEZ',
    subtitle: '200 hải lý quyền chủ quyền',
    badgeText: 'Kinh tế biển',
    icon: '🚢',
  },
  {
    pairId: 'p5',
    title: 'Thềm lục địa Việt Nam',
    subtitle: 'Đáy biển giàu dầu khí, khoáng sản',
    badgeText: 'Đáy biển',
    icon: '⛏️',
  },
  {
    pairId: 'p6',
    title: 'Quần đảo Hoàng Sa',
    subtitle: 'Huyện đảo thuộc TP. Đà Nẵng',
    badgeText: 'Chủ quyền VN',
    icon: '🏝️',
  },
  {
    pairId: 'p7',
    title: 'Quần đảo Trường Sa',
    subtitle: 'Huyện đảo thuộc tỉnh Khánh Hòa',
    badgeText: 'Chủ quyền VN',
    icon: '🇻🇳',
  },
  {
    pairId: 'p8',
    title: 'Công ước UNCLOS 1982',
    subtitle: 'Hiến pháp Đại dương toàn cầu',
    badgeText: 'Luật quốc tế',
    icon: '📘',
  },
  {
    pairId: 'p9',
    title: 'Nhà giàn DK1 (1989)',
    subtitle: 'Trạm KHKT giữ vững thềm lục địa',
    badgeText: 'Cột mốc biển',
    icon: '🏗️',
  },
  {
    pairId: 'p10',
    title: 'Băng cháy & Dầu khí',
    subtitle: 'Năng lượng chiến lược tương lai',
    badgeText: 'Tài nguyên',
    icon: '⚡',
  },
  {
    pairId: 'p11',
    title: 'Tuyên bố DOC 2002',
    subtitle: 'Ứng xử hòa bình ASEAN - TQ',
    badgeText: 'Ngoại giao',
    icon: '🤝',
  },
  {
    pairId: 'p12',
    title: 'Bảo tồn Rạn San Hô',
    subtitle: 'Phát triển kinh tế biển xanh',
    badgeText: 'Bảo tồn biển',
    icon: '🪸',
  },
];

interface MemoryMatchGameProps {
  onAddXp: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenShop?: () => void;
}

export const MemoryMatchGame: React.FC<MemoryMatchGameProps> = ({
  onAddXp,
  onAddCoins,
  onUnlockBadge,
  onOpenShop,
}) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentLevel = DIFFICULTY_LEVELS[currentLevelIdx];

  // Initialize deck for current level (Mỗi cặp gồm 2 thẻ giống hệt nhau)
  const initLevel = (levelIdx: number) => {
    const lvl = DIFFICULTY_LEVELS[levelIdx];
    const selectedItems = ALL_MASTER_CARDS.slice(0, lvl.pairCount);

    const rawList: MemoryCardItem[] = [];
    selectedItems.forEach((item, idx) => {
      // Thẻ 1 của cặp
      rawList.push({
        id: `c-${idx}-cardA`,
        pairId: item.pairId,
        title: item.title,
        subtitle: item.subtitle,
        badgeText: item.badgeText,
        icon: item.icon,
      });
      // Thẻ 2 giống hệt thẻ 1
      rawList.push({
        id: `c-${idx}-cardB`,
        pairId: item.pairId,
        title: item.title,
        subtitle: item.subtitle,
        badgeText: item.badgeText,
        icon: item.icon,
      });
    });

    // Shuffle cards
    const shuffled = rawList.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMoves(0);
    setElapsedSeconds(0);
    setIsActive(true);
    setIsFinished(false);
  };

  useEffect(() => {
    initLevel(currentLevelIdx);
  }, [currentLevelIdx]);

  // Stopwatch timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && !isFinished) {
      timer = setInterval(() => {
        setElapsedSeconds((sec) => sec + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isFinished]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.includes(index) ||
      matchedPairIds.includes(cards[index].pairId) ||
      flippedIndices.length >= 2 ||
      isFinished
    ) {
      return;
    }

    millionaireAudio.playPop();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      // Người dùng lật được 2 thẻ giống nhau (cùng pairId nhưng khác instance id)
      if (first.pairId === second.pairId && first.id !== second.id) {
        // MATCH SUCCESS!
        setTimeout(() => {
          millionaireAudio.playMatchSuccess();
          const newMatched = [...matchedPairIds, first.pairId];
          setMatchedPairIds(newMatched);
          setFlippedIndices([]);

          // Complete level check
          if (newMatched.length === currentLevel.pairCount) {
            setIsFinished(true);
            setIsActive(false);
            millionaireAudio.playPowerup();
            confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });

            // Reward XP and Coins!
            onAddXp(currentLevel.rewardXp);
            if (onAddCoins) {
              onAddCoins(currentLevel.rewardCoins);
            }
            if (currentLevel.level >= 3) {
              onUnlockBadge('diplomat');
            }
          }
        }, 450);
      } else {
        // MISMATCH!
        setTimeout(() => {
          millionaireAudio.playWrong();
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx + 1 < DIFFICULTY_LEVELS.length) {
      setCurrentLevelIdx((idx) => idx + 1);
    } else {
      // Loop or restart
      setCurrentLevelIdx(0);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Lật Thẻ Trí Nhớ & Luật Biển Đảo • Màn Hình Tinh Gọn
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            🧩 Lật Thẻ Ký Ức: Cặp Thẻ Giống Nhau
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Mỗi cặp gồm <strong>2 thẻ giống hệt nhau</strong> về kiến thức & biểu tượng. Lật mở đúng 2 thẻ giống nhau để hoàn thành cặp và nhận Xu thưởng!
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Shop button shortcut */}
          {onOpenShop && (
            <button
              onClick={onOpenShop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs transition-colors shadow-xs"
              title="Đến Shop sắm trang phục cho Kiến Sáng"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              <span>Shop Kiến Sáng 🛍️</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono">{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-900">
            Lượt: <span className="text-orange-600 font-black">{moves}</span>
          </div>

          <button
            onClick={() => initLevel(currentLevelIdx)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 border border-slate-200"
            title="Xáo thẻ và chơi lại màn hiện tại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Difficulty Level Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-slate-500 whitespace-nowrap">Chọn cấp độ:</span>
        {DIFFICULTY_LEVELS.map((lvl, idx) => {
          const isCurrent = currentLevelIdx === idx;
          return (
            <button
              key={lvl.level}
              onClick={() => setCurrentLevelIdx(idx)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl.name} ({lvl.cardCount} thẻ • +{lvl.rewardCoins} 🪙)
            </button>
          );
        })}
      </div>

      {/* Level Status & Coins Reward Banner */}
      <div className="flex items-center justify-between text-xs font-bold px-1 text-slate-600">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          Tiến độ: {matchedPairIds.length} / {currentLevel.pairCount} cặp đúng
        </span>
        <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
          Phần thưởng màn: +{currentLevel.rewardCoins} Xu 🪙 & +{currentLevel.rewardXp} XP
        </span>
      </div>

      {/* COMPACT CARD GRID (FITS COMPLETELY ON SCREEN) */}
      <div className={`grid ${currentLevel.gridColsClass} gap-2.5 sm:gap-3`}>
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedPairIds.includes(card.pairId);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`relative h-24 sm:h-28 rounded-xl cursor-pointer select-none transition-all duration-200 transform ${
                isMatched
                  ? 'opacity-85 cursor-default scale-98 ring-2 ring-emerald-400/60'
                  : 'hover:scale-102 active:scale-95 shadow-xs'
              }`}
            >
              {isFlipped || isMatched ? (
                /* Card Front (Compact Revealed) */
                <div
                  className={`w-full h-full rounded-xl p-2.5 flex flex-col justify-between border-2 transition-all ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-white border-orange-500 text-slate-900 shadow-sm shadow-orange-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                        isMatched
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {card.badgeText}
                    </span>
                    <span className="text-base sm:text-lg">{card.icon}</span>
                  </div>

                  <div className="my-auto text-center">
                    <div className="font-black text-[11px] sm:text-xs leading-tight line-clamp-2 text-slate-900">
                      {card.title}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {card.subtitle}
                    </div>
                  </div>

                  <div className="text-[8px] font-mono text-center font-bold text-slate-400">
                    {isMatched ? '✓ CẶP GIỐNG NHAU' : 'CẶP ĐÔI'}
                  </div>
                </div>
              ) : (
                /* Card Back (Compact Hidden) */
                <div className="w-full h-full rounded-xl bg-linear-to-br from-slate-900 via-sky-950 to-slate-900 border-2 border-slate-700/60 p-2 flex flex-col items-center justify-center text-center shadow-xs group hover:border-orange-400/80 transition-all">
                  <div className="text-xl group-hover:scale-110 transition-transform">
                    🌊
                  </div>
                  <span className="text-[9px] font-bold text-sky-200 tracking-tight mt-0.5">
                    Biển Đông
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Victory Level Modal */}
      {isFinished && (
        <div className="p-5 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl text-center space-y-3 animate-fade-in">
          <div className="text-4xl">🏆</div>
          <h3 className="text-xl sm:text-2xl font-black">
            Tuyệt Vời! Đã Hoàn Thành {currentLevel.name}!
          </h3>
          <p className="text-xs sm:text-sm text-orange-100 max-w-md mx-auto leading-relaxed">
            Bạn lật trong {formatTime(elapsedSeconds)} với {moves} lượt. Đã nhận ngay{' '}
            <strong className="text-yellow-200">+{currentLevel.rewardCoins} Xu Biển Đông 🪙</strong>{' '}
            và <strong className="text-white">+{currentLevel.rewardXp} XP</strong>!
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            {currentLevelIdx + 1 < DIFFICULTY_LEVELS.length ? (
              <button
                onClick={handleNextLevel}
                className="px-5 py-2.5 rounded-xl bg-white text-orange-700 font-black text-xs sm:text-sm shadow-md hover:bg-orange-50 transition-all flex items-center gap-2"
              >
                Qua Màn Tiếp Theo ({DIFFICULTY_LEVELS[currentLevelIdx + 1].name})
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => initLevel(0)}
                className="px-5 py-2.5 rounded-xl bg-white text-orange-700 font-black text-xs sm:text-sm shadow-md hover:bg-orange-50 transition-all"
              >
                Chinh Phục Lại Từ Cấp 1
              </button>
            )}

            {onOpenShop && (
              <button
                onClick={onOpenShop}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-xs sm:text-sm shadow-md hover:bg-slate-800 transition-all flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                Vào Shop Mua Trang Phục Kiến Sáng
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
