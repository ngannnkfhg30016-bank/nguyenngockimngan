import React, { useState, useEffect } from 'react';
import { StudentInfo } from '../types';
import {
  AVATAR_PERSONAS,
  AVATAR_BACKGROUNDS,
  AVATAR_FRAMES,
  LEARNING_TITLES,
  STRUCTURED_LEARNING_TITLES,
  TITLE_CATEGORIES,
} from '../data/avatarOptions';
import { StudentAvatar } from './StudentAvatar';
import { soundManager } from '../utils/soundManager';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  Sparkles,
  Palette,
  Shield,
  Award,
  RotateCcw,
  Save,
  BookOpen,
  User,
  Heart,
  Search,
  Plus,
} from 'lucide-react';

interface AvatarEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  onSave: (updatedInfo: StudentInfo) => void;
}

type EditorTab = 'persona' | 'background' | 'frame' | 'title';

export const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  onSave,
}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(
    studentInfo.avatarId || 'ant_learner'
  );
  const [selectedBgId, setSelectedBgId] = useState<string>(
    studentInfo.avatarBg || 'bg_ocean'
  );
  const [selectedFrameId, setSelectedFrameId] = useState<string>(
    studentInfo.avatarFrame || 'ocean_blue'
  );
  const [selectedTitle, setSelectedTitle] = useState<string>(
    studentInfo.learningTitle || LEARNING_TITLES[0]
  );
  const [activeTab, setActiveTab] = useState<EditorTab>('persona');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [titleCategoryFilter, setTitleCategoryFilter] = useState<string>('all');
  const [titleSearchQuery, setTitleSearchQuery] = useState<string>('');
  const [customTitleInput, setCustomTitleInput] = useState<string>('');

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedAvatarId(studentInfo.avatarId || 'ant_learner');
      setSelectedBgId(studentInfo.avatarBg || 'bg_ocean');
      setSelectedFrameId(studentInfo.avatarFrame || 'ocean_blue');
      setSelectedTitle(studentInfo.learningTitle || LEARNING_TITLES[0]);
      setIsSavedNotice(false);
    }
  }, [isOpen, studentInfo]);

  // Current selected objects
  const currentPersona =
    AVATAR_PERSONAS.find((p) => p.id === selectedAvatarId) || AVATAR_PERSONAS[0];
  const currentBg =
    AVATAR_BACKGROUNDS.find((b) => b.id === selectedBgId) || AVATAR_BACKGROUNDS[0];
  const currentFrame =
    AVATAR_FRAMES.find((f) => f.id === selectedFrameId) || AVATAR_FRAMES[0];

  const handleSave = () => {
    const updated: StudentInfo = {
      ...studentInfo,
      avatarId: selectedAvatarId,
      avatarBg: selectedBgId,
      avatarFrame: selectedFrameId,
      learningTitle: selectedTitle,
    };
    onSave(updated);
    soundManager.playSuccessChime();
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onClose();
    }, 1200);
  };

  const handleResetToDefault = () => {
    setSelectedAvatarId('ant_learner');
    setSelectedBgId('bg_ocean');
    setSelectedFrameId('ocean_blue');
    setSelectedTitle(LEARNING_TITLES[0]);
    soundManager.playPop();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white p-4 sm:p-6 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Chỉnh Sửa Avatar Học Tập
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  Kiến Sáng Cá Nhân Hóa
                </span>
              </div>
              <p className="text-xs sm:text-sm text-sky-100 mt-0.5 font-medium">
                Chọn biểu tượng Kiến Sáng, màu nền đại dương & khung viền để khẳng định phong cách cá nhân!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Đóng bảng chỉnh sửa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Success Notification */}
        {isSavedNotice && (
          <div className="bg-emerald-500 text-white p-2.5 text-center text-xs font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>Đã lưu thành công Avatar học tập mới của bạn!</span>
          </div>
        )}

        {/* Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Left Column: Live Avatar & Student Badge Preview */}
          <div className="lg:col-span-5 p-6 bg-gradient-to-b from-sky-50/60 to-slate-50 flex flex-col justify-between text-center space-y-4">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block">
                Xem Trước Avatar Hồ Sơ
              </span>

              {/* Large Avatar Preview with selected settings */}
              <div className="relative mx-auto flex items-center justify-center p-3">
                <StudentAvatar
                  studentInfo={{
                    avatarId: selectedAvatarId,
                    avatarBg: selectedBgId,
                    avatarFrame: selectedFrameId,
                  }}
                  size={128}
                  showFrame={true}
                  className="transition-all duration-300 hover:scale-105 shadow-xl"
                />
              </div>

              {/* Student Identity Card in Preview */}
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-2xs space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 text-base">
                    {studentInfo.fullName || 'Nguyễn Ngọc Kim Ngân'}
                  </h4>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
                    Lớp {studentInfo.gradeClass || '11A'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-extrabold bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{selectedTitle}</span>
                </div>

                <p className="text-[11px] text-slate-500 italic leading-snug pt-1 border-t border-slate-100">
                  "{currentPersona.description}"
                </p>
              </div>

              {/* Current Attributes Pill */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 text-left">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Biểu tượng:</div>
                  <div className="font-extrabold text-slate-800 truncate flex items-center gap-1">
                    <span>{currentPersona.icon}</span> {currentPersona.name}
                  </div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Màu nền:</div>
                  <div className="font-extrabold text-slate-800 truncate flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-slate-300"
                      style={{ backgroundColor: currentBg.previewColor }}
                    ></span>
                    {currentBg.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleSave}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-sm shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Avatar Học Tập Này</span>
              </button>

              <button
                onClick={handleResetToDefault}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục mặc định</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization Tabs and Options Grid */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
                {[
                  { id: 'persona', label: 'Biểu tượng Kiến Sáng (12)', icon: '🐜' },
                  { id: 'background', label: 'Màu nền Đại dương (6)', icon: '🌊' },
                  { id: 'frame', label: 'Khung viền Danh dự (5)', icon: '🛡️' },
                  { id: 'title', label: `Danh hiệu Học tập (${STRUCTURED_LEARNING_TITLES.length})`, icon: '🏆' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as EditorTab);
                      soundManager.playPop();
                    }}
                    className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: BIỂU TƯỢNG KIẾN SÁNG */}
              {activeTab === 'persona' && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-slate-500 font-medium">
                    Chọn biểu tượng linh vật Kiến Sáng phản ánh tính cách và mục tiêu học tập của bạn:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
                    {AVATAR_PERSONAS.map((persona) => {
                      const isSelected = selectedAvatarId === persona.id;
                      return (
                        <div
                          key={persona.id}
                          onClick={() => {
                            setSelectedAvatarId(persona.id);
                            soundManager.playPop();
                          }}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 relative text-left group ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-2 ring-sky-400/30'
                              : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 p-0.5 group-hover:scale-105 transition-transform">
                            <StudentAvatar
                              studentInfo={{
                                avatarId: persona.id,
                                avatarBg: selectedBgId,
                                avatarFrame: 'none',
                              }}
                              size={44}
                              showFrame={false}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="text-xs font-black text-slate-900 truncate">
                                {persona.name}
                              </h5>
                              <span
                                className={`text-[9px] font-black px-1.5 py-0.5 rounded-md border shrink-0 ${persona.tagColor}`}
                              >
                                {persona.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-sky-700 font-bold mt-0.5">
                              {persona.role}
                            </p>
                            <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                              {persona.description}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: MÀU NỀN ĐẠI DƯƠNG */}
              {activeTab === 'background' && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-slate-500 font-medium">
                    Chọn màu nền gradient lấy cảm hứng từ các sắc thái của biển trời Việt Nam:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
                    {AVATAR_BACKGROUNDS.map((bg) => {
                      const isSelected = selectedBgId === bg.id;
                      return (
                        <div
                          key={bg.id}
                          onClick={() => {
                            setSelectedBgId(bg.id);
                            soundManager.playPop();
                          }}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 relative text-left ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-2 ring-sky-400/30'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl shrink-0 shadow-sm flex items-center justify-center border border-white/40 ${bg.gradientClass}`}
                          >
                            <span className="text-lg">🌊</span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-black text-slate-900">
                              {bg.name}
                            </h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                              {bg.description}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: KHUNG VIỀN DANH DỰ */}
              {activeTab === 'frame' && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-slate-500 font-medium">
                    Chọn khung viền tôn vinh thành tích học tập và sự gắn bó với biển đảo:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[48vh] overflow-y-auto pr-1">
                    {AVATAR_FRAMES.map((frame) => {
                      const isSelected = selectedFrameId === frame.id;
                      return (
                        <div
                          key={frame.id}
                          onClick={() => {
                            setSelectedFrameId(frame.id);
                            soundManager.playPop();
                          }}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 relative text-left ${
                            isSelected
                              ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-2 ring-sky-400/30'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 p-1">
                            <div
                              className={`w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center text-xs text-white ${frame.frameClass}`}
                            >
                              🛡️
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-black text-slate-900">
                              {frame.name}
                            </h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                              {frame.description}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: DANH HIỆU HỌC TẬP */}
              {activeTab === 'title' && (
                <div className="mt-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      Chọn từ {STRUCTURED_LEARNING_TITLES.length} danh hiệu hoặc tự đặt theo sở thích:
                    </span>
                    <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      Đang chọn: {selectedTitle}
                    </span>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                    {TITLE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setTitleCategoryFilter(cat.id);
                          soundManager.playPop();
                        }}
                        className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                          titleCategoryFilter === cat.id
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search and Custom Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    {/* Search box */}
                    <div className="sm:col-span-6 relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={titleSearchQuery}
                        onChange={(e) => setTitleSearchQuery(e.target.value)}
                        placeholder="Tìm danh hiệu nhanh..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    {/* Custom Title Input */}
                    <div className="sm:col-span-6 flex gap-1.5">
                      <input
                        type="text"
                        value={customTitleInput}
                        onChange={(e) => setCustomTitleInput(e.target.value)}
                        placeholder="Tự đặt danh hiệu riêng..."
                        className="flex-1 px-3 py-1.5 rounded-xl border border-amber-200 text-xs bg-amber-50/50 focus:outline-hidden focus:border-amber-500 font-semibold"
                        maxLength={40}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customTitleInput.trim()) {
                            setSelectedTitle(customTitleInput.trim());
                            soundManager.playSuccessChime();
                            setCustomTitleInput('');
                          }
                        }}
                        disabled={!customTitleInput.trim()}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Đặt</span>
                      </button>
                    </div>
                  </div>

                  {/* Titles Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[42vh] overflow-y-auto pr-1">
                    {STRUCTURED_LEARNING_TITLES.filter((item) => {
                      const matchCat =
                        titleCategoryFilter === 'all' || item.category === titleCategoryFilter;
                      const matchSearch =
                        !titleSearchQuery ||
                        item.title.toLowerCase().includes(titleSearchQuery.toLowerCase()) ||
                        item.desc.toLowerCase().includes(titleSearchQuery.toLowerCase());
                      return matchCat && matchSearch;
                    }).map((item) => {
                      const isSelected = selectedTitle === item.title;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedTitle(item.title);
                            soundManager.playPop();
                          }}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-2.5 relative text-left group ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-2 ring-amber-400/30'
                              : 'border-slate-200 hover:border-amber-300 bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h5 className="text-xs font-black text-slate-900 truncate">
                                {item.title}
                              </h5>
                            </div>
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-100/60 px-1.5 py-0.2 rounded-md inline-block mt-0.5">
                              {item.categoryLabel}
                            </span>
                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                              {item.desc}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Tip */}
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>💡 Avatar học tập sẽ đồng bộ hiển thị trên Header và Hồ sơ của bạn.</span>
              <button
                onClick={onClose}
                className="text-slate-600 font-bold hover:text-slate-900 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
