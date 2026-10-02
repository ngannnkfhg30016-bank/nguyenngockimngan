import React from 'react';
import { PageId, GradeLevel, UserProgress } from '../types';
import { KienSangMascot } from '../components/KienSangMascot';
import {
  Compass,
  BookOpen,
  Gamepad2,
  Bot,
  MapPin,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Fish,
  Globe2,
  Anchor,
  Flame,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  gradeLevel: GradeLevel;
  currentGrade: number;
  progress: UserProgress;
  onOpenChat: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  gradeLevel,
  currentGrade,
  progress,
  onOpenChat,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section - Bright Ocean Blue */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-sky-600 to-cyan-700 text-white p-6 sm:p-10 lg:p-12 shadow-2xl shadow-sky-600/20 border border-sky-400/40">
        {/* Ambient background rings */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-cyan-300/25 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-sky-300/30 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-xs font-bold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
              <span>Chương trình GDPT 2018 – Chuyên đề Địa lí lớp 11</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
              HỌC BIỂN ĐÔNG - KHÁM PHÁ RỘNG
            </h1>

            <p className="text-base sm:text-xl text-sky-100 font-semibold tracking-wide">
              Học Biển Đông – Khám phá rộng mở – Kết nối Việt Nam qua trải nghiệm số
            </p>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
              Chào mừng bạn đến với không gian học tập trực quan số 1 về Biển Đông! Cùng linh vật{' '}
              <strong className="text-amber-300 font-bold">Kiến Sáng 🐜</strong> chu du qua bản đồ số 3D, khám phá vùng biển thiêng liêng 1.010.274 km² của Tổ quốc và chinh phục các trò chơi tương tác hấp dẫn.
            </p>

            {/* 4 Large Action Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => onNavigate('map')}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-5 h-5 text-slate-950" />
                  <span>Khám phá Biển Đông</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => onNavigate('learn')}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-sky-200" />
                  <span>Học theo chủ đề</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/80" />
              </button>

              <button
                onClick={() => onNavigate('games')}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Gamepad2 className="w-5 h-5 text-emerald-200" />
                  <span>Chơi trò chơi</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/80" />
              </button>

              <button
                onClick={onOpenChat}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm backdrop-blur-md transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-5 h-5 text-amber-300" />
                  <span>Hỏi Kiến Sáng</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </div>

          {/* Right Mascot Spotlight Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-white/15 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-2xl relative flex flex-col items-center text-center">
              <div className="absolute -top-3 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                Linh vật FPT School
              </div>

              <div className="my-2 cursor-pointer hover:scale-105 transition-transform" onClick={onOpenChat}>
                <KienSangMascot state="normal" size={170} animated={true} />
              </div>

              <h3 className="text-xl font-black text-white">KIẾN SÁNG 🐜</h3>
              <p className="text-xs text-sky-100 font-bold mt-0.5">
                Người bạn đồng hành thông minh & thân thiện
              </p>

              <p className="text-xs text-white/90 mt-3 leading-relaxed">
                “Chào các bạn học sinh Lớp {currentGrade}! Mình sẽ cùng các bạn giải đáp mọi câu hỏi, đọc bản đồ và vượt qua các thử thách Địa lí Biển Đông!”
              </p>

              <button
                onClick={onOpenChat}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-sky-50 text-blue-900 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                Trò chuyện ngay cùng Kiến Sáng
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Knowledge Pillars Summary */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-black text-sky-700 uppercase tracking-wider">
              Khung nội dung chuẩn SGK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              5 Trụ cột Kiến thức Biển Đông
            </h2>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 self-start cursor-pointer"
          >
            Xem giáo trình chi tiết <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Pillar 1 */}
          <div
            onClick={() => onNavigate('learn')}
            className="group p-5 rounded-2xl bg-white border border-sky-100 hover:border-sky-400 hover:shadow-md hover:shadow-sky-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-sky-600 transition-colors">
                1. Vị trí & Vai trò
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diện tích 3,44 triệu km², từ 3°B đến 26°B. Yết hầu hàng hải thế giới qua eo Ma-lắc-ca.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-sky-600 flex items-center gap-1">
              Khám phá →
            </span>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => onNavigate('learn')}
            className="group p-5 rounded-2xl bg-white border border-sky-100 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Fish className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                2. Tài nguyên Biển
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thủy hải sản (7-8% sản lượng cá thế giới), dầu mỏ, băng cháy, muối và điện gió biển.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              Khám phá →
            </span>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => onNavigate('learn')}
            className="group p-5 rounded-2xl bg-white border border-sky-100 hover:border-amber-400 hover:shadow-md hover:shadow-amber-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                3. Hợp tác Hòa bình
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hiệp định nghề cá Vịnh Bắc Bộ 2000, Hiệp định Vịnh Thái Lan 1997 và UNCLOS 1982.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-amber-600 flex items-center gap-1">
              Khám phá →
            </span>
          </div>

          {/* Pillar 4 */}
          <div
            onClick={() => onNavigate('learn')}
            className="group p-5 rounded-2xl bg-white border border-sky-100 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                4. Kinh tế & Môi trường
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chuỗi nhân quả: Hợp tác hòa bình → Khai thác hợp lí → Phát triển biển bền vững.
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-indigo-600 flex items-center gap-1">
              Khám phá →
            </span>
          </div>

          {/* Pillar 5 */}
          <div
            onClick={() => onNavigate('learn')}
            className="group p-5 rounded-2xl bg-white border border-sky-300 shadow-xs hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/15 transition-all cursor-pointer flex flex-col justify-between bg-gradient-to-b from-sky-50/50 to-white"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                🇻🇳
              </div>
              <h3 className="font-extrabold text-sky-950 text-sm mb-1 group-hover:text-sky-600 transition-colors">
                5. Biển Đông & Việt Nam
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tổng diện tích 1.010.274 km², Hoàng Sa (30.680 km²), Trường Sa (250.800 km²).
              </p>
            </div>
            <span className="mt-4 text-[11px] font-bold text-sky-600 flex items-center gap-1">
              Xem chi tiết →
            </span>
          </div>
        </div>
      </section>

      {/* Gamification Teaser & 6 Games Quick Grid */}
      <section className="bg-gradient-to-br from-sky-50/90 via-blue-50/70 to-cyan-50/80 rounded-3xl p-6 sm:p-8 border border-sky-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-sky-700 uppercase tracking-wider">
              <Gamepad2 className="w-4 h-4 text-sky-600" />
              Góc Học Qua Trải Nghiệm
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              6 Trò Chơi Tương Tác Sáng Tạo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Tích lũy XP, mở khóa danh hiệu “Thuyền trưởng Biển Đông” và trang phục Kiến Sáng!
            </p>
          </div>

          <button
            onClick={() => onNavigate('games')}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-md shadow-sky-600/20 transition-all self-start sm:self-auto cursor-pointer hover:scale-105 active:scale-95"
          >
            Vào phòng trò chơi 🎮
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('games')}
            className="bg-white p-4 rounded-2xl border border-sky-150 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
          >
            <span className="text-2xl p-2 rounded-xl bg-sky-100">🧭</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">1. Định vị Biển Đông</h4>
              <p className="text-xs text-slate-500">Xác định các eo biển, vịnh biển và quần đảo</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('games')}
            className="bg-white p-4 rounded-2xl border border-sky-150 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
          >
            <span className="text-2xl p-2 rounded-xl bg-amber-50">📦</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">2. Phân loại Tài nguyên</h4>
              <p className="text-xs text-slate-500">Phản xạ nhanh 16 tài nguyên vào 4 giỏ biển</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('games')}
            className="bg-white p-4 rounded-2xl border border-sky-150 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
          >
            <span className="text-2xl p-2 rounded-xl bg-blue-50">🚢</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">3. Hải trình Vượt sóng</h4>
              <p className="text-xs text-slate-500">Chỉ huy tàu kiểm ngư KN-290 tuần tra hải phận</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('games')}
            className="bg-white p-4 rounded-2xl border border-sky-150 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
          >
            <span className="text-2xl p-2 rounded-xl bg-purple-50">🧩</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">4. Lật thẻ Ký ức</h4>
              <p className="text-xs text-slate-500">Ghép các cặp thẻ hình ảnh & pháp lý giống nhau</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('games')}
            className="bg-white p-4 rounded-2xl border border-sky-150 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
          >
            <span className="text-2xl p-2 rounded-xl bg-emerald-50">🪸</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">5. Biệt đội Cứu hộ</h4>
              <p className="text-xs text-slate-500">Cứu rạn san hô, thu gom rác & xử lý dầu tràn</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('games')}
            className="bg-white p-4 rounded-2xl border border-sky-300 bg-gradient-to-r from-sky-50/50 to-white hover:border-sky-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
          >
            <span className="text-2xl p-2 rounded-xl bg-sky-100">👑</span>
            <div>
              <h4 className="font-bold text-sm text-sky-950">6. Ai Là Triệu Phú Biển Đông</h4>
              <p className="text-xs text-slate-600">Trường quay 15 câu hỏi, 4 quyền trợ giúp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
