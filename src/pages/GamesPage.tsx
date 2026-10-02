import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { MillionaireGame } from '../components/MillionaireGame';
import { ResourceSortGame } from '../components/games/ResourceSortGame';
import { SeaVoyageGame } from '../components/games/SeaVoyageGame';
import { MemoryMatchGame } from '../components/games/MemoryMatchGame';
import { MarineRescueGame } from '../components/games/MarineRescueGame';
import {
  Trophy,
  Sparkles,
  Gamepad2,
  Layers,
  Ship,
  Boxes,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

interface GamesPageProps {
  gradeLevel: GradeLevel;
  currentGrade: number;
  onAddXp: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onAddCoins?: (amount: number) => void;
  onOpenShop?: () => void;
}

type ActiveGame = 'millionaire' | 'resources' | 'voyage' | 'memory' | 'rescue';

export const GamesPage: React.FC<GamesPageProps> = ({
  gradeLevel,
  currentGrade,
  onAddXp,
  onUnlockBadge,
  onAddCoins,
  onOpenShop,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('millionaire');

  const gamesList = [
    {
      id: 'millionaire' as const,
      name: '👑 Ai Là Triệu Phú',
      desc: '15 câu hỏi kịch tính, 4 quyền trợ giúp & trường quay âm thanh',
      icon: '💎',
      badge: 'TRƯỜNG QUAY',
      badgeColor: 'bg-red-600 text-white',
    },
    {
      id: 'resources' as const,
      name: '📦 Phân Loại Tài Nguyên',
      desc: 'Phản xạ nhanh 16 tài nguyên vào 4 giỏ kinh tế biển',
      icon: '📦',
      badge: 'GIỮ & NÂNG CẤP',
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'voyage' as const,
      name: '⚓ Hải Trình Vượt Sóng',
      desc: 'Chỉ huy tàu kiểm ngư KN-290 tuần tra 6 chặng hải phận',
      icon: '🚢',
      badge: 'TƯƠNG TÁC CAO',
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      id: 'memory' as const,
      name: '🧩 Lật Thẻ Ký Ức',
      desc: 'Ghép đôi 8 cặp khái niệm, mốc tọa độ & quy chế pháp lý biển',
      icon: '🧩',
      badge: 'TRÍ NHỚ & LUẬT',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'rescue' as const,
      name: '🪸 Biệt Đội Cứu Hộ',
      desc: 'Thu gom rác nhựa, quây hút dầu & cấy ghép rạn san hô 40s',
      icon: '🪸',
      badge: 'REAL-TIME',
      badgeColor: 'bg-emerald-600 text-white',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Game Hub Navigation Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-sky-700 uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-sky-600" />
            Đấu Trường Trò Chơi Tương Tác Biển Đông • GDPT 2018
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            5 Trò Chơi Giáo Dục Biển Đảo Tương Tác Đỉnh Cao
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Chinh phục trường quay Ai Là Triệu Phú, phân loại tài nguyên siêu tốc, chỉ huy hải trình tàu kiểm ngư, đấu trí thẻ bài pháp lý và cứu hộ rạn san hô Biển Đông!
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {onOpenShop && (
            <button
              onClick={onOpenShop}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
              title="Vào Shop để đổi trang phục cho Kiến Sáng"
            >
              <span className="text-base">🛍️</span>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase font-bold text-amber-950/80">Cửa hàng</div>
                <div className="text-xs font-black">Shop Kiến Sáng 🐜</div>
              </div>
            </button>
          )}

          <div className="flex items-center gap-3 bg-linear-to-r from-sky-50 to-blue-50 border border-sky-200/80 px-4 py-3 rounded-2xl shrink-0">
            <span className="text-3xl">🪙</span>
            <div className="text-xs">
              <div className="font-bold text-slate-800">Kiếm Xu Biển Đông:</div>
              <div className="text-sky-700 font-black text-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Thưởng Xu & Sắm Đồ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {gamesList.map((gm) => {
          const isSelected = activeGame === gm.id;
          return (
            <button
              key={gm.id}
              onClick={() => setActiveGame(gm.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? gm.id === 'millionaire'
                    ? 'bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 text-white border-amber-400 shadow-lg shadow-orange-500/25 ring-2 ring-amber-300/50'
                    : 'bg-gradient-to-r from-sky-600 to-blue-700 text-white border-sky-500 shadow-md shadow-sky-600/25 ring-2 ring-sky-300'
                  : 'bg-white hover:bg-sky-50/50 border-sky-100 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-2xl">{gm.icon}</span>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${gm.badgeColor}`}
                >
                  {gm.badge}
                </span>
              </div>

              <div>
                <h4
                  className={`font-black text-sm ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {gm.name}
                </h4>
                <p
                  className={`text-[11px] mt-0.5 line-clamp-2 leading-snug ${
                    isSelected ? 'text-slate-200' : 'text-slate-500'
                  }`}
                >
                  {gm.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE GAME CONTAINER */}
      <div>
        {/* Game 1: Ai Là Triệu Phú Biển Đông */}
        {activeGame === 'millionaire' && (
          <MillionaireGame
            onAddXp={onAddXp}
            onUnlockBadge={onUnlockBadge}
            onAddCoins={onAddCoins}
            onOpenShop={onOpenShop}
          />
        )}

        {/* Game 2: Phân Loại Tài Nguyên Siêu Tốc */}
        {activeGame === 'resources' && (
          <ResourceSortGame
            onAddXp={onAddXp}
            onUnlockBadge={onUnlockBadge}
            onAddCoins={onAddCoins}
            onOpenShop={onOpenShop}
          />
        )}

        {/* Game 3: Hải Trình Vượt Sóng Biển Đông */}
        {activeGame === 'voyage' && (
          <SeaVoyageGame
            onAddXp={onAddXp}
            onUnlockBadge={onUnlockBadge}
            onAddCoins={onAddCoins}
            onOpenShop={onOpenShop}
          />
        )}

        {/* Game 4: Lật Thẻ Ký Ức Chủ Quyền */}
        {activeGame === 'memory' && (
          <MemoryMatchGame
            onAddXp={onAddXp}
            onUnlockBadge={onUnlockBadge}
            onAddCoins={onAddCoins}
            onOpenShop={onOpenShop}
          />
        )}

        {/* Game 5: Biệt Đội Cứu Hộ San Hô Real-time */}
        {activeGame === 'rescue' && (
          <MarineRescueGame
            onAddXp={onAddXp}
            onUnlockBadge={onUnlockBadge}
            onAddCoins={onAddCoins}
            onOpenShop={onOpenShop}
          />
        )}
      </div>
    </div>
  );
};
