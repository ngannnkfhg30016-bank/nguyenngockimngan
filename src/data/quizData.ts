import { GradeLevel } from '../types';

export interface QuizQuestion {
  id: string;
  gradeLevel: GradeLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'location' | 'resource' | 'cooperation' | 'vietnam' | 'environment';
}

export const challengeQuizzes: QuizQuestion[] = [
  // TIỂU HỌC (Grade 1 - 5)
  {
    id: 'th-1',
    gradeLevel: 'tieuhoc',
    question: 'Biển Đông nằm ở phía nào của đất nước Việt Nam?',
    options: ['Phía Tây', 'Phía Đông', 'Phía Bắc', 'Phía Nam'],
    correctIndex: 1,
    explanation: 'Biển Đông nằm ở phía Đông đất nước Việt Nam thân yêu, ôm trọn bờ biển hình chữ S của chúng ta!',
    category: 'location',
  },
  {
    id: 'th-2',
    gradeLevel: 'tieuhoc',
    question: 'Hai quần đảo thiêng liêng của Việt Nam nằm trên Biển Đông tên là gì?',
    options: [
      'Quần đảo Hoàng Sa và Quần đảo Trường Sa',
      'Đảo Phú Quốc và Đảo Cát Bà',
      'Đảo Hòn Mun và Đảo Côn Đảo',
      'Đảo Bạch Long Vĩ và Đảo Lý Sơn',
    ],
    correctIndex: 0,
    explanation: 'Quần đảo Hoàng Sa và Quần đảo Trường Sa là hai quần đảo thiêng liêng thuộc chủ quyền của Tổ quốc Việt Nam.',
    category: 'vietnam',
  },
  {
    id: 'th-3',
    gradeLevel: 'tieuhoc',
    question: 'Hành động nào sau đây giúp chúng mình bảo vệ biển xanh và sạch đẹp?',
    options: [
      'Vứt vỏ chai nhựa và túi bóng xuống bãi cát',
      'Cùng nhau nhặt rác trên bãi biển và bỏ vào thùng rác',
      'Bẻ san hô mang về nhà chơi',
      'Bắt các chú cá con đang lớn',
    ],
    correctIndex: 1,
    explanation: 'Nhặt rác và không xả rác bừa bãi giúp giữ cho bãi biển luôn trong lành và các loài sinh vật biển an toàn!',
    category: 'environment',
  },
  {
    id: 'th-4',
    gradeLevel: 'tieuhoc',
    question: 'Tài nguyên nào được gọi là "vàng đen" được khai thác từ đáy biển?',
    options: ['Muối biển', 'Dầu mỏ và khí đốt', 'Cát trắng', 'Tảo biển'],
    correctIndex: 1,
    explanation: 'Dầu mỏ được ví như "vàng đen" quý giá, dùng để chạy xe máy, ô tô, máy bay và sản xuất nhiều vật dụng.',
    category: 'resource',
  },

  // THCS (Grade 6 - 9)
  {
    id: 'cs-1',
    gradeLevel: 'thcs',
    question: 'Vì sao việc khai thác hải sản bằng chất nổ hoặc xung điện lại bị nghiêm cấm?',
    options: [
      'Vì làm hỏng dụng cụ đánh bắt của ngư dân',
      'Vì phá hủy môi trường sống, làm chết hàng loạt cá con và rạn san hô, dẫn đến tuyệt diệt nguồn lợi',
      'Vì làm cho cá không ngon khi nấu ăn',
      'Vì tốn quá nhiều tiền mua thuốc nổ',
    ],
    correctIndex: 1,
    explanation: 'Chất nổ và xung điện có tính hủy diệt hàng loạt, phá nát các rạn san hô cần hàng trăm năm để tái tạo.',
    category: 'environment',
  },
  {
    id: 'cs-2',
    gradeLevel: 'thcs',
    question: 'Tuyến hàng hải quốc tế nhộn nhịp thứ hai thế giới đi qua eo biển nào sau đây ở phía Tây Nam Biển Đông?',
    options: ['Eo biển Bô-xpho', 'Eo biển Ma-lắc-ca', 'Eo biển Gibran-ta', 'Eo biển Bê-rinh'],
    correctIndex: 1,
    explanation: 'Eo biển Ma-lắc-ca là yết hầu hàng hải kết nối Biển Đông với Ấn Độ Dương, nơi hàng vạn lượt tàu thuyền qua lại mỗi năm.',
    category: 'location',
  },
  {
    id: 'cs-3',
    gradeLevel: 'thcs',
    question: 'Việt Nam hiện có khoảng bao nhiêu tỉnh, thành phố trực thuộc Trung ương có bờ biển giáp Biển Đông?',
    options: ['15 tỉnh, thành phố', '20 tỉnh, thành phố', '28 tỉnh, thành phố', '35 tỉnh, thành phố'],
    correctIndex: 2,
    explanation: 'Việt Nam có 28 tỉnh, thành phố ven biển, tạo thành dải kinh tế biển năng động từ Quảng Ninh đến Kiên Giang.',
    category: 'vietnam',
  },
  {
    id: 'cs-4',
    gradeLevel: 'thcs',
    question: 'Hiệp định phân định ranh giới biển trong Vịnh Thái Lan được Việt Nam và Thái Lan ký kết vào năm nào?',
    options: ['Năm 1975', 'Năm 1982', 'Năm 1997', 'Năm 2010'],
    correctIndex: 2,
    explanation: 'Ngày 9-8-1997, Việt Nam và Thái Lan đã ký Hiệp định về phân định ranh giới trên biển giữa hai nước trong vịnh Thái Lan.',
    category: 'cooperation',
  },

  // THPT (Grade 10 - 12, Chuyên đề Địa lí 11)
  {
    id: 'pt-1',
    gradeLevel: 'thpt',
    question: 'Theo Chuyên đề Địa lí 11, Biển Đông có diện tích khoảng bao nhiêu và trải rộng trong phạm vi vĩ độ nào?',
    options: [
      'Khoảng 2,5 triệu km², từ 5°N đến 15°B',
      'Khoảng 3,44 triệu km², từ khoảng 3°B tới 26°B',
      'Khoảng 4,2 triệu km², từ 0° đến 30°B',
      'Khoảng 1,0 triệu km², từ 8°B đến 23°B',
    ],
    correctIndex: 1,
    explanation: 'Biển Đông có diện tích khoảng 3,44 triệu km², trải rộng từ khoảng 3°B tới 26°B, là một trong những khu vực chiến lược quan trọng bậc nhất thế giới.',
    category: 'location',
  },
  {
    id: 'pt-2',
    gradeLevel: 'thpt',
    question: 'Hiệp định hợp tác nghề cá ở Vịnh Bắc Bộ giữa Việt Nam và Trung Quốc (ký ngày 25-12-2000) được xây dựng trên hai nguyên tắc cơ bản nào?',
    options: [
      'Nguyên tắc bảo tồn, quản lí các nguồn lợi thủy sản và nguyên tắc bình đẳng về năng lực tàu thuyền',
      'Nguyên tắc tự do khai thác không giới hạn và hỗ trợ thuế quan',
      'Nguyên tắc phân chia theo tỷ lệ dân số và mức tiêu thụ cá',
      'Nguyên tắc hoán đổi đội tàu và chia đều sản lượng hải sản đánh bắt',
    ],
    correctIndex: 0,
    explanation: 'Hai nước xác lập 2 nguyên tắc: (1) bảo tồn, quản lí các nguồn lợi thủy sản và (2) bình đẳng về năng lực tàu thuyền, tạo cơ sở pháp lý cho hoạt động hợp tác hòa bình.',
    category: 'cooperation',
  },
  {
    id: 'pt-3',
    gradeLevel: 'thpt',
    question: 'Sản lượng cá khai thác tại khu vực Biển Đông đóng góp khoảng bao nhiêu phần trăm tổng sản lượng cá khai thác của toàn thế giới?',
    options: ['Khoảng 1 - 2%', 'Khoảng 7 - 8%', 'Khoảng 20 - 25%', 'Khoảng 40 - 50%'],
    correctIndex: 1,
    explanation: 'Biển Đông có hơn 100 loài cá có giá trị kinh tế cao với trữ lượng lớn, đóng góp khoảng 7 - 8% sản lượng cá khai thác của thế giới.',
    category: 'resource',
  },
  {
    id: 'pt-4',
    gradeLevel: 'thpt',
    question: 'Theo tài liệu Chuyên đề Địa lí 11 và bản đồ biển Việt Nam, tổng diện tích vùng biển Việt Nam là khoảng bao nhiêu?',
    options: [
      'Khoảng 500.000 km²',
      'Khoảng 800.000 km²',
      'Hơn 1 triệu km² (khoảng 1.010.274 km²)',
      'Khoảng 3.260.000 km²',
    ],
    correctIndex: 2,
    explanation: 'Vùng biển thuộc chủ quyền, quyền chủ quyền và quyền tài phán của Việt Nam có diện tích trên 1 triệu km² (chính xác khoảng 1.010.274 km²).',
    category: 'vietnam',
  },
  {
    id: 'pt-5',
    gradeLevel: 'thpt',
    question: 'Mô hình phát triển bền vững Biển Đông được hình thành theo chuỗi logic nào sau đây?',
    options: [
      'Hợp tác hòa bình → Khai thác hợp lí → Phát triển kinh tế → Bảo vệ môi trường → Phát triển bền vững',
      'Khai thác tối đa → Thu lợi nhuận cao → Xử lý sự cố môi trường sau',
      'Đóng cửa hoàn toàn vùng biển → Ngừng mọi hoạt động kinh tế',
      'Khai thác cạn kiệt cá lớn → Nuôi bù cá nhỏ',
    ],
    correctIndex: 0,
    explanation: 'Chuỗi nhân - quả mẫu mực: Hợp tác hòa bình giúp tạo trật tự khai thác hợp lý, từ đó thúc đẩy kinh tế biển, chủ động bảo vệ môi trường và hướng tới phát triển bền vững.',
    category: 'cooperation',
  },
];
