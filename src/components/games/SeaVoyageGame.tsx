import React, { useState } from 'react';
import {
  Compass,
  Ship,
  Shield,
  Fuel,
  Users,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Navigation,
  Wind,
  Anchor,
  Radio,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { millionaireAudio } from '../../utils/millionaireAudio';

interface VoyageStage {
  id: string;
  title: string;
  locationName: string;
  coordsText: string;
  mapPercent: { x: number; y: number };
  scenarioTitle: string;
  situation: string;
  options: {
    text: string;
    fuelDelta: number;
    moraleDelta: number;
    sovereigntyDelta: number;
    xp: number;
    isOptimal: boolean;
    feedback: string;
  }[];
}

const VOYAGE_STAGES: VoyageStage[] = [
  {
    id: 'stage-1',
    title: 'Chặng 1: Xuất bến Cảng Hải Phòng & Đảo Bạch Long Vĩ',
    locationName: 'Hải Phòng & Bạch Long Vĩ',
    coordsText: '20°08\'B, 107°43\'Đ',
    mapPercent: { x: 42, y: 18 },
    scenarioTitle: 'Gặp thời tiết biển động & bão nhiệt đới số 2',
    situation:
      'Tàu KN-290 vừa rời luồng Lạch Huyện ra vùng biển đảo Bạch Long Vĩ thì đài khí tượng báo áp thấp nhiệt đới mạnh lên thành bão cấp 9 giật cấp 11, sóng biển cao 3-4 mét. Một số tàu cá của ngư dân chưa kịp vào nơi tránh trú.',
    options: [
      {
        text: 'Bật còi hú và phát tín hiệu vô tuyến dẫn đường cho tàu cá ngư dân cùng tiến vào âu cảng tránh bão Bạch Long Vĩ, hỗ trợ chằng buộc neo đậu.',
        fuelDelta: -10,
        moraleDelta: +15,
        sovereigntyDelta: +20,
        xp: 30,
        isOptimal: true,
        feedback:
          'Quyết định mẫu mực! Âu tàu Bạch Long Vĩ là trung tâm dịch vụ hậu cần nghề cá và tránh bão trọng yếu của vịnh Bắc Bộ. Thủy thủ đoàn và bà con ngư dân an toàn tuyệt đối!',
      },
      {
        text: 'Mặc kệ tàu cá, tăng hết tốc lực vượt sóng lớn băng ra biển khơi để kịp tiến độ hải trình.',
        fuelDelta: -25,
        moraleDelta: -20,
        sovereigntyDelta: -15,
        xp: 10,
        isOptimal: false,
        feedback:
          'Nguy hiểm! Tàu bị rung lắc dữ dội, tiêu tốn lượng lớn nhiên liệu và bỏ rơi đồng bào ngư dân trong lúc nguy nan.',
      },
    ],
  },
  {
    id: 'stage-2',
    title: 'Chặng 2: Vịnh Bắc Bộ & Đường phân định 21 điểm',
    locationName: 'Vịnh Bắc Bộ',
    coordsText: '19°20\'B, 107°10\'Đ',
    mapPercent: { x: 46, y: 28 },
    scenarioTitle: 'Tuần tra ranh giới Hiệp định phân định Vịnh Bắc Bộ năm 2000',
    situation:
      'Hệ thống radar hàng hải phát hiện đội tàu cá chưa rõ quốc tịch đang khai thác bằng lưới cào sát điểm số 9 trên đường phân định biên giới biển giữa Việt Nam và Trung Quốc.',
    options: [
      {
        text: 'Tiếp cận hòa bình, dùng loa quốc tế thông báo tọa độ đường phân định theo Hiệp định 2000, kiểm tra giấy phép khai thác trong Vùng đánh cá chung.',
        fuelDelta: -10,
        moraleDelta: +15,
        sovereigntyDelta: +25,
        xp: 35,
        isOptimal: true,
        feedback:
          'Chính xác! Việt Nam và Trung Quốc đã ký Hiệp định phân định Vịnh Bắc Bộ 2000 với 21 điểm ranh giới rõ ràng. Thực thi pháp luật kiên quyết, kiên trì và đúng luật pháp quốc tế!',
      },
      {
        text: 'Bắn pháo sáng đe dọa từ xa và quay đầu bỏ đi không ghi nhận nhật ký tuần tra.',
        fuelDelta: -5,
        moraleDelta: -15,
        sovereigntyDelta: -20,
        xp: 10,
        isOptimal: false,
        feedback:
          'Sai lầm! Xử lý thiếu chuyên nghiệp có thể gây căng thẳng không cần thiết và không thực hiện đúng chức trách lực lượng kiểm ngư.',
      },
    ],
  },
  {
    id: 'stage-3',
    title: 'Chặng 3: Hải phận Quần đảo Hoàng Sa',
    locationName: 'Quần đảo Hoàng Sa (TP Đà Nẵng)',
    coordsText: '16°30\'B, 112°00\'Đ',
    mapPercent: { x: 58, y: 40 },
    scenarioTitle: 'Khảo sát khí tượng hải văn & Khẳng định chủ quyền lịch sử',
    situation:
      'Tàu tiếp cận vùng biển quần đảo Hoàng Sa. Đội ngũ nghiên cứu khoa học muốn thu thập mẫu vi nhựa đáy biển, đo nhiệt độ lớp nước sâu và định vị các đảo san hô (đảo Tri Tôn, đảo Hoàng Sa).',
    options: [
      {
        text: 'Triển khai thiết bị đo đạc hải văn vi sinh, ghi hình tư liệu khoa học, đồng thời phát bản tin khẳng định chủ quyền lịch sử không thể tranh cãi của Việt Nam.',
        fuelDelta: -10,
        moraleDelta: +20,
        sovereigntyDelta: +30,
        xp: 40,
        isOptimal: true,
        feedback:
          'Tuyệt vời! Nhà nước phong kiến Việt Nam (từ Đội Hoàng Sa triều Nguyễn, Phủ biên tạp lục 1776) đã xác lập, thực thi chủ quyền hòa bình, liên tục từ thế kỷ XVII.',
      },
      {
        text: 'Bỏ qua công tác đo đạc khoa học để tiết kiệm thời gian chạy nhanh sang khu vực khác.',
        fuelDelta: -5,
        moraleDelta: -10,
        sovereigntyDelta: 0,
        xp: 15,
        isOptimal: false,
        feedback:
          'Bỏ lỡ cơ hội quý giá để bổ sung dữ liệu hải văn và nghiên cứu tài nguyên phục vụ quản trị biển bền vững.',
      },
    ],
  },
  {
    id: 'stage-4',
    title: 'Chặng 4: Quần đảo Trường Sa & Tiếp tế các đảo',
    locationName: 'Quần đảo Trường Sa (Khánh Hòa)',
    coordsText: '8°50\'B, 114°20\'Đ',
    mapPercent: { x: 62, y: 64 },
    scenarioTitle: 'Tiếp tế nước ngọt, rau xanh và hệ thống năng lượng mặt trời',
    situation:
      'Tàu cập đảo Song Tử Tây và đảo Trường Sa Lớn. Các chiến sĩ và người dân trên đảo chào đón nồng nhiệt. Thuyền trưởng cần phân bổ hàng tiếp tế và hỗ trợ sửa chữa máy phát điện gió trên đảo.',
    options: [
      {
        text: 'Chuyển giao hạt giống rau chịu mặn, hệ thống pin năng lượng mặt trời, kiểm tra trạm xá cấp cứu ngư dân và tặng tủ sách pháp luật biển.',
        fuelDelta: -10,
        moraleDelta: +25,
        sovereigntyDelta: +25,
        xp: 40,
        isOptimal: true,
        feedback:
          'Ý nghĩa sâu sắc! Xây dựng Trường Sa thành trung tâm kinh tế - xã hội, văn hóa trên biển, chỗ dựa vững chắc cho ngư dân vươn khơi bám biển!',
      },
      {
        text: 'Chỉ giao hàng nhanh rồi neo tàu ngoài xa, không giao lưu và không kiểm tra hệ thống dân sinh.',
        fuelDelta: -5,
        moraleDelta: -15,
        sovereigntyDelta: 0,
        xp: 15,
        isOptimal: false,
        feedback:
          'Không gắn kết tình quân dân cá nước và chưa phát huy hết vai trò hậu cần của đội tàu kiểm ngư.',
      },
    ],
  },
  {
    id: 'stage-5',
    title: 'Chặng 5: Cụm Nhà giàn DK1 & Bãi ngầm Tư Chính',
    locationName: 'Bãi Tư Chính & Nhà giàn DK1',
    coordsText: '7°32\'B, 109°36\'Đ',
    mapPercent: { x: 50, y: 76 },
    scenarioTitle: 'Bảo vệ thềm lục địa phía Nam & Cột mốc thép tiền tiêu',
    situation:
      'Tàu tuần tra qua Cụm Dịch vụ Kinh tế - Khoa học Kỹ thuật (Nhà giàn DK1) tại Bãi ngầm Tư Chính. Đây là khu vực thềm lục địa hoàn toàn thuộc quyền chủ quyền và quyền tài phán của Việt Nam theo UNCLOS 1982.',
    options: [
      {
        text: 'Cập nhà giàn kiểm tra hệ thống thông tin liên lạc, tiếp tế lương thực và duy trì tuần tra bảo vệ giàn khoan khai thác dầu khí thềm lục địa.',
        fuelDelta: -10,
        moraleDelta: +20,
        sovereigntyDelta: +30,
        xp: 40,
        isOptimal: true,
        feedback:
          'Vô cùng kiên cường! Các cụm Nhà giàn DK1 dựng từ năm 1989 là những cột mốc chủ quyền bằng thép khẳng định quyền chủ quyền trên thềm lục địa 200 hải lý.',
      },
      {
        text: 'Tránh xa khu vực bãi ngầm vì sợ sóng lớn và dòng hải lưu phức tạp.',
        fuelDelta: 0,
        moraleDelta: -20,
        sovereigntyDelta: -25,
        xp: 10,
        isOptimal: false,
        feedback:
          'Bãi ngầm Tư Chính là vùng biển thiêng liêng giàu tiềm năng dầu khí cần được bảo vệ thường trực!',
      },
    ],
  },
  {
    id: 'stage-6',
    title: 'Chặng 6: Côn Đảo - Vịnh Thái Lan - Cảng Phú Quốc',
    locationName: 'Côn Đảo & Phú Quốc',
    coordsText: '10°15\'B, 103°58\'Đ',
    mapPercent: { x: 30, y: 78 },
    scenarioTitle: 'Bảo tồn Vườn quốc gia biển & Tuần tra Vịnh Thái Lan',
    situation:
      'Chặng cuối của hải trình đưa tàu vượt qua Vườn quốc gia Côn Đảo (nơi bảo tồn rùa biển đẻ trứng lớn nhất Việt Nam) rồi vòng qua Mũi Cà Mau cập cảng An Thới, Phú Quốc. Tàu phát hiện một cá thể rùa vích biển mắc vào lưới ma trôi dạt.',
    options: [
      {
        text: 'Lập tức hạ xuồng cứu sinh cắt lưới giải cứu chú rùa biển, bàn giao cho kiểm lâm Vườn quốc gia theo dõi rồi cập cảng Phú Quốc an toàn.',
        fuelDelta: -10,
        moraleDelta: +25,
        sovereigntyDelta: +25,
        xp: 45,
        isOptimal: true,
        feedback:
          'Tuyệt vời! Hành động nhân văn bảo vệ sinh thái biển quý hiếm. Bạn đã hoàn thành trọn vẹn chuyến hải trình lịch sử vòng quanh Biển Đông Việt Nam!',
      },
      {
        text: 'Bỏ qua chú rùa để cập cảng sớm hơn 1 giờ đồng hồ.',
        fuelDelta: 0,
        moraleDelta: -20,
        sovereigntyDelta: -10,
        xp: 15,
        isOptimal: false,
        feedback:
          'Rùa biển (vích, đồi mồi) là loài sách đỏ cần được ưu tiên bảo vệ theo Chuyên đề Địa lí 11.',
      },
    ],
  },
];

interface SeaVoyageGameProps {
  onAddXp: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenShop?: () => void;
}

export const SeaVoyageGame: React.FC<SeaVoyageGameProps> = ({
  onAddXp,
  onAddCoins,
  onUnlockBadge,
  onOpenShop,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [fuel, setFuel] = useState<number>(85);
  const [morale, setMorale] = useState<number>(80);
  const [sovereignty, setSovereignty] = useState<number>(75);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([
    'Tàu KN-290 nhổ neo tại Cảng Hải Phòng. Sẵn sàng hải trình tuần tra Biển Đông!',
  ]);

  const currentStage = VOYAGE_STAGES[currentStageIdx];

  const handleChoose = (optIndex: number) => {
    if (selectedOption !== null || isFinished) return;
    setSelectedOption(optIndex);

    const opt = currentStage.options[optIndex];
    if (opt.isOptimal) {
      millionaireAudio.playMatchSuccess();
    } else {
      millionaireAudio.playWrong();
    }

    // Apply stat changes
    setFuel((f) => Math.max(0, Math.min(100, f + opt.fuelDelta)));
    setMorale((m) => Math.max(0, Math.min(100, m + opt.moraleDelta)));
    setSovereignty((s) => Math.max(0, Math.min(100, s + opt.sovereigntyDelta)));
    setTotalScore((sc) => sc + opt.xp);
    onAddXp(opt.xp);

    setLog((prev) => [
      `[${currentStage.locationName}] ${opt.isOptimal ? '✅ Quyết định tối ưu' : '⚠️ Xử lý cần rút kinh nghiệm'}: ${opt.feedback}`,
      ...prev,
    ]);
  };

  const handleNextStage = () => {
    if (currentStageIdx + 1 < VOYAGE_STAGES.length) {
      millionaireAudio.playPop();
      setCurrentStageIdx((idx) => idx + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      millionaireAudio.playPowerup();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onUnlockBadge('master');
      if (onAddCoins) {
        onAddCoins(80);
      }
    }
  };

  const handleRestart = () => {
    setCurrentStageIdx(0);
    setFuel(85);
    setMorale(80);
    setSovereignty(75);
    setTotalScore(0);
    setSelectedOption(null);
    setIsFinished(false);
    setLog(['Khởi động lại hải trình. Tàu KN-290 nạp đầy nhiên liệu sẵn sàng xuất bến!']);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            Mô phỏng chiến thuật & Hải trình Biển Đông • GDPT 2018
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            ⚓ Hải Trình Vượt Sóng Biển Đông (Tàu KN-290)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Chỉ huy tàu tuần tra vượt 6 chặng then chốt, đưa ra quyết sách bảo vệ chủ quyền và bà con ngư dân!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-2xl text-xs font-bold text-orange-900">
            Điểm uy tín hải trình: <span className="text-orange-600 text-base font-black">{totalScore} XP</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-2.5 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 border border-slate-200"
            title="Khởi động lại hải trình"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ship Dashboard Status Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Fuel Meter */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-amber-500" /> Nhiên liệu tàu
            </span>
            <span className="font-mono">{fuel}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                fuel > 40 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${fuel}%` }}
            />
          </div>
        </div>

        {/* Morale Meter */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-500" /> Tinh thần thủy thủ
            </span>
            <span className="font-mono">{morale}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                morale > 50 ? 'bg-blue-500' : 'bg-amber-500'
              }`}
              style={{ width: `${morale}%` }}
            />
          </div>
        </div>

        {/* Sovereignty Meter */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" /> Uy tín chủ quyền
            </span>
            <span className="font-mono">{sovereignty}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${sovereignty}%` }}
            />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Voyage Radar Map */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
            {/* Background Radar grid effect */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="flex items-center justify-between relative z-10 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                <Navigation className="w-4 h-4 animate-pulse" />
                RADAR HẢI TRÌNH BIỂN ĐÔNG
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Chặng {currentStageIdx + 1}/6
              </span>
            </div>

            {/* Visual Radar Map Canvas with Waypoints */}
            <div className="relative w-full aspect-4/3 bg-linear-to-b from-sky-950 via-slate-900 to-slate-950 rounded-2xl border border-sky-900/40 overflow-hidden">
              {/* Center sweep beam */}
              <div className="absolute inset-0 rounded-full border border-sky-500/20 m-4 animate-ping opacity-20 pointer-events-none" />

              {/* Waypoints */}
              {VOYAGE_STAGES.map((stg, sIdx) => {
                const isCurrent = sIdx === currentStageIdx;
                const isPast = sIdx < currentStageIdx;
                return (
                  <div
                    key={stg.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{ left: `${stg.mapPercent.x}%`, top: `${stg.mapPercent.y}%` }}
                  >
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all ${
                        isCurrent
                          ? 'w-8 h-8 bg-orange-500 text-white ring-4 ring-orange-400/40 font-black text-xs z-30 shadow-lg'
                          : isPast
                          ? 'w-5 h-5 bg-emerald-500 text-white font-bold text-[10px] z-20'
                          : 'w-4 h-4 bg-slate-700 text-slate-400 text-[9px] z-10'
                      }`}
                    >
                      {isCurrent ? <Ship className="w-4 h-4 animate-bounce" /> : sIdx + 1}
                    </div>

                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-bold shadow-xs ${
                        isCurrent
                          ? 'bg-orange-600 text-white font-extrabold z-30 ring-1 ring-white/20'
                          : isPast
                          ? 'bg-slate-800 text-emerald-400 z-20'
                          : 'bg-slate-800/80 text-slate-400 z-10'
                      }`}
                    >
                      {stg.locationName}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current coordinates info */}
            <div className="bg-slate-800/80 p-3 rounded-xl text-xs space-y-1 relative z-10 font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Vị trí hiện tại:</span>
                <span className="text-sky-300 font-bold">{currentStage.locationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tọa độ GPS:</span>
                <span className="text-amber-300">{currentStage.coordsText}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Situation & Decision Choices */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                {currentStage.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentStage.scenarioTitle}
              </h3>
              <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-xs sm:text-sm text-sky-950 leading-relaxed font-medium">
                {currentStage.situation}
              </div>
            </div>

            {/* Option Cards */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Mệnh lệnh chỉ huy của Thuyền trưởng:
              </div>

              {currentStage.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                return (
                  <div
                    key={oIdx}
                    onClick={() => handleChoose(oIdx)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? opt.isOptimal
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md'
                          : 'bg-amber-50 border-amber-500 text-amber-950 shadow-md'
                        : selectedOption !== null
                        ? 'opacity-60 bg-slate-50 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-orange-50/50 hover:border-orange-400 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                          isSelected
                            ? opt.isOptimal
                              ? 'bg-emerald-500 text-white'
                              : 'bg-amber-500 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>

                      <div className="space-y-2 flex-1">
                        <div className="font-bold text-xs sm:text-sm leading-snug">{opt.text}</div>

                        {isSelected && (
                          <div className="pt-2 border-t border-slate-200 text-xs leading-relaxed space-y-1">
                            <div className="font-bold flex items-center gap-1.5">
                              {opt.isOptimal ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span className="text-emerald-700">Đánh giá chiến thuật: Tối ưu (+{opt.xp} XP)</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                                  <span className="text-amber-700">Đánh giá chiến thuật: Cần hoàn thiện (+{opt.xp} XP)</span>
                                </>
                              )}
                            </div>
                            <p className="text-slate-700">{opt.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next stage button */}
            {selectedOption !== null && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextStage}
                  className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
                >
                  Tiếp Tục Hải Trình Đến Chặng {currentStageIdx + 2 < 7 ? currentStageIdx + 2 : 'Đích'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Finished Voyage Screen */
        <div className="py-12 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-inner border border-orange-200">
            🚢
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Chúc Mừng Thuyền Trưởng Đã Cập Bến Thắng Lợi!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Tàu KN-290 đã hoàn thành xuất sắc nhiệm vụ tuần tra, tiếp tế và nghiên cứu khoa học xuyên suốt các vùng biển Vịnh Bắc Bộ, Hoàng Sa, Trường Sa, Tư Chính, Côn Đảo và Phú Quốc!
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
            <div>
              <div className="text-xs text-slate-500">Tổng điểm</div>
              <div className="text-xl font-black text-orange-600">+{totalScore} XP</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Xu Biển Đông</div>
              <div className="text-xl font-black text-amber-500">+80 🪙</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Chủ quyền đạt</div>
              <div className="text-xl font-black text-emerald-600">{sovereignty}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Huy hiệu đạt</div>
              <div className="text-xl font-black text-blue-600">Thuyền Trưởng ⚓</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Bắt Đầu Chuyến Hải Trình Mới
            </button>
            {onOpenShop && (
              <button
                onClick={onOpenShop}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
              >
                🛍️ Đến Shop Kiến Sáng
              </button>
            )}
          </div>
        </div>
      )}

      {/* Log Feed */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-orange-600" /> Nhật Ký Hải Trình Tàu KN-290:
        </div>
        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-2 text-xs text-slate-600 font-mono">
          {log.map((entry, idx) => (
            <div key={idx} className="border-l-2 border-orange-400 pl-2 py-0.5">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
