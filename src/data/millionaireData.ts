// Ngân hàng câu hỏi "Ai Là Triệu Phú Biển Đông"
// Bám sát chương trình Chuyên đề Địa lí 11 GDPT 2018 và Luật Biển Việt Nam

export interface MillionaireQuestion {
  id: string;
  level: number; // 1 to 15
  question: string;
  options: [string, string, string, string]; // [A, B, C, D]
  correctAnswer: 0 | 1 | 2 | 3; // 0=A, 1=B, 2=C, 3=D
  explanation: string;
  category: 'Địa lí tự nhiên' | 'Chủ quyền & Pháp lý' | 'Lịch sử & Văn hóa' | 'Kinh tế & Sinh thái';
  expertAdvice: {
    expert: string;
    advice: string;
    confidence: number; // percentage
  };
}

export interface PrizeLevel {
  level: number;
  rewardText: string;
  rewardValue: number;
  xpReward: number;
  isSafeMilestone: boolean;
}

export const PRIZE_LADDER: PrizeLevel[] = [
  { level: 15, rewardText: '150.000.000 VNĐ', rewardValue: 150000000, xpReward: 10000, isSafeMilestone: true },
  { level: 14, rewardText: '85.000.000 VNĐ', rewardValue: 85000000, xpReward: 8000, isSafeMilestone: false },
  { level: 13, rewardText: '60.000.000 VNĐ', rewardValue: 60000000, xpReward: 6500, isSafeMilestone: false },
  { level: 12, rewardText: '40.000.000 VNĐ', rewardValue: 40000000, xpReward: 5000, isSafeMilestone: false },
  { level: 11, rewardText: '30.000.000 VNĐ', rewardValue: 30000000, xpReward: 4000, isSafeMilestone: false },
  { level: 10, rewardText: '22.000.000 VNĐ', rewardValue: 22000000, xpReward: 3000, isSafeMilestone: true },
  { level: 9, rewardText: '14.000.000 VNĐ', rewardValue: 14000000, xpReward: 2000, isSafeMilestone: false },
  { level: 8, rewardText: '10.000.000 VNĐ', rewardValue: 10000000, xpReward: 1500, isSafeMilestone: false },
  { level: 7, rewardText: '6.000.000 VNĐ', rewardValue: 6000000, xpReward: 1000, isSafeMilestone: false },
  { level: 6, rewardText: '3.000.000 VNĐ', rewardValue: 3000000, xpReward: 750, isSafeMilestone: false },
  { level: 5, rewardText: '1.000.000 VNĐ', rewardValue: 1000000, xpReward: 500, isSafeMilestone: true },
  { level: 4, rewardText: '800.000 VNĐ', rewardValue: 800000, xpReward: 300, isSafeMilestone: false },
  { level: 3, rewardText: '600.000 VNĐ', rewardValue: 600000, xpReward: 200, isSafeMilestone: false },
  { level: 2, rewardText: '400.000 VNĐ', rewardValue: 400000, xpReward: 100, isSafeMilestone: false },
  { level: 1, rewardText: '200.000 VNĐ', rewardValue: 200000, xpReward: 50, isSafeMilestone: false },
];

