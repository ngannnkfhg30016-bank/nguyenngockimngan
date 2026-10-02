import React, { useState, useEffect } from 'react';
import { StudentInfo } from '../types';
import { X, Save, User, School, MapPin, Hash, BookOpen, Palette } from 'lucide-react';
import { StudentAvatar } from './StudentAvatar';

interface StudentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentInfo: StudentInfo;
  onSave: (info: StudentInfo) => void;
  onOpenAvatarModal?: () => void;
}

export const StudentInfoModal: React.FC<StudentInfoModalProps> = ({
  isOpen,
  onClose,
  studentInfo,
  onSave,
  onOpenAvatarModal,
}) => {
  const [formData, setFormData] = useState<StudentInfo>(studentInfo);

  useEffect(() => {
    setFormData(studentInfo);
  }, [studentInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <StudentAvatar studentInfo={formData} size={48} showFrame={true} />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Thông tin Học sinh & Trường học</h3>
              <p className="text-xs text-slate-500">Cập nhật hồ sơ để ghi nhận thành tích học tập và chân trang dự án</p>
            </div>
          </div>

          {onOpenAvatarModal && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAvatarModal();
              }}
              className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              title="Mở giao diện tùy biến Avatar học tập"
            >
              <Palette className="w-3.5 h-3.5 text-sky-600" />
              <span>Đổi Avatar</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-500" />
              Họ và tên học sinh
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="VD: Nguyễn Ngọc Kim Ngân"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-orange-500" />
                Mã số học sinh
              </label>
              <input
                type="text"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="VD: FHG30016"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm font-medium font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                Lớp học
              </label>
              <input
                type="text"
                required
                value={formData.gradeClass}
                onChange={(e) => setFormData({ ...formData, gradeClass: e.target.value })}
                placeholder="VD: 11A"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-orange-500" />
              Tên trường
            </label>
            <input
              type="text"
              required
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="VD: Trường Tiểu học, THCS & THPT FPT Hậu Giang"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Địa chỉ trường
            </label>
            <input
              type="text"
              required
              value={formData.schoolAddress}
              onChange={(e) => setFormData({ ...formData, schoolAddress: e.target.value })}
              placeholder="VD: quốc lộ 61C, xã Vị Thủy, thành phố Cần Thơ"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm font-medium"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
