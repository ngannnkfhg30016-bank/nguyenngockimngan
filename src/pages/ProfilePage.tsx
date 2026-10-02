import React, { useState } from 'react';
import { StudentInfo, UserProgress } from '../types';
import { KienSangMascot } from '../components/KienSangMascot';
import { MASCOT_COSTUMES } from '../data/mascotCostumes';
import { BADGE_DEFINITIONS, BADGE_CATEGORIES } from '../data/badgeDefinitions';
import {
  User,
  School,
  MapPin,
  Hash,
  BookOpen,
  Trophy,
  Sparkles,
  Flame,
  Award,
  Edit3,
  RotateCcw,
  CheckCircle2,
  ShoppingBag,
  Shirt,
  Palette,
  Check,
} from 'lucide-react';
import { StudentAvatar } from '../components/StudentAvatar';
import { triggerFireworks, triggerStarBurst } from '../utils/fireworks';
import { soundManager } from '../utils/soundManager';

interface ProfilePageProps {
  studentInfo: StudentInfo;
  progress: UserProgress;
  onOpenEditModal: () => void;
  onOpenAvatarModal?: () => void;
  onResetProgress: () => void;
  onOpenShop?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  studentInfo,
  progress,
  onOpenEditModal,
  onOpenAvatarModal,
  onResetProgress,
  onOpenShop,
}) => {
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<string>('all');
  const allBadgesList = Object.values(BADGE_DEFINITIONS);
  const currentCostume = MASCOT_COSTUMES.find(
    (c) => c.id === (progress.equippedCostume || 'default')
  );

  return (
    <div className="space-y-8">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-sky-600/20 border border-sky-400/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Student Avatar with Quick Edit Overlay */}
            <div
              onClick={onOpenAvatarModal || onOpenEditModal}
              className="relative group cursor-pointer shrink-0"
              title="Nhấn để tùy biến Avatar học tập Kiến Sáng"
            >
              <StudentAvatar
                studentInfo={studentInfo}
                size={84}
                showFrame={true}
                className="transition-transform group-hover:scale-105 shadow-xl"
              />
              <div className="absolute inset-0 bg-slate-950/45 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-black gap-1 backdrop-blur-2xs">
                <Palette className="w-4 h-4" />
                <span>Đổi Avatar</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black">
                  {studentInfo.fullName || 'Nguyễn Ngọc Kim Ngân'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 border border-white/30 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  Lớp {studentInfo.gradeClass || '11A'}
                </span>
                {studentInfo.learningTitle && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                    <Award className="w-3 h-3 text-slate-950" />
                    {studentInfo.learningTitle}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-sky-100 font-medium mt-1 flex items-center gap-1.5">
                <School className="w-4 h-4 text-sky-200 shrink-0" />
                <span>{studentInfo.schoolName || 'Trường Tiểu học, THCS & THPT FPT Hậu Giang'}</span>
              </p>
              <div className="flex items-center gap-4 text-xs text-sky-100 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-sky-200" />
                  Mã số học sinh: <strong className="font-mono text-white">{studentInfo.studentId || 'FHG30016'}</strong>
                </span>
                <span className="flex items-center gap-1 text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                  <span>{studentInfo.schoolAddress || 'quốc lộ 61C, xã Vị Thủy, thành phố Cần Thơ'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onOpenAvatarModal && (
              <button
                onClick={onOpenAvatarModal}
                className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer border border-white/30 hover:scale-105 active:scale-95"
                title="Mở giao diện tùy biến Avatar học tập"
              >
                <Palette className="w-4 h-4" />
                <span>Đổi Avatar Học Tập 🎨</span>
              </button>
            )}

            {onOpenShop && (
              <button
                onClick={onOpenShop}
                className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Kiến Sáng 🛍️
              </button>
            )}

            <button
              onClick={onOpenEditModal}
              className="px-4 py-2.5 rounded-2xl bg-white text-sky-800 hover:bg-sky-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* XP */}
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Tổng điểm XP</div>
            <div className="text-2xl font-black text-slate-900">{progress.xp} XP</div>
          </div>
        </div>

        {/* Coins */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50/50 to-white shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-bold">
              🪙
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase">Xu Biển Đông</div>
              <div className="text-2xl font-black text-amber-600">{progress.coins ?? 100} Xu</div>
            </div>
          </div>
          {onOpenShop && (
            <button
              onClick={onOpenShop}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-2xs transition-all"
              title="Đến cửa hàng trang phục"
            >
              Shop 🛍️
            </button>
          )}
        </div>

        {/* Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Chuỗi ngày học</div>
            <div className="text-2xl font-black text-slate-900">{progress.streakDays} ngày</div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Huy hiệu đạt được</div>
            <div className="text-2xl font-black text-slate-900">
              {progress.badges.length}/{allBadgesList.length}
            </div>
          </div>
        </div>
      </div>

      {/* Mascot Wardrobe & Customization Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <Shirt className="w-4 h-4" />
              Tủ Đồ & Cá Nhân Hóa Linh Vật FPT School
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Trang Phục Của Kiến Sáng 🐜
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Đang mặc:{' '}
              <strong className="text-orange-600 font-black">
                {currentCostume?.name || 'Mặc định FPT School'}
              </strong>{' '}
              • Sở hữu {(progress.ownedCostumes || ['default']).length} / {MASCOT_COSTUMES.length} bộ trang phục
            </p>
          </div>

          {onOpenShop && (
            <button
              onClick={onOpenShop}
              className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Mở Shop Sắm Trang Phục Mới
            </button>
          )}
        </div>

        {/* Costumes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {MASCOT_COSTUMES.map((costume) => {
            const isOwned = (progress.ownedCostumes || ['default']).includes(costume.id);
            const isEquipped = (progress.equippedCostume || 'default') === costume.id;

            return (
              <div
                key={costume.id}
                onClick={onOpenShop}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  isEquipped
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/50 shadow-xs'
                    : isOwned
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    : 'bg-slate-50/40 border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex justify-center my-1">
                  <KienSangMascot
                    state="normal"
                    size={56}
                    animated={false}
                    costumeId={costume.id}
                  />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-black text-slate-900 truncate" title={costume.name}>
                    {costume.name}
                  </div>
                  <div className="text-[10px] mt-0.5">
                    {isEquipped ? (
                      <span className="font-extrabold text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-md">
                        Đang Mặc
                      </span>
                    ) : isOwned ? (
                      <span className="text-emerald-600 font-bold">Đã sở hữu</span>
                    ) : (
                      <span className="text-amber-800 font-bold">
                        🪙 {costume.price === 0 ? '0' : costume.price.toLocaleString('vi-VN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Bộ Sưu Tập Huy Hiệu Danh Dự</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                {progress.badges.length}/{allBadgesList.length} Đã Mở Khóa
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hoàn thành các chương học, thử thách GIS và trò chơi để mở khóa trọn bộ 16 huy hiệu danh giá
            </p>
          </div>

          <div className="text-xs text-amber-700 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 self-start sm:self-auto">
            💡 Nhấn vào huy hiệu đã mở để bắn pháo hoa vinh danh! 🎆
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {BADGE_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? allBadgesList.length
                : allBadgesList.filter((b) => b.category === cat.id).length;
            const unlockedCount =
              cat.id === 'all'
                ? progress.badges.length
                : allBadgesList.filter(
                    (b) => b.category === cat.id && progress.badges.includes(b.id)
                  ).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setBadgeCategoryFilter(cat.id);
                  soundManager.playPop();
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  badgeCategoryFilter === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-80">
                  ({unlockedCount}/{count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Filtered Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadgesList
            .filter(
              (b) => badgeCategoryFilter === 'all' || b.category === badgeCategoryFilter
            )
            .map((badge) => {
              const isUnlocked = progress.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  onClick={() => {
                    if (isUnlocked) {
                      triggerFireworks(2800);
                      triggerStarBurst();
                      soundManager.playSuccessChime();
                    }
                  }}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-amber-50/60 border-amber-300 shadow-xs cursor-pointer hover:scale-[1.02] hover:bg-amber-100/70'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                  title={
                    isUnlocked
                      ? 'Nhấn để bắn pháo hoa vinh danh huy hiệu này! 🎆'
                      : `Điều kiện: ${badge.requirement}`
                  }
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-transform ${
                        isUnlocked
                          ? 'bg-white shadow-sm ring-2 ring-amber-300'
                          : 'bg-slate-200 grayscale opacity-60'
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {badge.name}
                        </h4>
                        {isUnlocked && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-sky-700 bg-sky-100/70 px-1.5 py-0.2 rounded-md inline-block mt-0.5">
                        {badge.categoryName}
                      </span>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                        {badge.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold">
                    {isUnlocked ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <span>★ Đã mở khóa</span>
                        <span className="text-[10px] text-amber-700 font-extrabold bg-amber-200/80 px-1.5 py-0.5 rounded-md">
                          Bắn pháo hoa 🎆
                        </span>
                      </span>
                    ) : (
                      <span
                        className="text-slate-500 font-normal line-clamp-1 max-w-[170px]"
                        title={badge.requirement}
                      >
                        🔒 {badge.requirement}
                      </span>
                    )}

                    <span className="text-amber-900 text-[10px] font-black bg-amber-100/90 px-2 py-0.5 rounded-md shrink-0">
                      +{badge.xpReward} XP • +{badge.coinReward} 🪙
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Settings / Reset */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
        <span>Cần khởi động lại hành trình học tập từ đầu?</span>
        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại toàn bộ điểm & huy hiệu
        </button>
      </div>
    </div>
  );
};