export const MILLIONAIRE_QUESTIONS: Record<number, MillionaireQuestion[]> = {
  // ================= CÂU 1 (RẤT DỄ) =================
  1: [
    {
      id: 'q1-1',
      level: 1,
      category: 'Địa lí tự nhiên',
      question: 'Biển Đông là một vùng biển thuộc đại dương nào sau đây?',
      options: ['Thái Bình Dương', 'Ấn Độ Dương', 'Đại Tây Dương', 'Bắc Băng Dương'],
      correctAnswer: 0,
      explanation: 'Biển Đông là biển rìa lục địa nửa kín nằm ở phía tây của Thái Bình Dương.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Câu đầu tiên cực kỳ dễ bạn nhé, Biển Đông nằm trọn ở bờ tây Thái Bình Dương, chọn ngay đáp án A!',
        confidence: 100,
      },
    },
    {
      id: 'q1-2',
      level: 1,
      category: 'Địa lí tự nhiên',
      question: 'Bờ biển nước ta có chiều dài khoảng bao nhiêu km kéo dài từ Móng Cái đến Hà Tiên?',
      options: ['1.260 km', '2.360 km', '3.260 km', '4.260 km'],
      correctAnswer: 2,
      explanation: 'Đường bờ biển nước ta dài 3.260 km, chạy dọc từ tỉnh Quảng Ninh ở phía bắc đến tỉnh Kiên Giang ở phía tây nam.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Con số kinh điển trong SGK Địa lí 11 là 3.260 km bạn nhé, đáp án chính là C!',
        confidence: 100,
      },
    },
  ],

  // ================= CÂU 2 =================
  2: [
    {
      id: 'q2-1',
      level: 2,
      category: 'Chủ quyền & Pháp lý',
      question: 'Về mặt hành chính, Quần đảo Hoàng Sa hiện nay trực thuộc quyền quản lý của đơn vị nào?',
      options: ['Tỉnh Quảng Nam', 'Tỉnh Quảng Ngãi', 'Thành phố Đà Nẵng', 'Tỉnh Khánh Hòa'],
      correctAnswer: 2,
      explanation: 'Huyện đảo Hoàng Sa được thành lập và trực thuộc Ủy ban nhân dân Thành phố Đà Nẵng.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Hoàng Sa thuộc TP. Đà Nẵng, còn Trường Sa thuộc tỉnh Khánh Hòa. Hãy chọn C - Thành phố Đà Nẵng!',
        confidence: 99,
      },
    },
    {
      id: 'q2-2',
      level: 2,
      category: 'Chủ quyền & Pháp lý',
      question: 'Quần đảo Trường Sa về mặt hành chính hiện nay thuộc tỉnh nào của nước ta?',
      options: ['Tỉnh Ninh Thuận', 'Tỉnh Bình Thuận', 'Tỉnh Khánh Hòa', 'Tỉnh Bà Rịa - Vũng Tàu'],
      correctAnswer: 2,
      explanation: 'Huyện đảo Trường Sa trực thuộc tỉnh Khánh Hòa theo Nghị định và Quyết định của Nhà nước CHXHCN Việt Nam.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Chắc chắn là Tỉnh Khánh Hòa rồi bạn ơi, đáp án C nhé!',
        confidence: 99,
      },
    },
  ],

  // ================= CÂU 3 =================
  3: [
    {
      id: 'q3-1',
      level: 3,
      category: 'Địa lí tự nhiên',
      question: 'Đảo lớn nhất của nước ta nằm ở vùng biển Tây Nam (Vịnh Thái Lan) là đảo nào?',
      options: ['Đảo Côn Đảo', 'Đảo Phú Quốc', 'Đảo Cát Bà', 'Đảo Bạch Long Vĩ'],
      correctAnswer: 1,
      explanation: 'Đảo Phú Quốc (tỉnh Kiên Giang) có diện tích khoảng 589 km², là hòn đảo lớn nhất của Việt Nam.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Đảo Ngọc Phú Quốc là hòn đảo có diện tích lớn nhất Việt Nam ta, chọn B bạn nhé!',
        confidence: 98,
      },
    },
    {
      id: 'q3-2',
      level: 3,
      category: 'Kinh tế & Sinh thái',
      question: 'Huyện đảo nào sau đây được mệnh danh là "Vương quốc tỏi" nổi tiếng của nước ta?',
      options: ['Huyện đảo Lý Sơn', 'Huyện đảo Phú Quý', 'Huyện đảo Cồn Cỏ', 'Huyện đảo Cô Tô'],
      correctAnswer: 0,
      explanation: 'Huyện đảo Lý Sơn (tỉnh Quảng Ngãi) nổi tiếng khắp cả nước với đặc sản tỏi Lý Sơn trồng trên đất nham thạch núi lửa cổ.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Lý Sơn (Quảng Ngãi) chính là vương quốc tỏi, đáp án là A!',
        confidence: 99,
      },
    },
  ],

  // ================= CÂU 4 =================
  4: [
    {
      id: 'q4-1',
      level: 4,
      category: 'Địa lí tự nhiên',
      question: 'Diện tích toàn bộ Biển Đông khoảng bao nhiêu triệu km²?',
      options: ['Khoảng 1,44 triệu km²', 'Khoảng 2,44 triệu km²', 'Khoảng 3,44 triệu km²', 'Khoảng 4,44 triệu km²'],
      correctAnswer: 2,
      explanation: 'Biển Đông có diện tích khoảng 3,44 triệu km², là biển nửa kín lớn thứ hai ở châu Á và thứ tư trên thế giới.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Theo số liệu chuẩn của SGK Địa lí 11, Biển Đông rộng khoảng 3,44 triệu km². Hãy chọn C!',
        confidence: 96,
      },
    },
    {
      id: 'q4-2',
      level: 4,
      category: 'Kinh tế & Sinh thái',
      question: 'Mỏ dầu khí đầu tiên được khai thác thương mại tại thềm lục địa phía Nam nước ta là gì?',
      options: ['Mỏ Đại Hùng', 'Mỏ Bạch Hổ', 'Mỏ Rồng', 'Mỏ Lan Tây'],
      correctAnswer: 1,
      explanation: 'Mỏ Bạch Hổ (khai thác thương mại từ năm 1986 bởi Vietsovpetro) là mỏ dầu lớn nhất và khai thác đầu tiên từ tầng đá móng nứt nẻ.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Mỏ dầu Bạch Hổ huyền thoại thuộc bể trầm tích Cửu Long, đáp án B!',
        confidence: 97,
      },
    },
  ],

  // ================= CÂU 5 (MỐC AN TOÀN 1 - 1.000.000 ĐỒNG) =================
  5: [
    {
      id: 'q5-1',
      level: 5,
      category: 'Chủ quyền & Pháp lý',
      question: 'Theo Công ước Luật Biển UNCLOS 1982, chiều rộng của vùng "Lãnh hải" quốc gia tối đa là bao nhiêu?',
      options: ['6 hải lý', '12 hải lý', '24 hải lý', '200 hải lý'],
      correctAnswer: 1,
      explanation: 'Điều 3 UNCLOS 1982 quy định mỗi quốc gia ven biển có quyền ấn định chiều rộng lãnh hải không quá 12 hải lý tính từ đường cơ sở.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Lãnh hải là vùng nước 12 hải lý kể từ đường cơ sở, nơi quốc gia thực thi chủ quyền hoàn toàn và tuyệt đối. Hãy chọn B - 12 hải lý!',
        confidence: 99,
      },
    },
    {
      id: 'q5-2',
      level: 5,
      category: 'Chủ quyền & Pháp lý',
      question: 'Diện tích vùng biển thuộc chủ quyền, quyền chủ quyền và quyền tài phán của Việt Nam rộng khoảng bao nhiêu?',
      options: ['Hơn 500.000 km²', 'Hơn 800.000 km²', 'Hơn 1.000.000 km²', 'Hơn 2.000.000 km²'],
      correctAnswer: 2,
      explanation: 'Vùng biển Việt Nam có diện tích khoảng trên 1.010.274 km², gấp hơn 3 lần diện tích đất liền của nước ta.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Vùng biển nước ta rộng trên 1 triệu km² (chính xác hơn 1,01 triệu km²). Hãy tự tin chọn C!',
        confidence: 99,
      },
    },
  ],

  // ================= CÂU 6 =================
  6: [
    {
      id: 'q6-1',
      level: 6,
      category: 'Lịch sử & Văn hóa',
      question: 'Lễ hội văn hóa dân gian nào tại đảo Lý Sơn đã được công nhận là Di sản văn hóa phi vật thể quốc gia tri ân đội hùng binh giữ biển đảo?',
      options: ['Lễ hội Nghinh Ông', 'Lễ Khao lề thế lính Hoàng Sa', 'Lễ hội Cầu Ngư', 'Lễ hội Đua thuyền Tứ linh'],
      correctAnswer: 1,
      explanation: 'Lễ Khao lề thế lính Hoàng Sa diễn ra vào tháng 2 và 3 âm lịch hàng năm tại huyện đảo Lý Sơn nhằm tưởng nhớ các bậc tiền nhân trong Hải đội Hoàng Sa kiêm quản Bắc Hải triều Nguyễn.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Đây là Lễ Khao lề thế lính Hoàng Sa nổi tiếng ở đảo Lý Sơn, chọn phương án B chắc chắn đúng!',
        confidence: 95,
      },
    },
    {
      id: 'q6-2',
      level: 6,
      category: 'Địa lí tự nhiên',
      question: 'Đảo nào sau đây của nước ta nằm giữa Vịnh Bắc Bộ, có vai trò là tiền tiêu bảo vệ an ninh và làm mốc phân định hiệp định năm 2000?',
      options: ['Đảo Cát Bà', 'Đảo Bạch Long Vĩ', 'Đảo Hòn Mê', 'Đảo Cồn Cỏ'],
      correctAnswer: 1,
      explanation: 'Đảo Bạch Long Vĩ (Hải Phòng) nằm ở trung tâm Vịnh Bắc Bộ, là đảo tiền tiêu chiến lược có giá trị pháp lý lớn trong Hiệp định 2000.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Nằm giữa Vịnh Bắc Bộ chính là hòn đảo Bạch Long Vĩ, đáp án B!',
        confidence: 97,
      },
    },
  ],

  // ================= CÂU 7 =================
  7: [
    {
      id: 'q7-1',
      level: 7,
      category: 'Chủ quyền & Pháp lý',
      question: 'Đường cơ sở thẳng dùng để tính chiều rộng lãnh hải của nước CHXHCN Việt Nam được công bố vào ngày tháng năm nào?',
      options: ['12/11/1982', '25/12/1986', '23/06/1994', '21/06/2012'],
      correctAnswer: 0,
      explanation: 'Tuyên bố của Chính phủ CHXHCN Việt Nam về đường cơ sở dùng để tính chiều rộng lãnh hải được ban hành ngày 12/11/1982 gồm 11 điểm mốc (từ điểm 0 đến mốc A11).',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Tuyên bố về đường cơ sở thẳng của Việt Nam được ký ngày 12 tháng 11 năm 1982. Hãy chọn A!',
        confidence: 94,
      },
    },
    {
      id: 'q7-2',
      level: 7,
      category: 'Chủ quyền & Pháp lý',
      question: 'Điểm mốc A11 - điểm mốc cuối cùng của Đường cơ sở thẳng năm 1982 nằm tại đảo nào của Việt Nam?',
      options: ['Đảo Bạch Long Vĩ', 'Đảo Cát Bà', 'Đảo Cồn Cỏ', 'Đảo Lý Sơn'],
      correctAnswer: 2,
      explanation: 'Mốc A11 là điểm nhô ra xa nhất của bờ biển phía đông đảo Cồn Cỏ (tỉnh Quảng Trị).',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Mốc A11 nằm trên Đảo Cồn Cỏ anh hùng (tỉnh Quảng Trị). Đáp án đúng là C!',
        confidence: 96,
      },
    },
  ],

  // ================= CÂU 8 =================
  8: [
    {
      id: 'q8-1',
      level: 8,
      category: 'Địa lí tự nhiên',
      question: 'Eo biển nào kẹp giữa bán đảo Mã Lai và đảo Sumatra, kết nối Biển Đông với Ấn Độ Dương, chiếm hơn 25% lượng dầu mỏ vận chuyển toàn cầu?',
      options: ['Eo biển Lu-dông', 'Eo biển Ma-lắc-ca', 'Eo biển Xan-đa (Sunda)', 'Eo biển Lom-bôc'],
      correctAnswer: 1,
      explanation: 'Eo biển Ma-lắc-ca là điểm thắt huyết mạch hàng hải toàn cầu, nơi trung chuyển hàng triệu thùng dầu mỗi ngày qua Biển Đông.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Eo biển Ma-lắc-ca (Malacca) là tuyến đường yết hầu của thế giới, hãy chọn B!',
        confidence: 98,
      },
    },
    {
      id: 'q8-2',
      level: 8,
      category: 'Chủ quyền & Pháp lý',
      question: 'Cụm Nhà giàn DK1 được Quân chủng Hải quân Việt Nam bắt đầu xây dựng và đóng quân từ năm nào trên thềm lục địa phía Nam?',
      options: ['Năm 1979', 'Năm 1989', 'Năm 1995', 'Năm 2002'],
      correctAnswer: 1,
      explanation: 'Chủ tịch Hội đồng Bộ trưởng ra chỉ thị xây dựng Cụm Dịch vụ - Khoa học kỹ thuật DK1 vào năm 1989 nhằm chốt giữ và khẳng định chủ quyền trên các bãi ngầm thềm lục địa.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Năm 1989 là năm dựng cột mốc nhà giàn DK1 đầu tiên trên bãi ngầm Phúc Tần. Đáp án B!',
        confidence: 92,
      },
    },
  ],

  // ================= CÂU 9 =================
  9: [
    {
      id: 'q9-1',
      level: 9,
      category: 'Chủ quyền & Pháp lý',
      question: 'Hiệp định Phân định Vịnh Bắc Bộ và Hiệp định Hợp tác Nghề cá giữa Việt Nam và Trung Quốc được ký kết chính thức vào ngày nào?',
      options: ['25/12/2000', '14/03/1988', '12/11/1982', '21/06/2012'],
      correctAnswer: 0,
      explanation: 'Hiệp định Phân định Vịnh Bắc Bộ được hai nước ký kết tại Bắc Kinh ngày 25/12/2000, chính thức có hiệu lực từ ngày 30/06/2004.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Hiệp định Vịnh Bắc Bộ được ký đúng ngày lễ Giáng sinh 25/12/2000. Hãy tự tin chọn A!',
        confidence: 95,
      },
    },
    {
      id: 'q9-2',
      level: 9,
      category: 'Chủ quyền & Pháp lý',
      question: 'Đường phân định lãnh hải, vùng đặc quyền kinh tế và thềm lục địa trong Vịnh Bắc Bộ năm 2000 được xác định bởi bao nhiêu điểm tọa độ?',
      options: ['11 điểm', '15 điểm', '21 điểm', '27 điểm'],
      correctAnswer: 2,
      explanation: 'Đường phân định Vịnh Bắc Bộ năm 2000 gồm 21 điểm tọa độ chuẩn mực nối từ cửa sông Bắc Luân đến cửa vịnh.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Đường phân định Vịnh Bắc Bộ có đúng 21 điểm tọa độ, chọn C bạn nhé!',
        confidence: 96,
      },
    },
  ],

  // ================= CÂU 10 (MỐC AN TOÀN 2 - 22.000.000 ĐỒNG) =================
  10: [
    {
      id: 'q10-1',
      level: 10,
      category: 'Chủ quyền & Pháp lý',
      question: 'Vùng biển mà tại đó quốc gia ven biển có quyền tối cao về kinh tế nhưng các quốc gia khác vẫn có quyền tự do hàng hải và hàng không là vùng nào?',
      options: ['Nội thủy', 'Lãnh hải', 'Vùng tiếp giáp lãnh hải', 'Vùng đặc quyền kinh tế (EEZ)'],
      correctAnswer: 3,
      explanation: 'Theo UNCLOS 1982 và Luật Biển Việt Nam 2012, trong vùng đặc quyền kinh tế (200 hải lý), quốc gia ven biển có quyền chủ quyền về kinh tế, nghiên cứu khoa học, nhưng vẫn tôn trọng quyền tự do hàng hải, hàng không quốc tế.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Đây là định nghĩa cốt lõi của Vùng Đặc Quyền Kinh Tế (EEZ) rộng 200 hải lý. Đáp án D chắc chắn!',
        confidence: 96,
      },
    },
    {
      id: 'q10-2',
      level: 10,
      category: 'Kinh tế & Sinh thái',
      question: 'Loại tài nguyên năng lượng tương lai phân bố sâu dưới đáy biển dốc thềm lục địa Biển Đông với tiềm năng khổng lồ được gọi là gì?',
      options: ['Khí ngưng tụ (Condensate)', 'Băng cháy (Gas Hydrate)', 'Than bùn đại dương', 'Cát mangan nước sâu'],
      correctAnswer: 1,
      explanation: 'Băng cháy (Khí hydrate) là nguồn năng lượng hóa thạch kết tinh ở độ sâu và áp suất lớn dưới đáy biển, tiềm năng tại Biển Đông ước tính rất lớn.',
      expertAdvice: {
        expert: 'Kiến Sáng FPT',
        advice: 'Băng cháy (Gas Hydrate) hay "băng cháy trắng" dưới đáy biển sâu! Đáp án B!',
        confidence: 94,
      },
    },
  ],

  // ================= CÂU 11 =================
  11: [
    {
      id: 'q11-1',
      level: 11,
      category: 'Kinh tế & Sinh thái',
      question: 'Cụm cảng nước sâu lớn nhất miền Nam Việt Nam, có khả năng đón những siêu tàu container lớn nhất thế giới đi thẳng sang Âu - Mỹ là gì?',
      options: ['Cảng Cát Lái (TP.HCM)', 'Cảng Cái Mép - Thị Vải (Bà Rịa - Vũng Tàu)', 'Cảng Vân Phong (Khánh Hòa)', 'Cảng Quy Nhơn (Bình Định)'],
      correctAnswer: 1,
      explanation: 'Cụm cảng Cái Mép - Thị Vải (tỉnh Bà Rịa - Vũng Tàu) là cảng nước sâu quốc tế xếp thứ hạng cao trên thế giới, đón được tàu mẹ tải trọng trên 200.000 tấn.',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Cái Mép - Thị Vải là cửa ngõ cảng nước sâu hàng đầu cả nước, hãy chọn B!',
        confidence: 95,
      },
    },
    {
      id: 'q11-2',
      level: 11,
      category: 'Lịch sử & Văn hóa',
      question: 'Bộ sách lịch sử địa lý cổ nào của Lê Quý Đôn soạn năm 1776 đã ghi chép cặn kẽ về tổ chức và hoạt động của Đội Hoàng Sa triều Nguyễn?',
      options: ['Đại Nam nhất thống chí', 'Phủ biên tạp lục', 'Lịch triều hiến chương loại chí', 'Việt sử thông giám cương mục'],
      correctAnswer: 1,
      explanation: 'Trong "Phủ biên tạp lục" (1776), nhà bác học Lê Quý Đôn đã ghi chép tỉ mỉ về hoạt động thu lượm hải vật, đo đạc hải trình của Hải đội Hoàng Sa.',
      expertAdvice: {
        expert: 'Chuyên gia Lịch sử',
        advice: 'Tác phẩm "Phủ biên tạp lục" của Lê Quý Đôn là tư liệu lịch sử quan trọng hàng đầu khẳng định chủ quyền Hoàng Sa, Trường Sa. Chọn B!',
        confidence: 93,
      },
    },
  ],

  // ================= CÂU 12 =================
  12: [
    {
      id: 'q12-1',
      level: 12,
      category: 'Chủ quyền & Pháp lý',
      question: 'Năm 1992, Việt Nam và Malaysia đã ký thỏa thuận hợp tác cùng phát triển tại khu vực thềm lục địa chồng lấn nào?',
      options: ['Vùng chồng lấn Vịnh Thái Lan (Khu vực Khai thác Chung JDA)', 'Vùng thềm lục địa Bãi Tư Chính', 'Vùng chồng lấn ngoài cửa Vịnh Bắc Bộ', 'Vùng thềm lục địa phía đông Phú Quốc'],
      correctAnswer: 0,
      explanation: 'Bản thỏa thuận năm 1992 giữa Việt Nam và Malaysia về việc cùng thăm dò và khai thác dầu khí tại vùng thềm lục địa chồng lấn ở Vịnh Thái Lan là mô hình giải quyết hòa bình mẫu mực.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Thỏa thuận năm 1992 áp dụng tại vùng chồng lấn Vịnh Thái Lan giữa Việt Nam và Malaysia. Đáp án đúng là A!',
        confidence: 91,
      },
    },
    {
      id: 'q12-2',
      level: 12,
      category: 'Chủ quyền & Pháp lý',
      question: 'Bãi ngầm Tư Chính (Vanguard Bank) - nơi đóng quân của các nhà giàn DK1 thuộc cấu trúc địa chất nào của Việt Nam?',
      options: ['Quần đảo Hoàng Sa', 'Quần đảo Trường Sa', 'Thềm lục địa mở rộng phía Nam của Việt Nam', 'Vùng đặc quyền kinh tế của Philippines'],
      correctAnswer: 2,
      explanation: 'Bãi Tư Chính là bãi ngầm hoàn toàn chìm dưới mực nước biển, là phần kéo dài tự nhiên của thềm lục địa phía Nam Việt Nam, không thuộc quần đảo Trường Sa.',
      expertAdvice: {
        expert: 'Chuyên gia Địa chất Biển',
        advice: 'Lưu ý địa lý quan trọng: Bãi Tư Chính nằm trên Thềm Lục Địa phía Nam của Việt Nam, không phải đảo thuộc Trường Sa! Chọn C!',
        confidence: 93,
      },
    },
  ],

  // ================= CÂU 13 =================
  13: [
    {
      id: 'q13-1',
      level: 13,
      category: 'Chủ quyền & Pháp lý',
      question: 'Tuyên bố về ứng xử của các bên ở Biển Đông (DOC) được ký kết giữa ASEAN và Trung Quốc tại Phnom Penh (Campuchia) vào năm nào?',
      options: ['Năm 1995', 'Năm 2002', 'Năm 2012', 'Năm 2016'],
      correctAnswer: 1,
      explanation: 'Tuyên bố DOC được các nước thành viên ASEAN và Trung Quốc ký kết ngày 04/11/2002 tại Hội nghị cấp cao ASEAN lần thứ 8 ở Campuchia.',
      expertAdvice: {
        expert: 'Chuyên gia Ngoại giao',
        advice: 'DOC được ký kết vào năm 2002 tại Phnom Penh. Hãy chọn đáp án B!',
        confidence: 92,
      },
    },
    {
      id: 'q13-2',
      level: 13,
      category: 'Chủ quyền & Pháp lý',
      question: 'Ngày 12/07/2016, Tòa Trọng tài thường trực (PCA) tại La Haye (Hà Lan) đã ra phán quyết lịch sử bác bỏ yêu sách nào ở Biển Đông?',
      options: ['Đường cơ sở thẳng của Indonesia', 'Yêu sách "Đường lưỡi bò / Đường chín đoạn" phi lý của Trung Quốc', 'Hiệp định ranh giới biển của Philippines', 'Vùng thông cáo hàng hải của Malaysia'],
      correctAnswer: 1,
      explanation: 'Phán quyết PCA ngày 12/07/2016 khẳng định yêu sách quyền lịch sử của Trung Quốc đối với các vùng nước trong "đường chín đoạn" là hoàn toàn trái với UNCLOS 1982.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Phán quyết PCA 2016 đã bác bỏ hoàn toàn tính hợp pháp của cái gọi là "đường chín đoạn/đường lưỡi bò". Đáp án là B!',
        confidence: 98,
      },
    },
  ],

  // ================= CÂU 14 =================
  14: [
    {
      id: 'q14-1',
      level: 14,
      category: 'Kinh tế & Sinh thái',
      question: 'Nghị quyết số 36-NQ/TW của Ban Chấp hành Trung ương Đảng (Khóa XII) đã xác định mục tiêu phát triển kinh tế biển Việt Nam đến năm nào với tầm nhìn đến năm 2045?',
      options: ['Đến năm 2025', 'Đến năm 2030', 'Đến năm 2035', 'Đến năm 2040'],
      correctAnswer: 1,
      explanation: 'Nghị quyết số 36-NQ/TW ngày 22/10/2018 về "Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn đến năm 2045".',
      expertAdvice: {
        expert: 'Thầy Giáo Địa Lý FPT',
        advice: 'Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn đến năm 2045. Chọn B - Năm 2030!',
        confidence: 96,
      },
    },
    {
      id: 'q14-2',
      level: 14,
      category: 'Chủ quyền & Pháp lý',
      question: 'Theo Luật Biển Việt Nam năm 2012, "Đảo" nào sau đây có hiệu lực pháp lý để mở rộng đầy đủ các vùng lãnh hải, tiếp giáp lãnh hải, đặc quyền kinh tế và thềm lục địa?',
      options: ['Các đảo tự nhiên có thể duy trì đời sống con người hoặc đời sống kinh tế riêng', 'Bất kỳ khối đá san hô nào nhô lên khi thủy triều xuống thấp', 'Các đảo nhân tạo do con người bồi đắp', 'Các bãi cạn nửa nổi nửa chìm'],
      correctAnswer: 0,
      explanation: 'Điều 121 Khoản 3 UNCLOS quy định: Các đảo đá không thích hợp cho con người sinh sống hoặc cho đời sống kinh tế riêng thì không có vùng đặc quyền kinh tế và thềm lục địa.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Chỉ có các đảo tự nhiên có khả năng duy trì đời sống con người hoặc đời sống kinh tế riêng mới có EEZ và thềm lục địa. Đáp án A!',
        confidence: 92,
      },
    },
  ],

  // ================= CÂU 15 (ĐỈNH CAO TRIỆU PHÚ - 150.000.000 ĐỒNG) =================
  15: [
    {
      id: 'q15-1',
      level: 15,
      category: 'Chủ quyền & Pháp lý',
      question: 'Năm 2003, Việt Nam và quốc gia láng giềng Đông Nam Á nào đã ký kết thành công Hiệp định phân định ranh giới Thềm lục địa sau hơn 30 năm đàm phán kiên trì?',
      options: ['Thái Lan', 'In-đô-nê-xi-a (Indonesia)', 'Phi-líp-pin (Philippines)', 'Bru-nây (Brunei)'],
      correctAnswer: 1,
      explanation: 'Ngày 26/06/2003 tại Hà Nội, Việt Nam và Indonesia đã ký kết Hiệp định phân định ranh giới Thềm lục địa. Đến tháng 12/2022, hai nước tiếp tục hoàn tất phân định Vùng Đặc Quyền Kinh Tế (EEZ).',
      expertAdvice: {
        expert: 'Chuyên gia Ngoại giao Cấp cao',
        advice: 'Câu hỏi quyết định ngôi vị triệu phú: Hiệp định phân định thềm lục địa năm 2003 là giữa Việt Nam và Indonesia! Hãy tự tin chọn B!',
        confidence: 95,
      },
    },
    {
      id: 'q15-2',
      level: 15,
      category: 'Chủ quyền & Pháp lý',
      question: 'Năm 2009, Việt Nam và Malaysia đã cùng nộp lên Ủy ban Ranh giới Thềm lục địa của Liên Hợp Quốc (CLCS) Báo cáo chung về thềm lục địa mở rộng vượt quá 200 hải lý tại khu vực nào?',
      options: ['Khu vực phía Bắc Biển Đông', 'Khu vực Vịnh Bắc Bộ', 'Khu vực phía Nam Biển Đông (Joint Submission Area)', 'Khu vực Vịnh Thái Lan'],
      correctAnswer: 2,
      explanation: 'Tháng 5/2009, Việt Nam và Malaysia đã nộp Báo cáo chung về ranh giới thềm lục địa vượt quá 200 hải lý ở khu vực phía Nam Biển Đông, đồng thời Việt Nam nộp Báo cáo riêng cho khu vực phía Bắc.',
      expertAdvice: {
        expert: 'Chuyên gia Luật Biển',
        advice: 'Báo cáo chung nộp lên LHQ năm 2009 giữa Việt Nam và Malaysia là ở Khu vực phía Nam Biển Đông. Đáp án C!',
        confidence: 94,
      },
    },
  ],
};
