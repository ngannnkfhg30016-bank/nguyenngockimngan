// Dữ liệu tùy biến Avatar Học Tập Biển Đông cho học sinh
// Gắn liền với các biểu tượng phong phú của linh vật Kiến Sáng FPT

export interface AvatarPersona {
  id: string;
  name: string;
  role: string;
  costumeId: string;
  icon: string;
  description: string;
  badge: string;
  tagColor: string;
}

export interface AvatarBackground {
  id: string;
  name: string;
  gradientClass: string;
  previewColor: string;
  description: string;
}

export interface AvatarFrame {
  id: string;
  name: string;
  frameClass: string;
  glowClass: string;
  description: string;
}

export const AVATAR_PERSONAS: AvatarPersona[] = [
  {
    id: 'ant_learner',
    name: 'Kiến Sáng Chăm Học',
    role: 'Học sinh Tiên phong',
    costumeId: 'default',
    icon: '🐜',
    description: 'Phong cách năng động, sẵn sàng tiếp thu mọi kiến thức Địa lí mới.',
    badge: 'FPT School',
    tagColor: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    id: 'ant_scholar',
    name: 'Kiến Sáng Thủ Khoa',
    role: 'Cử nhân Danh giá',
    costumeId: 'graduate',
    icon: '🎓',
    description: 'Đội mũ cử nhân FPT trí tuệ, biểu trưng cho sự uyên bác và chăm chỉ.',
    badge: 'Thủ khoa',
    tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    id: 'ant_officer',
    name: 'Kiến Sáng Sĩ Quan Hải Quân',
    role: 'Chỉ huy Hàng hải',
    costumeId: 'captain',
    icon: '⚓',
    description: 'Mũ thuyền trưởng kiêu hãnh với huy hiệu mỏ neo mạ vàng Biển Đông.',
    badge: 'Chỉ huy',
    tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    id: 'ant_patriot',
    name: 'Kiến Sáng Yêu Nước',
    role: 'Vươn Khơi Bám Biển',
    costumeId: 'non_la',
    icon: '👒',
    description: 'Chiếc nón lá truyền thống gắn dải ruy băng sao vàng Tổ quốc thiêng liêng.',
    badge: 'Yêu nước',
    tagColor: 'bg-red-100 text-red-800 border-red-300',
  },
  {
    id: 'ant_navigator',
    name: 'Kiến Sáng Hoa Tiêu',
    role: 'Định vị Hải trình',
    costumeId: 'compass',
    icon: '🧭',
    description: 'Mang la bàn vàng trắc địa, dẫn đường an toàn qua các luồng hàng hải quốc tế.',
    badge: 'Hoa tiêu',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 'ant_guardian',
    name: 'Kiến Sáng Vệ Binh Biển',
    role: 'Tuần tra An toàn',
    costumeId: 'lifevest',
    icon: '🦺',
    description: 'Áo phao phản quang cao cấp, luôn sẵn sàng ứng phó sóng gió và cứu nạn.',
    badge: 'An toàn',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'ant_diver',
    name: 'Kiến Sáng Thợ Lặn',
    role: 'Thám hiểm Lòng Biển',
    costumeId: 'diver',
    icon: '🤿',
    description: 'Kính lặn và ống thở chuyên dụng khám phá rạn san hô Trường Sa và Hòn Mun.',
    badge: 'Thám hiểm',
    tagColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
  {
    id: 'ant_scientist',
    name: 'Kiến Sáng Nhà Hải Dương',
    role: 'Nghiên cứu Sinh thái',
    costumeId: 'lab_coat',
    icon: '🥼',
    description: 'Áo blouse của chuyên gia Viện Hải dương học, bảo tồn hệ sinh thái biển xanh.',
    badge: 'Bác học',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  {
    id: 'ant_king',
    name: 'Kiến Sáng Hải Vương',
    role: 'Thống lĩnh Đại dương',
    costumeId: 'crown',
    icon: '👑',
    description: 'Vương miện đại dương cẩn ngọc trai tự nhiên và san hô đỏ quý hiếm.',
    badge: 'Huyền thoại',
    tagColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  },
  {
    id: 'ant_laurel',
    name: 'Kiến Sáng Nguyệt Quế',
    role: 'Vinh quang Tri thức',
    costumeId: 'laurel',
    icon: '🌿',
    description: 'Vòng nguyệt quế đúc bằng vàng sáng ngời dành cho học sinh xuất sắc nhất.',
    badge: 'Xuất sắc',
    tagColor: 'bg-lime-100 text-lime-900 border-lime-300',
  },
  {
    id: 'ant_cool',
    name: 'Kiến Sáng Thủy Thủ Ngầu',
    role: 'Phong thái Biển xanh',
    costumeId: 'sunglasses',
    icon: '🕶️',
    description: 'Kính mát phân cực chống chói nắng biển nhiệt đới cực kỳ thời thượng.',
    badge: 'Tự tin',
    tagColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    id: 'ant_scout',
    name: 'Kiến Sáng Kiên Cường',
    role: 'Chiến sĩ Biển đảo',
    costumeId: 'scarf',
    icon: '🧣',
    description: 'Khăn rằn truyền thống gắn liền với khí phách kiên trung của quân dân Tây Nam Bộ.',
    badge: 'Kiên trung',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
];

export const AVATAR_BACKGROUNDS: AvatarBackground[] = [
  {
    id: 'bg_ocean',
    name: 'Biển Sâu Hoàng Gia',
    gradientClass: 'bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800',
    previewColor: '#0284c7',
    description: 'Màu xanh biếc thâm trầm của hải phận và thềm lục địa Việt Nam.',
  },
  {
    id: 'bg_sunset',
    name: 'Hoàng Hôn Trường Sa',
    gradientClass: 'bg-gradient-to-br from-orange-400 via-amber-500 to-rose-600',
    previewColor: '#f97316',
    description: 'Ánh chiều tà rực rỡ tráng lệ trên các đảo đá ngầm Biển Đông.',
  },
  {
    id: 'bg_coral',
    name: 'San Hô Ngọc Bích',
    gradientClass: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-700',
    previewColor: '#10b981',
    description: 'Hệ sinh thái xanh tươi rạng ngời của khu bảo tồn biển Côn Đảo.',
  },
  {
    id: 'bg_royal',
    name: 'Tím Huyền Ảo Hải Đăng',
    gradientClass: 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700',
    previewColor: '#9333ea',
    description: 'Màu trời đêm đầy sao khi ngọn hải đăng Song Tử Tây thắp sáng.',
  },
  {
    id: 'bg_gold',
    name: 'Ánh Kim Chiến Thắng',
    gradientClass: 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600',
    previewColor: '#eab308',
    description: 'Hào quang chiến thắng dành riêng cho học sinh đạt thành tích cao.',
  },
  {
    id: 'bg_pearl',
    name: 'Bạch Ngọc Trai Sáng',
    gradientClass: 'bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100',
    previewColor: '#f8fafc',
    description: 'Tinh khôi, sáng tạo và nhẹ nhàng như viên ngọc trai tự nhiên.',
  },
];

export const AVATAR_FRAMES: AvatarFrame[] = [
  {
    id: 'ocean_blue',
    name: 'Viền Vọng Hải Lam',
    frameClass: 'border-3 border-sky-400 ring-4 ring-sky-300/40',
    glowClass: 'shadow-md shadow-sky-500/30',
    description: 'Khung viền mang nhịp sóng biển tươi mát và thanh bình.',
  },
  {
    id: 'gold_star',
    name: 'Khung Vàng Hoàng Gia',
    frameClass: 'border-3 border-amber-400 ring-4 ring-amber-300/50',
    glowClass: 'shadow-md shadow-amber-500/40',
    description: 'Khung vinh danh cao quý cho những chiến binh tri thức.',
  },
  {
    id: 'fpt_orange',
    name: 'Khung Cam Sáng Tạo FPT',
    frameClass: 'border-3 border-orange-500 ring-4 ring-orange-300/40',
    glowClass: 'shadow-md shadow-orange-500/30',
    description: 'Khung màu cam đặc trưng của trường FPT School năng động.',
  },
  {
    id: 'coral_emerald',
    name: 'Khung San Hô Ngọc Bích',
    frameClass: 'border-3 border-emerald-400 ring-4 ring-teal-300/40',
    glowClass: 'shadow-md shadow-emerald-500/30',
    description: 'Khung viền tượng trưng cho hành động bảo vệ đại dương.',
  },
  {
    id: 'none',
    name: 'Viền Trắng Tối Giản',
    frameClass: 'border-2 border-white/60 ring-2 ring-white/20',
    glowClass: 'shadow-xs',
    description: 'Phong cách tối giản, nhẹ nhàng và thanh lịch.',
  },
];

export interface LearningTitleOption {
  id: string;
  title: string;
  category: 'sovereignty' | 'academic' | 'ecology' | 'economy' | 'spirit';
  categoryLabel: string;
  icon: string;
  desc: string;
}

export const TITLE_CATEGORIES = [
  { id: 'all', label: 'Tất cả danh hiệu' },
  { id: 'sovereignty', label: 'Chủ quyền & Biển đảo 🇻🇳' },
  { id: 'academic', label: 'Học thuật & FPT School 🎓' },
  { id: 'ecology', label: 'Sinh thái & Bảo vệ biển 🪸' },
  { id: 'economy', label: 'Kinh tế & Khát vọng 🚢' },
  { id: 'spirit', label: 'Khám phá & Tinh thần ⚡' },
];

export const STRUCTURED_LEARNING_TITLES: LearningTitleOption[] = [
  // Chủ quyền & Biển đảo
  {
    id: 't_sovereignty_1',
    title: 'Nhà Thám Hiểm Biển Đông 🌊',
    category: 'sovereignty',
    categoryLabel: 'Chủ quyền & Biển đảo',
    icon: '🌊',
    desc: 'Am hiểu tường tận vùng biển đảo quê hương và các tuyến hải trình quốc tế.',
  },
  {
    id: 't_sovereignty_2',
    title: 'Chiến Sĩ Biển Đảo Kiên Trung 🇻🇳',
    category: 'sovereignty',
    categoryLabel: 'Chủ quyền & Biển đảo',
    icon: '🇻🇳',
    desc: 'Tự hào tiếp nối khí phách bất khuất của các thế hệ canh giữ biên cương biển trời.',
  },
  {
    id: 't_sovereignty_3',
    title: 'Hộ Vệ Hoàng Sa & Trường Sa 🛡️',
    category: 'sovereignty',
    categoryLabel: 'Chủ quyền & Biển đảo',
    icon: '🛡️',
    desc: 'Ý chí kiên định bảo vệ toàn vẹn hai quần đảo thiêng liêng của Tổ quốc.',
  },
  {
    id: 't_sovereignty_4',
    title: 'Sứ Giả Hòa Bình UNCLOS 1982 🕊️',
    category: 'sovereignty',
    categoryLabel: 'Chủ quyền & Biển đảo',
    icon: '🕊️',
    desc: 'Lan tỏa tinh thần giải quyết hòa bình các tranh chấp biển dựa trên luật pháp quốc tế.',
  },
  {
    id: 't_sovereignty_5',
    title: 'Người Canh Giữ Cột Mốc A1-A11 ⚓',
    category: 'sovereignty',
    categoryLabel: 'Chủ quyền & Biển đảo',
    icon: '⚓',
    desc: 'Khắc ghi 11 điểm mốc đường cơ sở xác định vùng nội thủy của Việt Nam.',
  },
  {
    id: 't_sovereignty_6',
    title: 'Ngọn Hải Đăng Song Tử Tây 🗼',
    category: 'sovereignty',
    categoryLabel: 'Chủ quyền & Biển đảo',
    icon: '🗼',
    desc: 'Ánh sáng kiên định dẫn đường cho tàu bè giữa muôn trùng sóng gió.',
  },

  // Học thuật & FPT School
  {
    id: 't_academic_1',
    title: 'Học Sinh Tiên Phong FPT 🐜',
    category: 'academic',
    categoryLabel: 'Học thuật & FPT School',
    icon: '🐜',
    desc: 'Mang tinh thần Kiến Sáng: chủ động, tự lập, ham học hỏi và công nghệ cao.',
  },
  {
    id: 't_academic_2',
    title: 'Thủ Khoa Chuyên Đề Địa Lí 11 🎓',
    category: 'academic',
    categoryLabel: 'Học thuật & FPT School',
    icon: '🎓',
    desc: 'Nắm vững toàn diện 5 trụ cột kiến thức chuẩn SGK Địa lí 11 GDPT 2018.',
  },
  {
    id: 't_academic_3',
    title: 'Bác Học Trẻ Hải Dương FPT 🔬',
    category: 'academic',
    categoryLabel: 'Học thuật & FPT School',
    icon: '🔬',
    desc: 'Đam mê nghiên cứu khoa học hải văn, địa chất đáy biển và tài nguyên đại dương.',
  },
  {
    id: 't_academic_4',
    title: 'Chuyên Gia Bản Đồ GIS WGS-84 🛰️',
    category: 'academic',
    categoryLabel: 'Học thuật & FPT School',
    icon: '🛰️',
    desc: 'Đọc bản đồ số, phân tích lớp dữ liệu không gian vệ tinh chuẩn xác.',
  },
  {
    id: 't_academic_5',
    title: 'Kỷ Lục Gia Đấu Trường Tri Thức ⚡',
    category: 'academic',
    categoryLabel: 'Học thuật & FPT School',
    icon: '⚡',
    desc: 'Chinh phục mọi bài kiểm tra trắc nghiệm phân hóa với tốc độ và độ chuẩn xác tuyệt đối.',
  },
  {
    id: 't_academic_6',
    title: 'Kiến Vương Siêu Trí Tuệ 🧠',
    category: 'academic',
    categoryLabel: 'Học thuật & FPT School',
    icon: '🧠',
    desc: 'Sơ đồ hóa kiến thức trừu tượng thành tư duy mạch lạc và dễ nhớ.',
  },

  // Sinh thái & Bảo vệ biển
  {
    id: 't_ecology_1',
    title: 'Vệ Binh Rạn San Hô Hòn Mun 🪸',
    category: 'ecology',
    categoryLabel: 'Sinh thái & Bảo vệ biển',
    icon: '🪸',
    desc: 'Hành động vì màu sắc rực rỡ của các rạn san hô Trường Sa và vịnh Nha Trang.',
  },
  {
    id: 't_ecology_2',
    title: 'Hiệp Sĩ Cứu Hộ Rùa Biển Côn Đảo 🐢',
    category: 'ecology',
    categoryLabel: 'Sinh thái & Bảo vệ biển',
    icon: '🐢',
    desc: 'Bảo vệ bãi đẻ tự nhiên và sự sinh tồn của loài rùa biển quý hiếm.',
  },
  {
    id: 't_ecology_3',
    title: 'Chiến Binh Đại Dương Không Rác Thải ♻️',
    category: 'ecology',
    categoryLabel: 'Sinh thái & Bảo vệ biển',
    icon: '♻️',
    desc: 'Chung tay ngăn chặn rác thải nhựa, giữ cho biển Việt Nam luôn trong xanh.',
  },
  {
    id: 't_ecology_4',
    title: 'Người Bảo Tồn Rừng Đước Cà Mau 🌿',
    category: 'ecology',
    categoryLabel: 'Sinh thái & Bảo vệ biển',
    icon: '🌿',
    desc: 'Giữ gìn lá phổi xanh ngập mặn chắn sóng xâm thực bờ biển.',
  },
  {
    id: 't_ecology_5',
    title: 'Đại Sứ Kinh Tế Tuần Hoàn Xanh 🍃',
    category: 'ecology',
    categoryLabel: 'Sinh thái & Bảo vệ biển',
    icon: '🍃',
    desc: 'Ủng hộ lối sống xanh và phát triển kinh tế biển bền vững.',
  },

  // Kinh tế & Khát vọng
  {
    id: 't_economy_1',
    title: 'Hoa Tiêu Luồng Hàng Hải Quốc Tế 🧭',
    category: 'economy',
    categoryLabel: 'Kinh tế & Khát vọng',
    icon: '🧭',
    desc: 'Dẫn đường các siêu tàu container vượt qua eo biển Malacca và Biển Đông.',
  },
  {
    id: 't_economy_2',
    title: 'Kỹ Sư Năng Lượng Gió Ngoài Khơi 💨',
    category: 'economy',
    categoryLabel: 'Kinh tế & Khát vọng',
    icon: '💨',
    desc: 'Đón đầu xu hướng chuyển dịch năng lượng tái tạo từ sóng và gió biển.',
  },
  {
    id: 't_economy_3',
    title: 'Chỉ Huy Giàn Khoan Bạch Hổ 🛢️',
    category: 'economy',
    categoryLabel: 'Kinh tế & Khát vọng',
    icon: '🛢️',
    desc: 'Khai thác an toàn nguồn vàng đen quý giá từ thềm lục địa phía Nam.',
  },
  {
    id: 't_economy_4',
    title: 'Đô Đốc Cảng Biển Nước Sâu Cái Mép 🚢',
    category: 'economy',
    categoryLabel: 'Kinh tế & Khát vọng',
    icon: '🚢',
    desc: 'Đưa logistics biển Việt Nam vươn tầm top đầu khu vực Đông Nam Á.',
  },
  {
    id: 't_economy_5',
    title: 'Ngư Dân Vươn Khơi Đón Sóng 🐟',
    category: 'economy',
    categoryLabel: 'Kinh tế & Khát vọng',
    icon: '🐟',
    desc: 'Ngư trường Hoàng Sa, Trường Sa luôn rộn rã cờ đỏ sao vàng bám biển.',
  },

  // Khám phá & Tinh thần
  {
    id: 't_spirit_1',
    title: 'Thuyền Trưởng Tương Lai 🏆',
    category: 'spirit',
    categoryLabel: 'Khám phá & Tinh thần',
    icon: '🏆',
    desc: 'Bản lĩnh chỉ huy, sẵn sàng đối mặt sóng to gió lớn để chinh phục mục tiêu.',
  },
  {
    id: 't_spirit_2',
    title: 'Chiến Binh Kiên Trì Bám Đảo 🧗',
    category: 'spirit',
    categoryLabel: 'Khám phá & Tinh thần',
    icon: '🧗',
    desc: 'Không ngại khó khăn thử thách, kiên trì tích lũy từng ngày học tập.',
  },
  {
    id: 't_spirit_3',
    title: 'Nhà Thám Hiểm Rãnh Sâu Biển Đông 🤿',
    category: 'spirit',
    categoryLabel: 'Khám phá & Tinh thần',
    icon: '🤿',
    desc: 'Tò mò khám phá những vực thẳm sâu hơn 5.000m kỳ bí dưới lòng đại dương.',
  },
  {
    id: 't_spirit_4',
    title: 'Hạt Giống Tri Thức Đại Dương 🌱',
    category: 'spirit',
    categoryLabel: 'Khám phá & Tinh thần',
    icon: '🌱',
    desc: 'Khởi đầu hành trình học tập với niềm say mê và tình yêu biển đảo nồng nàn.',
  },
  {
    id: 't_spirit_5',
    title: 'Đại Sứ Biển Đảo Học Đường 🎖️',
    category: 'spirit',
    categoryLabel: 'Khám phá & Tinh thần',
    icon: '🎖️',
    desc: 'Truyền cảm hứng tình yêu biển đảo đến bạn bè và cộng đồng trường học.',
  },
];

// Mảng danh sách chuỗi tương thích ngược với code cũ
export const LEARNING_TITLES: string[] = STRUCTURED_LEARNING_TITLES.map((t) => t.title);

