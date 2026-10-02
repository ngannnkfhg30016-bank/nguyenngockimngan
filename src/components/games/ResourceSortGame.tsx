import React, { useState, useEffect } from 'react';
import {
  Fish,
  Flame,
  Ship,
  Palmtree,
  Trophy,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { millionaireAudio } from '../../utils/millionaireAudio';

export interface ResourceItemData {
  id: string;
  name: string;
  category: 'fishery' | 'mineral' | 'maritime' | 'tourism';
  icon: string;
  location: string;
  desc: string;
  sgkFact: string;
}

const EXTENDED_RESOURCES: ResourceItemData[] = [
  {
    id: 'res-1',
    name: 'Dầu mỏ mỏ Bạch Hổ',
    category: 'mineral',
    icon: '🛢️',
    location: 'Bể trầm tích Cửu Long, thềm lục địa Nam Bộ',
    desc: 'Mỏ dầu có sản lượng lớn nhất Việt Nam, được khai thác từ tầng đá móng nứt nẻ.',
    sgkFact: 'Dầu mỏ Biển Đông là nguồn nguyên liệu chiến lược cho các nhà máy lọc dầu Dung Quất, Nghi Sơn.',
  },
  {
    id: 'res-2',
    name: 'Cá ngừ đại dương Phú Yên',
    category: 'fishery',
    icon: '🐟',
    location: 'Vùng biển xa bờ Nam Trung Bộ',
    desc: 'Loài hải sản di cư giá trị kinh tế cao, xuất khẩu sang Nhật Bản, Hoa Kỳ, EU.',
    sgkFact: 'Vùng biển Việt Nam có hơn 2.000 loài cá, trong đó có khoảng 110 loài có giá trị kinh tế cao.',
  },
  {
    id: 'res-3',
    name: 'Cảng nước sâu Cái Mép - Thị Vải',
    category: 'maritime',
    icon: '🚢',
    location: 'Bà Rịa - Vũng Tàu',
    desc: 'Cụm cảng biển nước sâu đặc biệt của Việt Nam đón được tàu mẹ tải trọng đến 250.000 DWT đi thẳng bờ Tây Hoa Kỳ.',
    sgkFact: 'Hệ thống cảng biển nước sâu đóng vai trò cửa ngõ giao thương quốc tế của vùng kinh tế trọng điểm phía Nam.',
  },
  {
    id: 'res-4',
    name: 'Kỳ quan Vịnh Hạ Long',
    category: 'tourism',
    icon: '🏝️',
    location: 'Quảng Ninh, Vịnh Bắc Bộ',
    desc: 'Di sản Thiên nhiên Thế giới được UNESCO công nhận với hàng nghìn đảo đá vôi karst kỳ vĩ.',
    sgkFact: 'Vịnh Hạ Long kết hợp với quần đảo Cát Bà tạo thành quần thể di sản thiên nhiên liên tỉnh độc nhất vô nhị.',
  },
  {
    id: 'res-5',
    name: 'Khí tự nhiên mỏ Lan Tây - Lan Đỏ',
    category: 'mineral',
    icon: '🔥',
    location: 'Bể trầm tích Nam Côn Sơn',
    desc: 'Được vận chuyển bằng đường ống ngầm về cung cấp cho cụm khí - điện - đạm Phú Mỹ và Nhơn Trạch.',
    sgkFact: 'Trữ lượng khí tự nhiên của thềm lục địa Việt Nam ước tính hàng trăm tỉ m³.',
  },
  {
    id: 'res-6',
    name: 'Tôm he & Hải sâm đảo Bạch Long Vĩ',
    category: 'fishery',
    icon: '🦐',
    location: 'Vịnh Bắc Bộ',
    desc: 'Đặc sản biển giàu dưỡng chất, phát triển tự nhiên tại các bãi rạn quanh đảo xa bờ.',
    sgkFact: 'Bạch Long Vĩ là một trong những ngư trường lớn trọng điểm của miền Bắc.',
  },
  {
    id: 'res-7',
    name: 'Cảng cửa ngõ quốc tế Lạch Huyện',
    category: 'maritime',
    icon: '⚓',
    location: 'Hải Phòng',
    desc: 'Cảng container nước sâu lớn nhất miền Bắc, tạo động lực phát triển hành lang kinh tế ven biển.',
    sgkFact: 'Cảng Lạch Huyện cho phép hàng hóa miền Bắc đi thẳng châu Âu, châu Mỹ không cần trung chuyển.',
  },
  {
    id: 'res-8',
    name: 'Bãi biển Mỹ Khê & Bán đảo Sơn Trà',
    category: 'tourism',
    icon: '🏖️',
    location: 'Đà Nẵng',
    desc: 'Bãi biển cát trắng mịn từng được tạp chí quốc tế Forbes bình chọn là một trong những bãi biển quyến rũ nhất hành tinh.',
    sgkFact: 'Bờ biển Việt Nam dài 3.260 km sở hữu hơn 120 bãi tắm đẹp thích hợp phát triển du lịch nghỉ dưỡng quanh năm.',
  },
  {
    id: 'res-9',
    name: 'Băng cháy (Khí Hydrate tự nhiên)',
    category: 'mineral',
    icon: '🧊',
    location: 'Đáy biển sâu Biển Đông',
    desc: 'Nguồn năng lượng hóa thạch tiềm năng tương lai nằm kết tinh dưới lớp trầm tích đáy biển ở áp suất cao và nhiệt độ thấp.',
    sgkFact: 'Biển Đông được đánh giá là một trong những bồn trũng có tiềm năng băng cháy rất lớn của châu Á.',
  },
  {
    id: 'res-10',
    name: 'Tổ yến đảo Yến Nha Trang & Cù Lao Chàm',
    category: 'fishery',
    icon: '🪺',
    location: 'Vách đá các đảo ven bờ Khánh Hòa, Quảng Nam',
    desc: 'Sản vật thiên nhiên quý báu từ loài chim yến biển, có giá trị kinh tế và dinh dưỡng hàng đầu.',
    sgkFact: 'Nghề khai thác yến sào tự nhiên là nét văn hóa kinh tế biển độc đáo hàng trăm năm của cư dân ven biển miền Trung.',
  },
  {
    id: 'res-11',
    name: 'Tuyến luồng hàng hải quốc tế Malacca - Đông Á',
    category: 'maritime',
    icon: '🧭',
    location: 'Trung tâm Biển Đông',
    desc: 'Một trong những tuyến vận tải biển tấp nập nhất hành tinh, chuyên chở trên 50% lượng dầu mỏ thương mại thế giới.',
    sgkFact: 'Biển Đông là huyết mạch giao thương kết nối Ấn Độ Dương với Thái Bình Dương, Thái Bình Dương với Đại Tây Dương.',
  },
  {
    id: 'res-12',
    name: 'Rạn san hô Hòn Mun & Vườn quốc gia Côn Đảo',
    category: 'tourism',
    icon: '🪸',
    location: 'Nha Trang & Bà Rịa - Vũng Tàu',
    desc: 'Các khu bảo tồn biển có độ đa dạng sinh học san hô cao nhất Việt Nam, điểm lặn biển sinh thái trứ danh.',
    sgkFact: 'Bảo tồn rạn san hô gắn liền với du lịch sinh thái có trách nhiệm là định hướng phát triển bền vững Chuyên đề 11.',
  },
  {
    id: 'res-13',
    name: 'Cát thủy tinh Cam Ranh',
    category: 'mineral',
    icon: '✨',
    location: 'Khánh Hòa',
    desc: 'Khoáng sản phi kim loại ven biển với độ tinh khiết SiO2 cực cao, dùng trong công nghệ chế tạo kính quang học và vi mạch.',
    sgkFact: 'Ven biển miền Trung còn có tiềm năng titan, zircon và cát thạch anh phân bố rộng rãi.',
  },
  {
    id: 'res-14',
    name: 'Muối biển công nghiệp Cà Ná & Sa Huỳnh',
    category: 'mineral',
    icon: '🧂',
    location: 'Ninh Thuận & Quảng Ngãi',
    desc: 'Được sản xuất từ nước biển với độ mặn cao và số giờ nắng trên 2.600 giờ/năm của vùng Nam Trung Bộ.',
    sgkFact: 'Nghề làm muối biển (diêm nghiệp) cung cấp nguyên liệu cho công nghiệp hóa chất và đời sống.',
  },
  {
    id: 'res-15',
    name: 'Trang trại điện gió ngoài khơi Bạc Liêu',
    category: 'mineral',
    icon: '💨',
    location: 'Vùng biển nông Bạc Liêu - Cà Mau',
    desc: 'Năng lượng tái tạo sạch khai thác sức gió biển khơi dồi dào, giảm phát thải khí nhà kính ròng.',
    sgkFact: 'Chiến lược kinh tế biển Việt Nam ưu tiên phát triển năng lượng gió biển và điện sóng.',
  },
  {
    id: 'res-16',
    name: 'Cá cơm than & Nước mắm truyền thống Phú Quốc',
    category: 'fishery',
    icon: '🏺',
    location: 'Vịnh Thái Lan, Kiên Giang',
    desc: 'Sản phẩm chỉ dẫn địa lý đầu tiên của Việt Nam được bảo hộ tại Liên minh Châu Âu (EU).',
    sgkFact: 'Ngư trường Kiên Giang - Vịnh Thái Lan có nguồn lợi cá nổi phong phú làm nên thương hiệu nước mắm truyền thống hàng trăm năm.',
  },
];

interface ResourceSortGameProps {
  onAddXp: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenShop?: () => void;
}

export const ResourceSortGame: React.FC<ResourceSortGameProps> = ({
  onAddXp,
  onAddCoins,
  onUnlockBadge,
  onOpenShop,
}) => {
  const [deck, setDeck] = useState<ResourceItemData[]>(() => [...EXTENDED_RESOURCES]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
    item: ResourceItemData;
  } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [classifiedHistory, setClassifiedHistory] = useState<
    { item: ResourceItemData; userCat: string; isCorrect: boolean }[]
  >([]);

  const currentItem = deck[currentIndex];

  const handleClassify = (chosenCategory: 'fishery' | 'mineral' | 'maritime' | 'tourism') => {
    if (isFinished || !currentItem) return;

    const isCorrect = currentItem.category === chosenCategory;

    if (isCorrect) {
      millionaireAudio.playMatchSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Streak multiplier bonus
      const bonus = newStreak >= 3 ? (newStreak >= 5 ? 25 : 20) : 15;
      setScore((s) => s + bonus);
      onAddXp(bonus);

      setFeedback({
        isCorrect: true,
        text: `👏 Chính xác! "${currentItem.name}" thuộc nhóm này! (+${bonus} XP${
          newStreak >= 3 ? ` • Combo x${newStreak}! 🔥` : ''
        })`,
        item: currentItem,
      });

      setClassifiedHistory((prev) => [
        ...prev,
        { item: currentItem, userCat: chosenCategory, isCorrect: true },
      ]);
    } else {
      millionaireAudio.playWrong();
      setStreak(0);
      setFeedback({
        isCorrect: false,
        text: `⚠️ Chưa đúng! "${currentItem.name}" không thuộc nhóm này. Hãy đọc kỹ gợi ý SGK nhé!`,
        item: currentItem,
      });

      setClassifiedHistory((prev) => [
        ...prev,
        { item: currentItem, userCat: chosenCategory, isCorrect: false },
      ]);
    }

    // Advance to next after a short pause or click
    if (currentIndex + 1 < deck.length) {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setFeedback(null);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsFinished(true);
        millionaireAudio.playPowerup();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        onUnlockBadge('explorer');
        if (onAddCoins) {
          onAddCoins(60);
        }
      }, 1600);
    }
  };

  const handleRestart = () => {
    // Shuffle deck
    const shuffled = [...EXTENDED_RESOURCES].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setFeedback(null);
    setIsFinished(false);
    setClassifiedHistory([]);
  };

  const categories = [
    {
      id: 'fishery' as const,
      name: 'Sinh vật & Thủy hải sản',
      sub: 'Cá ngừ, tôm, yến sào, san hô',
      icon: <Fish className="w-5 h-5" />,
      color: 'bg-emerald-500 hover:bg-emerald-600 border-emerald-300 text-white',
      cardBg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-950',
    },
    {
      id: 'mineral' as const,
      name: 'Khoáng sản & Năng lượng',
      sub: 'Dầu khí, băng cháy, muối, điện gió',
      icon: <Flame className="w-5 h-5" />,
      color: 'bg-amber-500 hover:bg-amber-600 border-amber-300 text-white',
      cardBg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 text-amber-950',
    },
    {
      id: 'maritime' as const,
      name: 'Giao thông & Hàng hải',
      sub: 'Cảng nước sâu, luồng tàu quốc tế',
      icon: <Ship className="w-5 h-5" />,
      color: 'bg-blue-500 hover:bg-blue-600 border-blue-300 text-white',
      cardBg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 text-blue-950',
    },
    {
      id: 'tourism' as const,
      name: 'Du lịch & Biển đảo',
      sub: 'Vịnh Hạ Long, bãi tắm, lặn biển',
      icon: <Palmtree className="w-5 h-5" />,
      color: 'bg-purple-500 hover:bg-purple-600 border-purple-300 text-white',
      cardBg: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 text-purple-950',
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            Trò chơi tương tác phản xạ • Địa lí 11 GDPT 2018
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            📦 Phân Loại Tài Nguyên Biển Đông Siêu Tốc
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Nhận diện 16 sản vật, khoáng sản và tiềm năng kinh tế biển để đưa vào đúng rổ phân loại!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak indicator */}
          {streak > 1 && (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl text-red-700 font-black text-xs animate-bounce">
              <Zap className="w-4 h-4 fill-red-500 text-red-500" />
              Combo x{streak}!
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-2xl text-xs font-bold text-orange-900">
            Điểm thưởng: <span className="text-orange-600 text-base font-black">{score} XP</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-2.5 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 border border-slate-200"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress meter */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            Thẻ tài nguyên {Math.min(currentIndex + 1, deck.length)} / {deck.length}
          </span>
          <span>{Math.round((currentIndex / deck.length) * 100)}% Hoàn thành</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-orange-500 via-amber-500 to-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex) / deck.length) * 100}%` }}
          />
        </div>
      </div>

      {!isFinished && currentItem ? (
        <div className="space-y-6">
          {/* Target Card Stage */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-sky-950 text-white p-6 sm:p-8 shadow-xl border border-sky-800/40">
            <div className="absolute -right-8 -top-8 text-9xl opacity-10 pointer-events-none select-none">
              {currentItem.icon}
            </div>

            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-orange-500/30 text-orange-300 border border-orange-400/30 text-xs px-3 py-1 rounded-full font-bold">
                  📍 {currentItem.location}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Nhiệm vụ {currentIndex + 1}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl sm:text-5xl drop-shadow-md">{currentItem.icon}</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentItem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {currentItem.desc}
                  </p>
                </div>
              </div>

              {/* SGK Fact hint */}
              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 text-xs text-amber-200 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                <span>
                  <strong>Kiến thức Chuyên đề 11:</strong> {currentItem.sgkFact}
                </span>
              </div>
            </div>
          </div>

          {/* Feedback banner if available */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl text-sm font-bold border flex items-center gap-3 transition-all animate-fade-in ${
                feedback.isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-red-50 text-red-900 border-red-200'
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* 4 Interactive Drop / Click Baskets */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Bấm chọn nhanh chiếc rổ phù hợp cho tài nguyên này:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleClassify(cat.id)}
                  disabled={feedback !== null}
                  className={`p-5 rounded-2xl border-2 text-left transition-all group relative overflow-hidden transform active:scale-98 ${cat.cardBg} ${
                    feedback !== null ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-110 ${cat.color}`}
                    >
                      {cat.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-700">
                      Chọn rổ ➔
                    </span>
                  </div>

                  <h4 className="font-black text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Finished Screen */
        <div className="py-12 text-center space-y-6 max-w-lg mx-auto">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-inner border border-amber-200">
            🏆
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Xuất Sắc! Hoàn Thành Toàn Bộ 16 Tài Nguyên!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Bạn đã thể hiện sự am hiểu sâu sắc về tài nguyên sinh vật, khoáng sản, năng lượng, giao thông hàng hải và du lịch Biển Đông theo đúng Chuyên đề Địa lí 11!
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
            <div>
              <div className="text-xs text-slate-500">Tổng điểm</div>
              <div className="text-xl font-black text-orange-600">+{score} XP</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Xu Biển Đông</div>
              <div className="text-xl font-black text-amber-500">+60 🪙</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Combo đỉnh</div>
              <div className="text-xl font-black text-red-600">x{maxStreak}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Huy hiệu</div>
              <div className="text-xl font-black text-emerald-600">Khám Phá 💎</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Chơi Lại Luyện Phản Xạ
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
    </div>
  );
};
