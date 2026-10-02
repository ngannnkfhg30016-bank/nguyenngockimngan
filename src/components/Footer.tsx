import React from 'react';
import { StudentInfo } from '../types';
import { User, School, BookOpen, CheckCircle, Edit3, ShieldAlert } from 'lucide-react';

interface FooterProps {
  studentInfo: StudentInfo;
  onOpenEditModal: () => void;
  onSelectKnowledgeSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  studentInfo,
  onOpenEditModal,
  onSelectKnowledgeSection,
}) => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 border-t-4 border-sky-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 3 Main Required Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* PHẦN 1: THÔNG TIN HỌC SINH VÀ TRƯỜNG */}
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-sm tracking-wide uppercase">
                  <User className="w-4 h-4" />
                  Phần 1: Học sinh & Trường học
                </div>
                <button
                  onClick={onOpenEditModal}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1 rounded-lg transition-colors border border-amber-500/30"
                >
                  <Edit3 className="w-3 h-3" />
                  Chỉnh sửa
                </button>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-baseline justify-between border-b border-slate-750 pb-1.5">
                  <span className="text-slate-400">Họ và tên:</span>
                  <span className="font-bold text-white text-right">
                    {studentInfo.fullName || 'Nguyễn Ngọc Kim Ngân'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-slate-750 pb-1.5">
                  <span className="text-slate-400">Mã số học sinh:</span>
                  <span className="font-mono font-bold text-orange-400 text-right">
                    {studentInfo.studentId || 'FHG30016'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-slate-750 pb-1.5">
                  <span className="text-slate-400">Lớp:</span>
                  <span className="font-bold text-white text-right">
                    {studentInfo.gradeClass || '11A'}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-slate-750 pb-1.5">
                  <span className="text-slate-400">Tên trường:</span>
                  <span className="font-bold text-amber-300 text-right">
                    {studentInfo.schoolName || 'Trường Tiểu học, THCS & THPT FPT Hậu Giang'}
                  </span>
                </div>
                <div className="pt-1 text-xs text-slate-400">
                  <span className="block text-slate-500 mb-0.5">Địa chỉ trường:</span>
                  <span className="text-slate-300 italic">
                    {studentInfo.schoolAddress || 'quốc lộ 61C, xã Vị Thủy, thành phố Cần Thơ'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Dự án giáo dục học tập trải nghiệm - GDPT 2018</span>
            </div>
          </div>

          {/* PHẦN 2: ĐỀ TÀI NGHIÊN CỨU */}
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wide uppercase border-b border-slate-700 pb-3 mb-4">
                <BookOpen className="w-4 h-4" />
                Phần 2: Đề tài Nghiên cứu
              </div>

              <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-800/60 text-xs sm:text-sm text-sky-100 leading-relaxed font-medium mb-3">
                <strong className="text-amber-300 block mb-1">Đề tài:</strong>
                “Xây dựng web app giới thiệu Biển Đông theo Chuyên đề Địa lí lớp 11, kết hợp bản đồ và trò chơi tương tác liên hệ với Việt Nam.”
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Mục tiêu của web app là giúp học sinh học kiến thức địa lý thông qua bản đồ số chân thực, sơ đồ nguyên nhân - kết quả và 6 trò chơi tương tác sáng tạo, bồi dưỡng tình yêu và trách nhiệm với biển đảo quê hương.
              </p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-slate-700/60 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Bám sát Chuyên đề 11.1 - NXB Giáo dục Việt Nam</span>
              </div>
              <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
                <span>🐜 Đồng hành cùng linh vật Kiến Sáng FPT School</span>
              </div>
            </div>
          </div>

          {/* PHẦN 3: KHUNG KIẾN THỨC CHUẨN */}
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide uppercase border-b border-slate-700 pb-3 mb-4">
              <CheckCircle className="w-4 h-4" />
              Phần 3: Khung Kiến thức Chuẩn SGK
            </div>

            <p className="text-xs text-slate-400 mb-3">
              5 Mục kiến thức cốt lõi bắt buộc theo Chương trình GDPT 2018:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li
                onClick={() => onSelectKnowledgeSection && onSelectKnowledgeSection('location')}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-700/80 transition-colors border border-slate-750 flex items-start gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-sky-500/30 text-sky-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Vị trí & vai trò của Biển Đông:</strong> Diện tích 3,44 triệu km², vĩ tuyến 3°B - 26°B, 9 quốc gia ven biển, vai trò chiến lược với ĐNA và Việt Nam.
                </span>
              </li>

              <li
                onClick={() => onSelectKnowledgeSection && onSelectKnowledgeSection('resources')}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-700/80 transition-colors border border-slate-750 flex items-start gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Tài nguyên & khai thác chủ yếu:</strong> Thủy hải sản (7-8% thế giới), dầu mỏ, khí đốt, khoáng sản, cảng biển nước sâu, du lịch biển và điện gió.
                </span>
              </li>

              <li
                onClick={() => onSelectKnowledgeSection && onSelectKnowledgeSection('cooperation')}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-700/80 transition-colors border border-slate-750 flex items-start gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-amber-500/30 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Hợp tác hòa bình:</strong> Hiệp định nghề cá Vịnh Bắc Bộ (2000), Hiệp định Vịnh Thái Lan (1997), tôn trọng luật quốc tế UNCLOS 1982 và DOC.
                </span>
              </li>

              <li
                onClick={() => onSelectKnowledgeSection && onSelectKnowledgeSection('cause-effect')}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-700/80 transition-colors border border-slate-750 flex items-start gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-indigo-500/30 text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Ý nghĩa đối với kinh tế & môi trường:</strong> Mô hình nhân quả: Hợp tác hòa bình → Khai thác hợp lí → Phát triển bền vững.
                </span>
              </li>

              <li
                onClick={() => onSelectKnowledgeSection && onSelectKnowledgeSection('vietnam')}
                className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-700/80 transition-colors border border-slate-750 flex items-start gap-2 cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-orange-500/30 text-orange-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <span>
                  <strong>Biển Đông và Việt Nam 🇻🇳:</strong> 1.010.274 km² diện tích biển, Quần đảo Hoàng Sa (30.680 km²), Quần đảo Trường Sa (250.800 km²), 4 ngành kinh tế biển then chốt.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright, designer credit and legal disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-400">
            <span className="font-bold text-white tracking-wide">© 2026 HỌC BIỂN ĐÔNG - KHÁM PHÁ RỘNG</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>Dự án số hóa GDPT 2018 FPT School</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 via-amber-500/25 to-orange-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs shadow-xs tracking-wide">
              <span>✨</span>
              <span>designed by NganNNK</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>Nội dung học thuật bám sát Sách Chuyên đề Địa lí 11 (NXB Giáo dục Việt Nam)</span>
          </div>
        </div>

        {/* Highlighted Signature Badge at the very bottom */}
        <div className="mt-4 pt-4 border-t border-slate-800/60 text-center text-xs text-slate-500">
          <p>
            Trang web học tập tương tác <span className="text-sky-400 font-semibold">HỌC BIỂN ĐÔNG - KHÁM PHÁ RỘNG</span> | <span className="text-amber-300 font-bold">designed by NganNNK</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
