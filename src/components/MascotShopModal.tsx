import React, { useState, useMemo, useEffect } from 'react';
import { CostumeItem, UserProgress } from '../types';
import { MASCOT_COSTUMES } from '../data/mascotCostumes';
import { KienSangMascot } from './KienSangMascot';
import {
  Sparkles,
  ShoppingBag,
  Check,
  Lock,
  X,
  Trophy,
  Coins,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Filter,
  Search,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { millionaireAudio } from '../utils/millionaireAudio';

interface MascotShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onBuyCostume: (costumeId: string, price: number) => void;
  onEquipCostume: (costumeId: string) => void;
  onNavigateToLearn?: () => void;
  onNavigateToGames?: () => void;
}

type TabCategory = 'all' | 'hat' | 'suit' | 'glasses' | 'accessory' | 'special';
type OwnershipFilter = 'all' | 'unowned' | 'owned';

export const MascotShopModal: React.FC<MascotShopModalProps> = ({
  isOpen,
  onClose,
  progress,
  onBuyCostume,
  onEquipCostume,
  onNavigateToLearn,
  onNavigateToGames,
}) => {
  const [selectedCostumeId, setSelectedCostumeId] = useState<string>(
    progress.equippedCostume || 'default'
  );
  const [selectedTab, setSelectedTab] = useState<TabCategory>('all');
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'rarity'>('default');
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedCostumeId(progress.equippedCostume || 'default');
    }
  }, [isOpen, progress.equippedCostume]);

  const currentCoins = progress.coins || 0;
  const ownedCostumes = progress.ownedCostumes || ['default'];
  const equippedCostume = progress.equippedCostume || 'default';

  const selectedCostume =
    MASCOT_COSTUMES.find((c) => c.id === selectedCostumeId) || MASCOT_COSTUMES[0];

  const rarityWeights: Record<string, number> = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
  };

  const filteredCostumes = useMemo(() => {
    let list = MASCOT_COSTUMES.filter((c) => {
      // Category filter
      if (selectedTab !== 'all' && c.category !== selectedTab) return false;

      // Ownership filter
      const isOwned = ownedCostumes.includes(c.id);
      if (ownershipFilter === 'owned' && !isOwned) return false;
      if (ownershipFilter === 'unowned' && isOwned && c.id !== 'default') return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          (c.buffDescription && c.buffDescription.toLowerCase().includes(query))
        );
      }

      return true;
    });

    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rarity') {
      list.sort((a, b) => rarityWeights[b.rarity] - rarityWeights[a.rarity]);
    }

    return list;
  }, [selectedTab, ownershipFilter, searchQuery, sortBy, ownedCostumes]);

  const handleSelectCostume = (costume: CostumeItem) => {
    setSelectedCostumeId(costume.id);
    millionaireAudio.playPop();
  };

  const handleBuy = (costume: CostumeItem) => {
    if (currentCoins < costume.price) {
      millionaireAudio.playWrong();
      setPurchaseNotice(
        `⚠️ Bạn còn thiếu ${costume.price - currentCoins} Xu Biển Đông nữa! Hãy hoàn thành thêm bài học hoặc chơi trò chơi để tích lũy nhé!`
      );
      setTimeout(() => setPurchaseNotice(null), 4000);
      return;
    }

    onBuyCostume(costume.id, costume.price);
    millionaireAudio.playPowerup();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setPurchaseNotice(`🎉 Chúc mừng bạn đã mua thành công "${costume.name}"!`);
    setTimeout(() => setPurchaseNotice(null), 3500);
  };

  const handleEquip = (costume: CostumeItem) => {
    onEquipCostume(costume.id);
    millionaireAudio.playMatchSuccess();
    setPurchaseNotice(`✨ Kiến Sáng đã khoác lên mình "${costume.name}"!`);
    setTimeout(() => setPurchaseNotice(null), 2500);
  };

  const rarityBadges: Record<
    string,
    { label: string; class: string; border: string; glow: string }
  > = {
    common: {
      label: 'Phổ thông',
      class: 'bg-slate-100 text-slate-700 border-slate-300',
      border: 'border-slate-200',
      glow: 'shadow-slate-200',
    },
    rare: {
      label: 'Hiếm',
      class: 'bg-sky-100 text-sky-800 border-sky-300',
      border: 'border-sky-300',
      glow: 'shadow-sky-200',
    },
    epic: {
      label: 'Sử thi',
      class: 'bg-purple-100 text-purple-800 border-purple-300 font-extrabold',
      border: 'border-purple-400',
      glow: 'shadow-purple-200',
    },
    legendary: {
      label: 'Huyền thoại',
      class: 'bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 text-amber-950 border-amber-400 font-black',
      border: 'border-amber-400',
      glow: 'shadow-amber-300',
    },
  };

  const isSelectedOwned = ownedCostumes.includes(selectedCostume.id);
  const isSelectedEquipped = equippedCostume === selectedCostume.id;
  const coinsNeeded = Math.max(0, selectedCostume.price - currentCoins);
  const coinProgressPercent =
    selectedCostume.price === 0
      ? 100
      : Math.min(100, Math.round((currentCoins / selectedCostume.price) * 100));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-4 sm:p-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🛍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Shop Kiến Sáng & Tủ Đồ Biển Đảo
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  18 Mặt Hàng
                </span>
              </div>
              <p className="text-xs sm:text-sm text-orange-100 mt-0.5 font-medium">
                Tích lũy Xu từ học tập và trò chơi để mở khóa các trang phục, công cụ & bảo vật đại dương!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coin Balance Badge */}
            <div
              className="flex items-center gap-2 bg-slate-950/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-amber-200 font-black text-sm sm:text-base shadow-inner"
              title="Số Xu Biển Đông hiện tại của bạn"
            >
              <span className="text-lg">🪙</span>
              <span>{currentCoins.toLocaleString('vi-VN')} Xu</span>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Đóng cửa hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        {purchaseNotice && (
          <div className="bg-amber-100 border-b border-amber-300 p-3 text-xs sm:text-sm font-bold text-amber-950 text-center animate-in slide-in-from-top-2">
            {purchaseNotice}
          </div>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Left Column: Live Fitting Room Preview & Item Lore */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-gradient-to-b from-slate-50 to-orange-50/30 flex flex-col justify-between text-center space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">
                  Phòng Thử Đồ Trực Tiếp
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    rarityBadges[selectedCostume.rarity].class
                  }`}
                >
                  {rarityBadges[selectedCostume.rarity].label}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                {selectedCostume.name}
              </h4>
            </div>

            {/* Mascot Preview SVG with Selected Costume */}
            <div className="relative mx-auto p-4 rounded-3xl bg-white border-2 border-orange-200/80 shadow-md w-full max-w-[230px] aspect-square flex items-center justify-center overflow-visible">
              <KienSangMascot
                state="normal"
                size={180}
                costumeId={selectedCostume.id}
                animated={true}
              />
              {isSelectedEquipped && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Đang Mặc
                </div>
              )}
            </div>

            {/* Lore and Item Details */}
            <div className="space-y-2.5 text-xs text-slate-700 bg-white p-3.5 rounded-2xl border border-orange-100 shadow-2xs text-left">
              <p className="italic text-slate-600 leading-relaxed">
                "{selectedCostume.description}"
              </p>

              {selectedCostume.buffDescription && (
                <div className="bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-200 font-semibold text-[11px] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{selectedCostume.buffDescription}</span>
                </div>
              )}

              {/* Price & Progress toward this item */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Giá mặt hàng:</span>
                  <span className="text-amber-700 font-black text-sm flex items-center gap-1">
                    🪙 {selectedCostume.price === 0 ? 'Miễn phí' : `${selectedCostume.price.toLocaleString('vi-VN')} Xu`}
                  </span>
                </div>

                {!isSelectedOwned && selectedCostume.price > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>Tiến độ tích lũy:</span>
                      <span className="font-bold text-slate-800">
                        {currentCoins.toLocaleString('vi-VN')} / {selectedCostume.price.toLocaleString('vi-VN')} Xu ({coinProgressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${coinProgressPercent}%` }}
                      ></div>
                    </div>
                    {coinsNeeded > 0 && (
                      <p className="text-[10px] text-red-600 font-semibold mt-1">
                        Cần thêm {coinsNeeded.toLocaleString('vi-VN')} Xu nữa để sở hữu!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-2 pt-1">
              {isSelectedEquipped ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center gap-2 cursor-default border border-emerald-300"
                >
                  <Check className="w-4 h-4" /> Đang Mặc Trang Phục Này
                </button>
              ) : isSelectedOwned ? (
                <button
                  onClick={() => handleEquip(selectedCostume)}
                  className="w-full py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" /> Mặc Ngay Vào Linh Vật
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(selectedCostume)}
                  disabled={currentCoins < selectedCostume.price}
                  className={`w-full py-3 rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    currentCoins >= selectedCostume.price
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white cursor-pointer hover:scale-[1.02]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  {currentCoins >= selectedCostume.price
                    ? `Mua Với ${selectedCostume.price.toLocaleString('vi-VN')} Xu`
                    : `Chưa Đủ Xu (${selectedCostume.price.toLocaleString('vi-VN')} Xu)`}
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Catalog, Filters, Search & Motivational Earn Tips */}
          <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
                {[
                  { id: 'all', label: 'Tất cả (18)', icon: '🌟' },
                  { id: 'hat', label: 'Mũ & Nón', icon: '👒' },
                  { id: 'suit', label: 'Trang phục & Giáp', icon: '🦺' },
                  { id: 'glasses', label: 'Kính & Viễn thám', icon: '🥽' },
                  { id: 'accessory', label: 'Phụ kiện & Đồ nghề', icon: '🧭' },
                  { id: 'special', label: 'Bảo vật Huyền thoại', icon: '👑' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as TabCategory)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedTab === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Sub-toolbar: Search, Ownership filter & Sort */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mt-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm trang phục, công cụ..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:bg-white"
                  />
                </div>

                {/* Filter and Sort options */}
                <div className="flex items-center gap-2 text-xs">
                  {/* Ownership filter */}
                  <select
                    value={ownershipFilter}
                    onChange={(e) => setOwnershipFilter(e.target.value as OwnershipFilter)}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 cursor-pointer focus:outline-hidden"
                  >
                    <option value="all">Mọi trạng thái</option>
                    <option value="unowned">Chưa sở hữu</option>
                    <option value="owned">Đã sở hữu</option>
                  </select>

                  {/* Sort by */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 cursor-pointer focus:outline-hidden"
                  >
                    <option value="default">Sắp xếp mặc định</option>
                    <option value="priceAsc">Giá thấp ➔ cao</option>
                    <option value="priceDesc">Giá cao ➔ thấp</option>
                    <option value="rarity">Theo độ hiếm</option>
                  </select>
                </div>
              </div>

              {/* Costumes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 max-h-[46vh] overflow-y-auto pr-1">
                {filteredCostumes.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                    Không tìm thấy mặt hàng nào phù hợp với bộ lọc.
                  </div>
                ) : (
                  filteredCostumes.map((costume) => {
                    const isOwned = ownedCostumes.includes(costume.id);
                    const isEquipped = equippedCostume === costume.id;
                    const isSelected = selectedCostumeId === costume.id;
                    const badgeInfo = rarityBadges[costume.rarity];

                    return (
                      <div
                        key={costume.id}
                        onClick={() => handleSelectCostume(costume)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden group ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-400/40'
                            : isOwned
                            ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-3xl p-1 rounded-xl bg-slate-50 group-hover:scale-110 transition-transform">
                            {costume.icon}
                          </span>
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border uppercase ${badgeInfo.class}`}
                          >
                            {badgeInfo.label}
                          </span>
                        </div>

                        <div className="mt-2.5">
                          <h5 className="text-xs font-black text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                            {costume.name}
                          </h5>
                          <div className="text-[11px] font-bold mt-1">
                            {isEquipped ? (
                              <span className="text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block">
                                <Check className="w-3 h-3 inline" /> Đang Mặc
                              </span>
                            ) : isOwned ? (
                              <span className="text-sky-700 font-bold bg-sky-100/70 px-2 py-0.5 rounded-md inline-block">
                                Đã sở hữu
                              </span>
                            ) : (
                              <span className="text-amber-800 font-black flex items-center gap-1">
                                🪙 {costume.price === 0 ? 'Miễn phí' : `${costume.price.toLocaleString('vi-VN')} Xu`}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Motivational Learning Tips Ribbon at Bottom */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-amber-50 border border-sky-200/80 text-xs">
              <div className="flex items-center gap-2 font-black text-slate-900 mb-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Cách Kiếm Thêm Xu Để Mua Mặt Hàng Cao Cấp:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-700">
                <div className="flex items-center gap-1.5 bg-white/70 p-1.5 rounded-lg border border-sky-100">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>
                    Hoàn thành 1 bài học: <strong className="text-sky-700">+150 Xu</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 p-1.5 rounded-lg border border-sky-100">
                  <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    Về đích Thử thách: <strong className="text-amber-700">+300 Xu</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/70 p-1.5 rounded-lg border border-sky-100">
                  <Gamepad2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Đỉnh Ai Là Triệu Phú: <strong className="text-emerald-700">+1.500 Xu</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
