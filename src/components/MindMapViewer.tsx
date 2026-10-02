import React, { useState, useMemo } from 'react';
import {
  curriculumMindMaps,
  PillarMindMap,
  MindMapBranch,
} from '../data/mindMapData';
import {
  Sparkles,
  GitBranch,
  LayoutGrid,
  BookmarkCheck,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  Layers,
  BookOpen,
  Search,
  Share2,
  Eye,
  FileCheck,
  Volume2,
  X,
  ExternalLink,
} from 'lucide-react';

export interface MindMapViewerProps {
  pillarId?: string;
  onSelectPillar?: (id: string) => void;
  showAllOption?: boolean;
}

export type ViewMode = 'tree' | 'visual' | 'blocks' | 'cheatSheet';

export const MindMapViewer: React.FC<MindMapViewerProps> = ({
  pillarId = 'all',
  onSelectPillar,
  showAllOption = true,
}) => {
  const [activePillarKey, setActivePillarKey] = useState<string>(pillarId);
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({
    all: true,
  });
  const [isExpandedFull, setIsExpandedFull] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubBranch, setSelectedSubBranch] = useState<{
    title: string;
    keyPoints: string[];
    highlightTag?: string;
    branchTitle: string;
  } | null>(null);

  // Sync if prop changes
  React.useEffect(() => {
    if (pillarId) {
      setActivePillarKey(pillarId);
    }
  }, [pillarId]);

  const mindMapData: PillarMindMap =
    curriculumMindMaps[activePillarKey] ||
    curriculumMindMaps['all'] ||
    curriculumMindMaps['location'];

  const pillarTabs = [
    { id: 'all', label: 'Toàn Bộ Chuyên Đề 11', icon: '🧠', tag: 'Tổng hợp' },
    { id: 'location', label: '1. Vị trí & Tự nhiên', icon: '🌐', tag: '3,44 tr. km²' },
    { id: 'resources', label: '2. Tài nguyên biển', icon: '💎', tag: '4 nhóm' },
    { id: 'cooperation', label: '3. Hợp tác quốc tế', icon: '🤝', tag: 'UNCLOS 1982' },
    { id: 'cause-effect', label: '4. Mô hình Nhân - Quả', icon: '🔄', tag: 'Bền vững' },
    { id: 'vietnam', label: '5. Biển đảo Việt Nam', icon: '🇻🇳', tag: '1.010.274 km²' },
  ];

  const handlePillarChange = (key: string) => {
    setActivePillarKey(key);
    if (onSelectPillar && key !== 'all') {
      onSelectPillar(key);
    }
    // reset search
    setSearchQuery('');
  };

  const toggleBranch = (branchId: string) => {
    setExpandedBranches((prev) => ({
      ...prev,
      [branchId]: prev[branchId] === undefined ? false : !prev[branchId],
    }));
  };

  const toggleAll = (expand: boolean) => {
    const newState: Record<string, boolean> = { all: expand };
    mindMapData.branches.forEach((b) => {
      newState[b.id] = expand;
    });
    setExpandedBranches(newState);
  };

  const getBranchBorderColor = (color: string) => {
    switch (color) {
      case 'sky':
        return 'border-sky-400 bg-sky-50/50 text-sky-950';
      case 'emerald':
        return 'border-emerald-400 bg-emerald-50/50 text-emerald-950';
      case 'amber':
        return 'border-amber-400 bg-amber-50/50 text-amber-950';
      case 'purple':
        return 'border-purple-400 bg-purple-50/50 text-purple-950';
      case 'rose':
        return 'border-rose-400 bg-rose-50/50 text-rose-950';
      case 'indigo':
        return 'border-indigo-400 bg-indigo-50/50 text-indigo-950';
      default:
        return 'border-slate-300 bg-slate-50 text-slate-900';
    }
  };

  const getBadgeStyle = (color: string) => {
    switch (color) {
      case 'sky':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'amber':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'rose':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getConnectorColor = (color: string) => {
    switch (color) {
      case 'sky':
        return 'bg-sky-500 text-sky-500';
      case 'emerald':
        return 'bg-emerald-500 text-emerald-500';
      case 'amber':
        return 'bg-amber-500 text-amber-500';
      case 'purple':
        return 'bg-purple-500 text-purple-500';
      case 'rose':
        return 'bg-rose-500 text-rose-500';
      case 'indigo':
        return 'bg-indigo-500 text-indigo-500';
      default:
        return 'bg-slate-500 text-slate-500';
    }
  };

  // Filtered branches based on search query
  const filteredBranches = useMemo(() => {
    if (!searchQuery.trim()) return mindMapData.branches;
    const q = searchQuery.toLowerCase();
    return mindMapData.branches.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.subBranches.some(
          (sb) =>
            sb.title.toLowerCase().includes(q) ||
            sb.keyPoints.some((kp) => kp.toLowerCase().includes(q)) ||
            (sb.highlightTag && sb.highlightTag.toLowerCase().includes(q))
        )
    );
  }, [mindMapData, searchQuery]);

  return (
    <div
      id="mindmap-section"
      className={`rounded-3xl border border-sky-200/90 bg-gradient-to-b from-sky-50/40 via-white to-white shadow-md transition-all duration-300 ${
        isExpandedFull ? 'p-6 sm:p-8' : 'p-5 sm:p-7'
      }`}
    >
      {/* 1. TOP TITLE & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-sky-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-600" />
            Sơ Đồ Tư Duy Tinh Gọn & Hệ Thống Hóa Toàn Bộ Kiến Thức
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <span>{mindMapData.centerIcon}</span>
            <span>{mindMapData.centerTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {mindMapData.curriculumRef}
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('tree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'tree'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Phân Nhánh</span>
            </button>

            <button
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'visual'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sơ Đồ Trực Quan</span>
            </button>

            <button
              onClick={() => setViewMode('blocks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'blocks'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Sơ Đồ Khối</span>
            </button>

            <button
              onClick={() => setViewMode('cheatSheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'cheatSheet'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Từ Khóa Ôn Thi</span>
            </button>
          </div>

          {/* Expand/Collapse All (tree view) */}
          {viewMode === 'tree' && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold text-slate-600">
              <button
                onClick={() => toggleAll(true)}
                className="px-2 py-1 rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
                title="Mở rộng tất cả các nhánh"
              >
                Mở hết
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => toggleAll(false)}
                className="px-2 py-1 rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
                title="Thu gọn các nhánh"
              >
                Thu gọn
              </button>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsExpandedFull(!isExpandedFull)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title={isExpandedFull ? 'Thu gọn kích thước' : 'Xem rộng hơn'}
          >
            {isExpandedFull ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 2. PILLAR SELECTOR RIBBON */}
      {showAllOption && (
        <div className="mt-4 pt-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Chọn phạm vi sơ đồ tư duy:</span>
            <span className="text-sky-700 font-semibold lowercase">
              (bấm để xem toàn bộ hoặc từng phần)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {pillarTabs.map((tab) => {
              const isActive = activePillarKey === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handlePillarChange(tab.id)}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-sky-600 shadow-sm shadow-sky-600/30 scale-[1.02]'
                      : 'bg-white hover:bg-sky-50/70 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{tab.icon}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-white/25 text-white' : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {tab.tag}
                    </span>
                  </div>
                  <div
                    className={`font-black text-xs mt-1.5 line-clamp-1 ${
                      isActive ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. GOLDEN TAKEAWAY RIBBON */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-amber-900 uppercase tracking-wide text-xs">
              Ghi nhớ cốt lõi (Chuẩn SGK 11):
            </span>
          </div>
          <p className="font-medium text-amber-900/90 leading-relaxed">
            {mindMapData.quickTakeaway}
          </p>
        </div>
      </div>

      {/* 4. SEARCH FILTER BAR */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm nhanh từ khóa trong sơ đồ (UNCLOS, 3,44 triệu km², Hoàng Sa...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          Hiển thị: <strong className="text-slate-800">{filteredBranches.length}</strong> nhánh kiến thức
        </div>
      </div>

      {/* 5. VIEW 1: INTERACTIVE BRANCH TREE (SƠ ĐỒ PHÂN NHÁNH) */}
      {viewMode === 'tree' && (
        <div className="mt-6 space-y-6">
          {/* Center Root Hub */}
          <div className="flex flex-col items-center text-center">
            <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 text-white shadow-lg border-2 border-sky-400">
              <span className="text-2xl">{mindMapData.centerIcon}</span>
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-wider text-sky-300">
                  Tâm sơ đồ tư duy • SGK Địa lí 11
                </div>
                <div className="text-sm sm:text-base font-black tracking-tight text-white">
                  {mindMapData.centerTitle}
                </div>
              </div>
            </div>
            <div className="w-0.5 h-5 bg-sky-300"></div>
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredBranches.map((branch, idx) => {
              const isExpanded =
                expandedBranches[branch.id] !== undefined
                  ? expandedBranches[branch.id]
                  : true;

              return (
                <div
                  key={branch.id}
                  className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${getBranchBorderColor(
                    branch.color
                  )}`}
                >
                  {/* Branch Header */}
                  <div
                    onClick={() => toggleBranch(branch.id)}
                    className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-black/5 transition-colors select-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl shrink-0 p-1.5 rounded-xl bg-white shadow-xs">
                        {branch.icon || '📌'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${getBadgeStyle(
                              branch.color
                            )}`}
                          >
                            Nhánh {idx + 1}: {branch.badge}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1 leading-snug">
                          {branch.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {branch.summary}
                        </p>
                      </div>
                    </div>

                    <button className="p-1 text-slate-400 hover:text-slate-700 shrink-0 mt-1">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Sub-branches */}
                  {isExpanded && (
                    <div className="p-4 pt-2 border-t border-black/5 bg-white/80 space-y-3">
                      {branch.subBranches.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${getConnectorColor(
                                  branch.color
                                ).split(' ')[0]}`}
                              ></span>
                              {sub.title}
                            </h5>

                            {sub.highlightTag && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-200 shrink-0">
                                {sub.highlightTag}
                              </span>
                            )}
                          </div>

                          <ul className="space-y-1.5 pl-3 border-l-2 border-slate-100">
                            {sub.keyPoints.map((pt, pIdx) => (
                              <li
                                key={pIdx}
                                className="text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-sky-600 font-bold mt-0.5">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. VIEW 2: VISUAL CANVAS DIAGRAM (SƠ ĐỒ TRỰC QUAN ĐỒ HỌA) */}
      {viewMode === 'visual' && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl text-center relative overflow-hidden shadow-inner">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <span className="text-3xl animate-pulse block mb-1">
                {mindMapData.centerIcon}
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-sky-400 bg-sky-950/80 px-3 py-0.5 rounded-full border border-sky-800">
                Tâm Sơ Đồ Tư Duy
              </span>
              <h4 className="text-lg sm:text-xl font-black mt-1 text-white">
                {mindMapData.centerTitle}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl mx-auto mt-1">
                {mindMapData.centerSubtitle}
              </p>
            </div>
          </div>

          {/* Visual Canvas Nodes Flow */}
          <div className="space-y-4">
            {filteredBranches.map((b, bIdx) => (
              <div
                key={b.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-200/80 shadow-xs space-y-3"
              >
                {/* Node Level 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-sm shrink-0">
                      0{bIdx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{b.icon}</span>
                        <h5 className="font-black text-sm sm:text-base text-slate-900">
                          {b.title}
                        </h5>
                      </div>
                      <span className="text-xs text-slate-500">{b.summary}</span>
                    </div>
                  </div>

                  {b.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 self-start sm:self-auto shrink-0">
                      {b.badge}
                    </span>
                  )}
                </div>

                {/* Subnodes Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {b.subBranches.map((sb) => (
                    <div
                      key={sb.id}
                      onClick={() =>
                        setSelectedSubBranch({
                          title: sb.title,
                          keyPoints: sb.keyPoints,
                          highlightTag: sb.highlightTag,
                          branchTitle: b.title,
                        })
                      }
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-sky-700">
                            {sb.title}
                          </span>
                          {sb.highlightTag && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                              {sb.highlightTag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                          {sb.keyPoints[0]}
                        </p>
                      </div>

                      <div className="text-[10px] text-sky-600 font-bold flex items-center gap-1">
                        <span>Chi tiết ghi nhớ</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. VIEW 3: HIERARCHICAL BLOCKS (SƠ ĐỒ KHỐI) */}
      {viewMode === 'blocks' && (
        <div className="mt-6 space-y-5">
          <div className="p-4 rounded-2xl bg-sky-950 text-white text-center space-y-1">
            <div className="text-xs font-bold text-sky-300 uppercase tracking-widest">
              TRỤ CỘT TRUNG TÂM
            </div>
            <div className="text-lg sm:text-xl font-black">
              {mindMapData.centerTitle}
            </div>
            <div className="text-xs text-sky-200/80 max-w-xl mx-auto">
              {mindMapData.centerSubtitle}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBranches.map((b, i) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-400 shadow-xs flex flex-col justify-between space-y-3 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{b.icon}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Khối 0{i + 1}
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-slate-900 mt-2">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {b.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                  {b.subBranches.map((sb) => (
                    <div
                      key={sb.id}
                      className="flex items-center justify-between gap-1 py-0.5"
                    >
                      <span className="font-semibold text-slate-800 line-clamp-1">
                        ▸ {sb.title}
                      </span>
                      {sb.highlightTag && (
                        <span className="text-[9px] font-bold text-sky-700 shrink-0">
                          {sb.highlightTag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. VIEW 4: EXAM KEYWORDS (TỪ KHÓA ÔN THI) */}
      {viewMode === 'cheatSheet' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Khái niệm cốt lõi & Bẫy đề thi cần nhớ (Chuẩn SGK 11 mới):
            </span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✓ Dành cho ôn tập trắc nghiệm & tự luận
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mindMapData.examKeywords.map((kw, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5 hover:border-sky-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-800 text-xs font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {kw.term}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-7">
                  {kw.definition}
                </p>

                {kw.trapNote && (
                  <div className="ml-7 p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start gap-2 text-xs text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-950 font-black">Lưu ý bẫy đề thi: </strong>
                      <span>{kw.trapNote}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-branch Detail Modal */}
      {selectedSubBranch && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-sky-200 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  {selectedSubBranch.branchTitle}
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {selectedSubBranch.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedSubBranch(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Các điểm kiến thức then chốt:
              </span>
              <ul className="space-y-2">
                {selectedSubBranch.keyPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedSubBranch(null)}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors"
            >
              Đã ghi nhớ kiến thức
            </button>
          </div>
        </div>
      )}

      {/* Footer Citation */}
      <div className="mt-6 pt-4 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>Hệ thống hóa chuẩn xác theo SGK Chuyên đề Địa lí 11 (GDPT 2018).</span>
        </div>

        <div className="font-bold text-sky-700">
          💡 Chọn &quot;Toàn Bộ Chuyên Đề 11&quot; để bao quát toàn cảnh 5 trụ cột trước khi làm bài thi.
        </div>
      </div>
    </div>
  );
};
