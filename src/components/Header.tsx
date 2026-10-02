import React, { useState } from 'react';
import { PageId, GradeLevel, UserProgress, StudentInfo } from '../types';
import { KienSangMascot } from './KienSangMascot';
import { StudentAvatar } from './StudentAvatar';
import { SoundController } from './SoundController';
import { soundManager } from '../utils/soundManager';
import {
  Compass,
  Map as MapIcon,
  BookOpen,
  Gamepad2,
  Trophy,
  Bot,
  FileText,
  User,
  Menu,
  X,
  Sparkles,
  Flame,
  GraduationCap,
  School,
  MapPin,
  Hash,
  Edit3,
  ShoppingBag,
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  gradeLevel: GradeLevel;
  onGradeLevelChange: (level: GradeLevel) => void;
  currentGrade: number;
  onGradeChange: (grade: number) => void;
  progress: UserProgress;
  studentInfo: StudentInfo;
  onOpenEditProfile?: () => void;
  onOpenShop?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  gradeLevel,
  onGradeLevelChange,
  currentGrade,
  onGradeChange,
  progress,
  studentInfo,
  onOpenEditProfile,
  onOpenShop,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Compass className="w-4 h-4" /> },
    { id: 'explore', label: 'Khám phá', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'map', label: 'Bản đồ', icon: <MapIcon className="w-4 h-4" /> },
    { id: 'learn', label: 'Học tập', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'games', label: 'Trò chơi', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'challenges', label: 'Thử thách', icon: <Trophy className="w-4 h-4" /> },
    { id: 'mascot', label: 'Kiến Sáng', icon: <Bot className="w-4 h-4" /> },
    { id: 'references', label: 'Tài liệu', icon: <FileText className="w-4 h-4" /> },
    { id: 'profile', label: 'Hồ sơ', icon: <User className="w-4 h-4" /> },
  ];

  const handleLevelSelect = (level: GradeLevel) => {
    soundManager.playTabSwitch();
    onGradeLevelChange(level);
    if (level === 'tieuhoc') onGradeChange(4);
    else if (level === 'thcs') onGradeChange(8);
    else onGradeChange(11);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Super Top Tier: Personal Student Profile Bar with Kien Sang Mascot Avatar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white border-b border-orange-700/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
            {/* Left: Kien Sang Avatar & Student Identification */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar Kien Sang Mascot */}
              <div
                onClick={() => onNavigate('mascot')}
                className="relative cursor-pointer group shrink-0"
                title="Avatar Kiến Sáng - Linh vật FPT School (Bấm để trò chuyện)"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xs border-2 border-white/90 p-0.5 shadow-sm overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  <KienSangMascot
                    state="normal"
                    size={44}
                    animated={false}
                    costumeId={progress.equippedCostume}
                  />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-orange-700"
                  title="Học sinh đang hoạt động"
                ></span>
              </div>

              {/* Personal Info Data */}
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-white text-sm sm:text-base tracking-tight truncate">
                    {studentInfo.fullName || 'Nguyễn Ngọc Kim Ngân'}
                  </span>
                  <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/30 flex items-center gap-1 shrink-0">
                    <BookOpen className="w-3 h-3" />
                    Lớp {studentInfo.gradeClass || '11A'}
                  </span>
                  <span className="bg-amber-400/25 text-amber-100 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border border-amber-300/30 flex items-center gap-1 shrink-0">
                    <Hash className="w-3 h-3 text-amber-300" />
                    {studentInfo.studentId || 'FHG30016'}
                  </span>
                </div>

                <div className="flex items-center gap-x-3 gap-y-1 text-orange-100 text-[11px] flex-wrap mt-0.5">
                  <span className="flex items-center gap-1 truncate">
                    <School className="w-3.5 h-3.5 text-orange-200 shrink-0" />
                    <span className="font-medium truncate max-w-[260px] sm:max-w-md">
                      {studentInfo.schoolName || 'Trường Tiểu học, THCS & THPT FPT Hậu Giang'}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-orange-200/90 truncate">
                    <MapPin className="w-3.5 h-3.5 text-orange-200 shrink-0" />
                    <span className="truncate max-w-[240px] sm:max-w-sm">
                      {studentInfo.schoolAddress || 'quốc lộ 61C, xã Vị Thủy, thành phố Cần Thơ'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
              <button
                onClick={() => onNavigate('profile')}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
                title="Xem Hồ sơ & Điểm tích lũy học sinh"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hồ sơ cá nhân</span>
              </button>

              {onOpenEditProfile && (
                <button
                  onClick={onOpenEditProfile}
                  className="px-2.5 py-1 rounded-lg bg-white text-orange-700 hover:bg-orange-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  title="Chỉnh sửa thông tin học sinh"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa thông tin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Tier: App title, Level switcher, XP bar, Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          {/* Logo & Title */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🐜</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                  HỌC BIỂN ĐÔNG - KHÁM PHÁ RỘNG
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-orange-100 text-orange-800 border border-orange-200">
                  FPT School
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
                Học Biển Đông – Khám phá rộng mở
              </p>
            </div>
          </div>

          {/* Educational Grade Level Selector */}
          <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => handleLevelSelect('tieuhoc')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                gradeLevel === 'tieuhoc'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tiểu học (1-5)
            </button>
            <button
              onClick={() => handleLevelSelect('thcs')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                gradeLevel === 'thcs'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              THCS (6-9)
            </button>
            <button
              onClick={() => handleLevelSelect('thpt')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                gradeLevel === 'thpt'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              THPT (10-12) ⭐
            </button>

            {/* Specific class dropdown */}
            <div className="ml-1 pl-2 border-l border-slate-300 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={currentGrade}
                onChange={(e) => onGradeChange(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                {gradeLevel === 'tieuhoc' && [1, 2, 3, 4, 5].map((g) => (
                  <option key={g} value={g}>Lớp {g}</option>
                ))}
                {gradeLevel === 'thcs' && [6, 7, 8, 9].map((g) => (
                  <option key={g} value={g}>Lớp {g}</option>
                ))}
                {gradeLevel === 'thpt' && [10, 11, 12].map((g) => (
                  <option key={g} value={g}>Lớp {g} {g === 11 ? '(Chuyên đề)' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gamification summary & Student info shortcut */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Background & Interactive Sound Controller */}
            <SoundController />

            {/* Coins & Shop Button */}
            <button
              onClick={onOpenShop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-950 text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
              title="Xu Biển Đông - Nhấn để vào Shop sắm trang phục cho Kiến Sáng"
            >
              <span className="text-sm">🪙</span>
              <span>{progress.coins ?? 100}</span>
              <span className="hidden xl:inline text-[10px] text-amber-800 font-extrabold bg-amber-200/80 px-1.5 py-0.5 rounded-md">
                Shop 🛍️
              </span>
            </button>

            {/* XP Points */}
            <div
              onClick={() => onNavigate('challenges')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-xs font-bold cursor-pointer hover:bg-orange-100 transition-colors"
              title="Điểm kinh nghiệm XP học tập"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{progress.xp} XP</span>
            </div>

            {/* Streak */}
            <div
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold"
              title="Chuỗi ngày học tập liên tục"
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>{progress.streakDays} ngày</span>
            </div>

            {/* Profile Avatar / Student Name */}
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
              title="Xem Hồ sơ học sinh"
            >
              <StudentAvatar
                studentInfo={studentInfo}
                size={28}
                showFrame={false}
                className="shadow-2xs rounded-xl"
              />
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 max-w-[110px] truncate">
                {studentInfo.fullName || 'Nguyễn Ngọc Kim Ngân'}
              </span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Lower tier: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 py-1.5 border-t border-slate-100 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playTabSwitch();
                  onNavigate(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg">
          {/* Mobile Grade selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cấp học:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['tieuhoc', 'thcs', 'thpt'] as GradeLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    handleLevelSelect(lvl);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg border text-center ${
                    gradeLevel === lvl
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {lvl === 'tieuhoc' ? 'Tiểu học' : lvl === 'thcs' ? 'THCS' : 'THPT (Lớp 11)'}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playTabSwitch();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border ${
                  currentPage === item.id
                    ? 'bg-sky-50 text-sky-800 border-sky-300 font-black'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
