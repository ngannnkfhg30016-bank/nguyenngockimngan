import React, { useState } from 'react';
import { RealGisMap } from '../components/RealGisMap';
import { GisPoint } from '../data/gisRealData';
import { GradeLevel } from '../types';
import { Compass, Shield, Info, MapPin, Satellite, Sparkles, Layers } from 'lucide-react';

interface MapPageProps {
  gradeLevel: GradeLevel;
  currentGrade: number;
}

export const MapPage: React.FC<MapPageProps> = ({ gradeLevel, currentGrade }) => {
  const [selectedGisPoint, setSelectedGisPoint] = useState<GisPoint | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-sky-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-sky-700 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-sky-600" />
            Bản Đồ Số Google Maps GIS Chuẩn Trắc Địa Quốc Tế (WGS-84)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex flex-wrap items-center gap-2">
            <span>Bản Đồ GIS Không Gian Biển Đông</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
              Vệ tinh • Địa hình • Giao thông • Mặc định
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Bản đồ số hóa GIS tương tác thời gian thực: tích hợp ảnh vệ tinh quang học độ nét cao, địa hình đồng mức, luồng hàng hải quốc tế, hệ thống mốc đường cơ sở A1-A11, đường phân định Vịnh Bắc Bộ, Quần đảo Hoàng Sa và Quần đảo Trường Sa.
          </p>
        </div>

        {/* GIS Info Badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold self-start lg:self-auto shadow-2xs">
          <Satellite className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Google Maps GIS • Đa Lớp Thông Tin 🛰️</span>
        </div>
      </div>

      {/* Sole Interactive GIS Map */}
      <div className="space-y-6">
        <RealGisMap onSelectPoint={(pt) => setSelectedGisPoint(pt)} />
      </div>

      {/* Pedagogical Note */}
      <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-sky-900">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Lưu ý khoa học Địa lí & Bản đồ học:</strong> Toàn bộ dữ liệu tọa độ mốc cơ sở A1-A11 (Tuyên bố 12/11/1982), 21 điểm đường phân định Vịnh Bắc Bộ (Hiệp định 25/12/2000), Quần đảo Hoàng Sa (thành phố Đà Nẵng), Quần đảo Trường Sa (tỉnh Khánh Hòa) và Nhà giàn DK1 (Bãi Tư Chính) đều được định vị chính xác theo hệ quy chiếu tọa độ trắc địa quốc tế WGS84 và tài liệu pháp lý chính thống của Nhà nước CHXHCN Việt Nam.
        </div>
      </div>
    </div>
  );
};


