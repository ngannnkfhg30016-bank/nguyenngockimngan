import React from 'react';
import { FileText, ExternalLink, BookOpen, ShieldCheck, CheckCircle2, Bookmark } from 'lucide-react';

interface ReferenceItem {
  title: string;
  authorOrIssuer: string;
  year: string;
  category: 'textbook' | 'legal' | 'resolution';
  summary: string;
}

const referencesList: ReferenceItem[] = [
  {
    title: 'Sách Chuyên đề học tập Địa lí lớp 11 (Chương trình GDPT 2018)',
    authorOrIssuer: 'Bộ Giáo dục và Đào tạo – Nhà xuất bản Giáo dục Việt Nam',
    year: '2023',
    category: 'textbook',
    summary:
      'Chuyên đề 11.1: Một số vấn đề về Biển Đông. Cung cấp hệ thống kiến thức chuẩn xác về vị trí địa lí, phạm vi 3,44 triệu km², các nguồn tài nguyên, hợp tác khai thác hòa bình và liên hệ lãnh thổ biển Việt Nam.',
  },
  {
    title: 'Công ước của Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982)',
    authorOrIssuer: 'Đại hội đồng Liên Hợp Quốc',
    year: '1982',
    category: 'legal',
    summary:
      'Hiến chương quốc tế về đại dương, quy định rõ quy chế pháp lý của nội thủy, lãnh hải (12 hải lý), vùng tiếp giáp (24 hải lý), vùng đặc quyền kinh tế (200 hải lý) và thềm lục địa.',
  },
  {
    title: 'Luật Biển Việt Nam (Luật số 18/2012/QH13)',
    authorOrIssuer: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    year: '2012',
    category: 'legal',
    summary:
      'Xác lập chủ quyền, quyền chủ quyền và quyền tài phán quốc gia của Việt Nam trên các vùng biển và thềm lục địa; quy định phát triển kinh tế biển và quản lý, bảo vệ biển đảo.',
  },
  {
    title: 'Hiệp định Phân định Vịnh Bắc Bộ & Hiệp định Hợp tác Nghề cá',
    authorOrIssuer: 'Chính phủ Việt Nam và Chính phủ Trung Quốc',
    year: '2000 (25-12-2000)',
    category: 'legal',
    summary:
      'Xác định đường phân định lãnh hải, vùng đặc quyền kinh tế và thềm lục địa trong Vịnh Bắc Bộ dựa trên nguyên tắc công bằng và bảo tồn lâu dài nguồn lợi thủy sản sinh vật.',
  },
  {
    title: 'Hiệp định Phân định Ranh giới trên biển trong Vịnh Thái Lan',
    authorOrIssuer: 'Chính phủ Việt Nam và Chính phủ Hoàng gia Thái Lan',
    year: '1997 (09-08-1997)',
    category: 'legal',
    summary:
      'Hiệp định giải quyết dứt điểm vùng biển chồng lấn giữa hai nước trong Vịnh Thái Lan, mở ra giai đoạn hợp tác ổn định và khai thác hòa bình.',
  },
  {
    title: 'Nghị quyết số 36-NQ/TW về Chiến lược phát triển bền vững kinh tế biển Việt Nam',
    authorOrIssuer: 'Ban Chấp hành Trung ương Đảng khóa XII',
    year: '2018',
    category: 'resolution',
    summary:
      'Chiến lược đưa Việt Nam trở thành quốc gia biển mạnh, phát triển bền vững 4 ngành kinh tế biển then chốt, chú trọng bảo tồn hệ sinh thái và kiên quyết bảo vệ chủ quyền biển đảo.',
  },
];

export const ReferencesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            Tài Liệu Tham Khảo & Cơ Sở Pháp Lý
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Nguồn Tài Liệu & Thư Mục Nghiên Cứu
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Toàn bộ dữ liệu, số liệu bản đồ và nội dung web app được trích xuất nghiêm ngặt từ các nguồn văn bản chính thống.
          </p>
        </div>
      </div>

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {referencesList.map((ref, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    ref.category === 'textbook'
                      ? 'bg-sky-100 text-sky-800'
                      : ref.category === 'legal'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {ref.category === 'textbook'
                    ? 'Sách Giáo Khoa'
                    : ref.category === 'legal'
                    ? 'Điều ước & Văn bản Luật'
                    : 'Nghị quyết Chiến lược'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{ref.year}</span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-snug">{ref.title}</h3>
              <p className="text-xs font-semibold text-orange-600 mt-1">{ref.authorOrIssuer}</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{ref.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Đã kiểm định tính chính xác theo GDPT 2018</span>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Disclaimer Box */}
      <div className="p-6 rounded-3xl bg-slate-900 text-slate-300 border border-slate-800 text-xs sm:text-sm space-y-2">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-orange-400" />
          Cam Kết Học Thuật & Tính Chuẩn Xác:
        </h4>
        <p className="leading-relaxed">
          Nội dung ứng dụng không đưa ra các nhận định chính trị chủ quan hay tuyên bố pháp lý không có căn cứ. Mọi thông tin về tọa độ, các hiệp ước song phương, các vùng biển và chủ quyền của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa đều tuân thủ đầy đủ Công ước Quốc tế UNCLOS 1982, Luật Biển Việt Nam 2012 và Chuyên đề Địa lí lớp 11 hiện hành.
        </p>
      </div>
    </div>
  );
};
