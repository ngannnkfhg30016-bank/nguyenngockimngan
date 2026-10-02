export interface MindMapBranch {
  id: string;
  title: string;
  badge?: string;
  icon?: string;
  color: 'sky' | 'emerald' | 'amber' | 'purple' | 'rose' | 'indigo' | 'teal';
  summary: string;
  subBranches: {
    id: string;
    title: string;
    keyPoints: string[];
    highlightTag?: string;
  }[];
}

export interface PillarMindMap {
  pillarId: string;
  centerTitle: string;
  centerSubtitle: string;
  centerIcon: string;
  curriculumRef: string; // Trích dẫn SGK Địa lí 11
  quickTakeaway: string; // Tinh gọn 1 câu ghi nhớ vàng
  branches: MindMapBranch[];
  examKeywords: {
    term: string;
    definition: string;
    trapNote?: string; // Lưu ý tránh nhầm lẫn trong bài thi
  }[];
}

export const curriculumMindMaps: Record<string, PillarMindMap> = {
  location: {
    pillarId: 'location',
    centerTitle: 'VỊ TRÍ & TỰ NHIÊN BIỂN ĐÔNG',
    centerSubtitle: 'Bài 1: Khái quát vị trí địa lí, phạm vi và điều kiện tự nhiên',
    centerIcon: '🌐',
    curriculumRef: 'Sách giáo khoa Chuyên đề học tập Địa lí 11 (GDPT 2018) – Chuyên đề 1',
    quickTakeaway:
      'Biển Đông là biển nửa kín lớn thứ 4 thế giới (~3,44 triệu km²), nằm ở vùng nhiệt đới gió mùa ẩm, là cầu nối huyết mạch giữa Ấn Độ Dương và Thái Bình Dương.',
    branches: [
      {
        id: 'loc-1',
        title: 'Vị trí địa lí & Phạm vi không gian',
        badge: 'Diện tích & Tọa độ',
        icon: '📍',
        color: 'sky',
        summary: 'Trải rộng từ xích đạo đến chí tuyến Bắc, bao bọc bởi 9 quốc gia.',
        subBranches: [
          {
            id: 'loc-1-1',
            title: 'Diện tích & Giới hạn tọa độ',
            keyPoints: [
              'Diện tích: Khoảng 3,44 triệu km² (lớn thứ 4 thế giới, thứ 2 ở châu Á sau biển Ả-rập).',
              'Tọa độ: Kéo dài từ khoảng 3°B đến 26°B và từ 100°Đ đến 121°Đ.',
              'Trải rộng qua các vùng khí hậu: Xích đạo, cận xích đạo và nhiệt đới gió mùa.',
            ],
            highlightTag: '~3,44 triệu km²',
          },
          {
            id: 'loc-1-2',
            title: '9 quốc gia & 1 vùng lãnh thổ ven biển',
            keyPoints: [
              'Gồm: Việt Nam, Trung Quốc, Phi-líp-pin, Ma-lai-xi-a, Bru-nây, In-đô-nê-xi-a, Xin-ga-po, Thái Lan, Cam-pu-chia.',
              'Vùng lãnh thổ Đài Loan.',
              'Hai vịnh lớn: Vịnh Bắc Bộ (Việt Nam - Trung Quốc) và Vịnh Thái Lan.',
            ],
            highlightTag: '9 nước ven biển',
          },
        ],
      },
      {
        id: 'loc-2',
        title: 'Các eo biển & Tuyến hàng hải huyết mạch',
        badge: 'Cầu nối 2 đại dương',
        icon: '🚢',
        color: 'indigo',
        summary: 'Tuyến đường biển bận rộn thứ 2 thế giới, kết nối kinh tế Đông - Tây.',
        subBranches: [
          {
            id: 'loc-2-1',
            title: 'Eo biển Ma-lắc-ca (Malacca)',
            keyPoints: [
              'Nối thông Biển Đông với Ấn Độ Dương.',
              'Chiếm hơn 1/4 lượng dầu thô vận chuyển bằng đường biển của thế giới.',
              'Cửa ngõ năng lượng cho Nhật Bản, Hàn Quốc và Trung Quốc.',
            ],
            highlightTag: 'Eo biển yết hầu',
          },
          {
            id: 'loc-2-2',
            title: 'Các eo biển phía Bắc & Đông',
            keyPoints: [
              'Eo biển Đài Loan: Nối với biển Hoa Đông và Nhật Bản.',
              'Eo biển Ba-si (Bashi), Lu-dông (Luzon), Min-đô-rô: Nối thông ra Thái Bình Dương.',
            ],
            highlightTag: 'Ra Thái Bình Dương',
          },
        ],
      },
      {
        id: 'loc-3',
        title: 'Đặc điểm tự nhiên & Địa hình đáy biển',
        badge: 'Địa chất - Thủy văn',
        icon: '🌊',
        color: 'teal',
        summary: 'Biển nửa kín, thềm lục địa nông ở hai đầu và bồn trũng sâu ở trung tâm.',
        subBranches: [
          {
            id: 'loc-3-1',
            title: 'Hình thái & Độ sâu phân tầng',
            keyPoints: [
              'Biển nửa kín (Semi-enclosed sea), được che chắn bởi các vòng cung đảo.',
              'Thềm lục địa nông (<200m) ở Vịnh Bắc Bộ và thềm Sunda phía Nam.',
              'Bồn trũng trung tâm sâu trên 4.000m với địa hình dốc đứng.',
            ],
            highlightTag: 'Biển nửa kín',
          },
          {
            id: 'loc-3-2',
            title: 'Khí hậu & Dòng hải lưu',
            keyPoints: [
              'Nhiệt đới gió mùa: Mùa đông gió Đông Bắc, mùa hạ gió Tây Nam.',
              'Dòng hải lưu khép kín đảo chiều theo mùa tương ứng với hướng gió.',
              'Thường xuyên chịu tác động của bão nhiệt đới (trung bình 9-10 cơn bão/năm).',
            ],
            highlightTag: 'Hải lưu đổi chiều',
          },
        ],
      },
      {
        id: 'loc-4',
        title: 'Ý nghĩa chiến lược đối với Việt Nam',
        badge: 'An ninh & Kinh tế',
        icon: '🇻🇳',
        color: 'rose',
        summary: 'Cửa ngõ ra thế giới, tuyến phòng thủ hướng biển bảo vệ Tổ quốc.',
        subBranches: [
          {
            id: 'loc-4-1',
            title: 'Địa bàn phát triển kinh tế biển',
            keyPoints: [
              'Bờ biển dài trên 3.260 km, vùng biển chủ quyền và quyền tài phán trên 1 triệu km².',
              '28 trên 63 tỉnh/thành phố giáp biển, tập trung các vùng kinh tế trọng điểm.',
            ],
            highlightTag: '1.010.274 km²',
          },
          {
            id: 'loc-4-2',
            title: 'Địa chính trị & An ninh quốc phòng',
            keyPoints: [
              'Hai quần đảo Hoàng Sa và Trường Sa kiểm soát các tuyến hàng hải qua biển Đông.',
              'Hệ thống đảo ven bờ tạo thế trận liên hoàn bảo vệ chủ quyền biên giới quốc gia.',
            ],
            highlightTag: 'Phên dậu biển đảo',
          },
        ],
      },
    ],
    examKeywords: [
      {
        term: 'Biển nửa kín (Semi-enclosed sea)',
        definition:
          'Vùng biển được bao bọc xung quanh bởi đất liền hoặc các chuỗi đảo, chỉ thông ra đại dương bằng các eo biển hẹp.',
        trapNote: 'Biển Đông KHÔNG PHẢI là biển kín hoàn toàn, cũng không phải biển hở đại dương.',
      },
      {
        term: 'Diện tích Biển Đông',
        definition: 'Khoảng 3,44 triệu km², lớn thứ 4 thế giới và thứ 2 châu Á.',
        trapNote: 'Tránh nhầm 3,44 triệu km² (toàn bộ Biển Đông) với >1 triệu km² (vùng biển thuộc Việt Nam).',
      },
      {
        term: 'Eo biển Ma-lắc-ca',
        definition: 'Eo biển nối Biển Đông với Ấn Độ Dương, tuyến yết hầu thương mại và năng lượng toàn cầu.',
      },
    ],
  },

  resources: {
    pillarId: 'resources',
    centerTitle: 'TÀI NGUYÊN THIÊN NHIÊN BIỂN ĐÔNG',
    centerSubtitle: 'Bài 1 (phần II): 4 nhóm tài nguyên chiến lược của Biển Đông',
    centerIcon: '💎',
    curriculumRef: 'Sách giáo khoa Chuyên đề học tập Địa lí 11 – Mục II: Tài nguyên thiên nhiên Biển Đông',
    quickTakeaway:
      'Biển Đông sở hữu kho báu 4 trụ cột: Nguồn lợi sinh vật (chiếm 7-8% sản lượng cá thế giới), Khoáng sản - Dầu khí - Băng cháy khổng lồ, Du lịch biển đảo nhiệt đới và Tiềm năng hàng hải - Cảng nước sâu.',
    branches: [
      {
        id: 'res-1',
        title: 'Tài nguyên sinh vật & Thủy hải sản',
        badge: '7 - 8% toàn cầu',
        icon: '🐟',
        color: 'sky',
        summary: 'Đa dạng sinh học phong phú bậc nhất với hàng ngàn loài cá, rạn san hô, rừng ngập mặn.',
        subBranches: [
          {
            id: 'res-1-1',
            title: 'Nguồn lợi cá & động vật biển',
            keyPoints: [
              'Hơn 2.000 loài cá biển, trong đó hơn 100 loài có giá trị kinh tế cao (cá ngừ, thu, trích, nục...).',
              'Đóng góp khoảng 7 - 8% tổng sản lượng đánh bắt hải sản của toàn thế giới.',
              'Nhiều loài đặc sản quý: Tôm hùm, hải sâm, bào ngư, đồi mồi, sò huyết.',
            ],
            highlightTag: '2.000+ loài cá',
          },
          {
            id: 'res-1-2',
            title: 'Hệ sinh thái rạn san hô & rừng ngập mặn',
            keyPoints: [
              'Chiếm hơn 1/3 diện tích rạn san hô toàn cầu, là cái nôi nuôi dưỡng ấu trùng thủy sản.',
              'Rừng ngập mặn chắn sóng, chống xói mòn và lưu trữ carbon xanh (Blue Carbon).',
            ],
            highlightTag: 'Cái nôi sinh học',
          },
        ],
      },
      {
        id: 'res-2',
        title: 'Tài nguyên khoáng sản & Năng lượng',
        badge: 'Dầu mỏ & Băng cháy',
        icon: '⚡',
        color: 'purple',
        summary: 'Bồn trũng thềm lục địa chứa trữ lượng dầu khí lớn cùng tiềm năng băng cháy thế kỷ 21.',
        subBranches: [
          {
            id: 'res-2-1',
            title: 'Dầu mỏ và Khí tự nhiên',
            keyPoints: [
              'Tập trung chủ yếu ở các bồn trũng thềm lục địa nông (Cửu Long, Nam Côn Sơn, Sông Hồng, Malay-Thổ Chu...).',
              'Các mỏ dầu khí lớn của Việt Nam: Bạch Hổ, Rồng, Đại Hùng, Lan Tây, Rạng Đông.',
              'Đóng góp tỉ trọng lớn vào ngân sách quốc gia và an ninh năng lượng.',
            ],
            highlightTag: 'Thềm lục địa dầu mỏ',
          },
          {
            id: 'res-2-2',
            title: 'Băng cháy (Gas Hydrate) & Khoáng sản khác',
            keyPoints: [
              'Băng cháy ở đáy sâu Biển Đông được coi là nguồn năng lượng hóa thạch sạch của tương lai.',
              'Sa khoáng titan, zircon ven biển miền Trung; cát thủy tinh Cam Ranh; muối biển Cà Ná, Sa Huỳnh.',
            ],
            highlightTag: 'Năng lượng tương lai',
          },
        ],
      },
      {
        id: 'res-3',
        title: 'Tài nguyên du lịch biển - đảo',
        badge: 'Cảnh quan & Nghỉ dưỡng',
        icon: '🏖️',
        color: 'emerald',
        summary: 'Bờ biển dài, nắng ấm quanh năm, nhiều vịnh biển đẹp thuộc hàng top thế giới.',
        subBranches: [
          {
            id: 'res-3-1',
            title: 'Bãi tắm & Di sản thiên nhiên thế giới',
            keyPoints: [
              'Vịnh Hạ Long, quần thể danh thắng vịnh Lan Hạ, vịnh Bái Tử Long, Nha Trang, Đà Nẵng, Phú Quốc.',
              'Nắng ấm, nước biển trong xanh, thuận lợi khai thác du lịch 4 mùa ở phía Nam.',
            ],
            highlightTag: 'Di sản thế giới',
          },
          {
            id: 'res-3-2',
            title: 'Du lịch lặn biển & Thể thao đại dương',
            keyPoints: [
              'Lặn biển ngắm san hô (Hòn Mun, Côn Đảo, Cù Lao Chàm, Phú Quý).',
              'Du thuyền quốc tế, lướt sóng, du lịch sinh thái rừng ngập mặn Cần Giờ.',
            ],
            highlightTag: 'Kinh tế du lịch',
          },
        ],
      },
      {
        id: 'res-4',
        title: 'Tài nguyên giao thông vận tải & Cảng biển',
        badge: 'Cảng nước sâu',
        icon: '⚓',
        color: 'amber',
        summary: 'Địa hình kín gió, luồng sâu tự nhiên thích hợp xây dựng các siêu cảng trung chuyển.',
        subBranches: [
          {
            id: 'res-4-1',
            title: 'Hệ thống cảng biển nước sâu',
            keyPoints: [
              'Cụm cảng Cái Mép - Thị Vải (Bà Rịa - Vũng Tàu): Tiếp nhận siêu tàu container đi thẳng Âu - Mỹ.',
              'Cảng cửa ngõ quốc tế Lạch Huyện (Hải Phòng), cảng Cam Ranh, cảng Vân Phong, Quy Nhơn.',
            ],
            highlightTag: 'Siêu cảng nước sâu',
          },
          {
            id: 'res-4-2',
            title: 'Hành lang kinh tế Đông - Tây',
            keyPoints: [
              'Cửa ngõ ra biển cho các nước không giáp biển (như Lào) và khu vực Đông Bắc Thái Lan.',
              'Tuyến vận tải ven biển Bắc - Nam giảm áp lực cho đường bộ.',
            ],
            highlightTag: 'Hàng hải quốc tế',
          },
        ],
      },
    ],
    examKeywords: [
      {
        term: '7 - 8% sản lượng cá thế giới',
        definition: 'Tỉ lệ sản lượng cá khai thác từ Biển Đông so với tổng sản lượng khai thác biển toàn cầu.',
        trapNote: 'Biển Đông là ngư trường khai thác lớn nhưng đang đối mặt nguy cơ cạn kiệt do đánh bắt quá mức.',
      },
      {
        term: 'Băng cháy (Gas Hydrate)',
        definition:
          'Dạng tinh thể nén chứa khí metan nằm ở áp suất cao và nhiệt độ thấp dưới đáy biển sâu, tiềm năng năng lượng sạch tương lai.',
      },
      {
        term: 'Cụm cảng Cái Mép - Thị Vải',
        definition:
          'Cụm cảng nước sâu trọng điểm phía Nam của Việt Nam có khả năng đón tàu tải trọng đến trên 200.000 DWT.',
      },
    ],
  },

  cooperation: {
    pillarId: 'cooperation',
    centerTitle: 'HỢP TÁC HÒA BÌNH BIỂN ĐÔNG',
    centerSubtitle: 'Bài 3: Khung pháp lý quốc tế, DOC, COC & Các hiệp định phân định biển',
    centerIcon: '🤝',
    curriculumRef: 'Sách giáo khoa Chuyên đề học tập Địa lí 11 – Bài 3: Hợp tác hòa bình ở Biển Đông',
    quickTakeaway:
      'Hợp tác hòa bình trên cơ sở UNCLOS 1982 là nền tảng tối thượng. Việt Nam kiên trì giải quyết bất đồng bằng biện pháp hòa bình, thực thi DOC 2002 và hướng tới COC thực chất.',
    branches: [
      {
        id: 'coop-1',
        title: 'Cơ sở pháp lý quốc tế tối cao',
        badge: 'UNCLOS 1982',
        icon: '📘',
        color: 'sky',
        summary: 'Công ước Luật Biển LHQ 1982 - “Hiến pháp của Đại dương” điều chỉnh mọi hoạt động biển.',
        subBranches: [
          {
            id: 'coop-1-1',
            title: 'Công ước UNCLOS 1982',
            keyPoints: [
              'Ký ngày 10/12/1982 tại Montego Bay (Jamaica), có hiệu lực từ 1994.',
              'Quy định rõ ràng ranh giới 5 vùng biển: Nội thủy, Lãnh hải, Vùng tiếp giáp, EEZ và Thềm lục địa.',
              'Việt Nam là một trong những quốc gia đầu tiên phê chuẩn UNCLOS (23/06/1994).',
            ],
            highlightTag: 'Hiến pháp Đại dương',
          },
          {
            id: 'coop-1-2',
            title: 'Luật Biển Việt Nam 2012',
            keyPoints: [
              'Được Quốc hội nước CHXHCN Việt Nam thông qua ngày 21/06/2012, có hiệu lực từ 01/01/2013.',
              'Nội luật hóa chuẩn xác các quy định của UNCLOS 1982 vào hệ thống pháp luật quốc gia.',
              'Khẳng định nguyên tắc giải quyết tranh chấp bằng biện pháp hòa bình.',
            ],
            highlightTag: 'Nội luật hóa UNCLOS',
          },
        ],
      },
      {
        id: 'coop-2',
        title: 'Tiến trình DOC và hướng tới COC',
        badge: 'ASEAN - Trung Quốc',
        icon: '🕊️',
        color: 'emerald',
        summary: 'Xây dựng lòng tin chiến lược, kiềm chế và thiết lập bộ quy tắc ứng xử có tính ràng buộc.',
        subBranches: [
          {
            id: 'coop-2-1',
            title: 'Tuyên bố DOC 2002',
            keyPoints: [
              'Tuyên bố về ứng xử của các bên ở Biển Đông ký năm 2002 giữa ASEAN và Trung Quốc.',
              'Cam kết tự kiềm chế, không sử dụng vũ lực hoặc đe dọa sử dụng vũ lực.',
              'Tôn trọng tự do hàng hải và hàng không trên Biển Đông phù hợp với UNCLOS 1982.',
            ],
            highlightTag: 'DOC 2002',
          },
          {
            id: 'coop-2-2',
            title: 'Tiến trình đàm phán COC',
            keyPoints: [
              'Bộ Quy tắc ứng xử ở Biển Đông (Code of Conduct) đang được đàm phán tích cực.',
              'Mục tiêu: Đạt được một COC thực chất, hiệu lực, hiệu quả và có tính ràng buộc pháp lý.',
            ],
            highlightTag: 'COC ràng buộc pháp lý',
          },
        ],
      },
      {
        id: 'coop-3',
        title: 'Các hiệp định phân định biển tiêu biểu',
        badge: 'Giải quyết hòa bình',
        icon: '🗺️',
        color: 'amber',
        summary: 'Thành tựu ngoại giao biển mẫu mực của Việt Nam với các nước láng giềng.',
        subBranches: [
          {
            id: 'coop-3-1',
            title: 'Hiệp định Vịnh Bắc Bộ năm 2000',
            keyPoints: [
              'Ký ngày 25/12/2000 giữa Việt Nam và Trung Quốc (cùng Hiệp định Hợp tác Nghề cá).',
              'Xác định đường phân định ranh giới lãnh hải, vùng đặc quyền kinh tế và thềm lục địa qua 21 điểm tọa độ.',
              'Tạo lập vùng đánh cá chung và cơ chế tuần tra liên hợp bảo vệ an ninh trật tự.',
            ],
            highlightTag: '21 điểm phân định',
          },
          {
            id: 'coop-3-2',
            title: 'Hiệp định vùng chồng lấn Vịnh Thái Lan (1997)',
            keyPoints: [
              'Ký ngày 09/08/1997 giữa Việt Nam và Thái Lan, phân định ranh giới thềm lục địa.',
              'Chấm dứt hơn 20 năm tranh chấp, mở đường cho hợp tác thăm dò dầu khí chung.',
            ],
            highlightTag: 'Việt Nam - Thái Lan',
          },
        ],
      },
      {
        id: 'coop-4',
        title: 'Hợp tác phi quân sự & Bảo vệ biển',
        badge: 'Cứu nạn & Khoa học',
        icon: '🛡️',
        color: 'purple',
        summary: 'Hợp tác nhân đạo, cứu hộ cứu nạn tàu cá và nghiên cứu hải văn khí hậu.',
        subBranches: [
          {
            id: 'coop-4-1',
            title: 'Tìm kiếm cứu nạn trên biển (SAR 1979)',
            keyPoints: [
              'Hỗ trợ, cứu hộ kịp thời ngư dân gặp nạn do bão gió mà không phân biệt quốc tịch.',
              'Cho phép tàu thuyền nước ngoài vào trú bão an toàn trong các âu tàu, đảo nổi của Việt Nam.',
            ],
            highlightTag: 'Nhân đạo cứu nạn',
          },
          {
            id: 'coop-4-2',
            title: 'Nghiên cứu khoa học & Chống tràn dầu',
            keyPoints: [
              'Khảo sát địa chất đáy biển, dự báo biến đổi khí hậu và nước biển dâng.',
              'Thiết lập mạng lưới ứng phó sự cố tràn dầu khẩn cấp xuyên biên giới trong khu vực ASEAN.',
            ],
            highlightTag: 'Khoa học biển',
          },
        ],
      },
    ],
    examKeywords: [
      {
        term: 'UNCLOS 1982',
        definition:
          'United Nations Convention on the Law of the Sea (Công ước của Liên Hợp Quốc về Luật Biển năm 1982).',
        trapNote: 'Việt Nam phê chuẩn năm 1994, còn ký kết công ước năm 1982.',
      },
      {
        term: 'DOC vs COC',
        definition:
          'DOC (2002) là Tuyên bố chính trị chưa có tính ràng buộc pháp lý; COC là Bộ quy tắc đang đàm phán hướng tới có tính ràng buộc pháp lý.',
      },
      {
        term: 'Hiệp định Vịnh Bắc Bộ 2000',
        definition:
          'Hiệp định phân định công bằng lãnh hải, vùng đặc quyền kinh tế và thềm lục địa giữa Việt Nam và Trung Quốc bằng 21 điểm nối.',
      },
    ],
  },

  'cause-effect': {
    pillarId: 'cause-effect',
    centerTitle: 'KINH TẾ BIỂN XANH & BỀN VỮNG',
    centerSubtitle: 'Bài 2 & Bài 3: Chuỗi quan hệ nhân quả Hợp tác - Khai thác - Môi trường',
    centerIcon: '🔄',
    curriculumRef: 'Sách giáo khoa Chuyên đề học tập Địa lí 11 – Chuyên đề phát triển kinh tế biển bền vững',
    quickTakeaway:
      'Mô hình nhân quả: Hợp tác hòa bình ➔ Khai thác hợp lý ➔ Phát triển kinh tế thịnh vượng ➔ Bảo vệ môi trường ➔ Phát triển bền vững thế hệ mai sau.',
    branches: [
      {
        id: 'ce-1',
        title: 'Mối quan hệ nhân quả tương hỗ',
        badge: 'Logic biện chứng',
        icon: '⛓️',
        color: 'sky',
        summary: '5 mắt xích khép kín không thể tách rời trong quản trị đại dương hiện đại.',
        subBranches: [
          {
            id: 'ce-1-1',
            title: 'Mắt xích 1 & 2: Hòa bình ➔ Khai thác hợp lý',
            keyPoints: [
              'Hòa bình, ổn định là tiền đề tiên quyết để ngư dân an tâm vươn khơi bám biển.',
              'Có môi trường hòa bình mới đàm phán được quy chế đánh bắt, phân chia hạn ngạch hải sản.',
            ],
            highlightTag: 'Tiền đề ổn định',
          },
          {
            id: 'ce-1-2',
            title: 'Mắt xích 3 & 4: Kinh tế ➔ Bảo vệ môi trường',
            keyPoints: [
              'Kinh tế biển phát triển tạo nguồn vốn tái đầu tư vào công nghệ xử lý chất thải và tuần tra biển.',
              'Môi trường biển trong sạch là điều kiện sống còn để du lịch và nuôi trồng thủy sản tồn tại.',
            ],
            highlightTag: 'Tái đầu tư xanh',
          },
        ],
      },
      {
        id: 'ce-2',
        title: 'Thực trạng ô nhiễm & Nguy cơ suy thoái',
        badge: 'Thách thức đại dương',
        icon: '⚠️',
        color: 'rose',
        summary: 'Khai thác quá mức và ô nhiễm rác thải đe dọa sinh kế của hàng chục triệu cư dân ven biển.',
        subBranches: [
          {
            id: 'ce-2-1',
            title: 'Đánh bắt tận diệt & Thẻ vàng IUU',
            keyPoints: [
              'Dùng lưới cào đáy mắt nhỏ, thuốc nổ, xung điện hủy hoại nguồn cá con và rạn san hô.',
              'Nguy cơ cạn kiệt cá tầng nổi và cá tầng đáy sau 20-30 năm nếu không kiểm soát.',
              'Nỗ lực gỡ cảnh báo "Thẻ vàng" IUU của Ủy ban Châu Âu (EC) đối với thủy sản Việt Nam.',
            ],
            highlightTag: 'Chống IUU',
          },
          {
            id: 'ce-2-2',
            title: 'Rác thải nhựa & Tràn dầu',
            keyPoints: [
              'Hàng triệu tấn hạt vi nhựa đổ ra Biển Đông mỗi năm, xâm nhập vào chuỗi thức ăn con người.',
              'Sự cố tràn dầu từ tàu vận tải làm chết trắng rạn san hô và rừng ngập mặn ven bờ.',
            ],
            highlightTag: 'Ô nhiễm rác nhựa',
          },
        ],
      },
      {
        id: 'ce-3',
        title: 'Chiến lược Kinh tế biển xanh (Blue Economy)',
        badge: 'Chuyển dịch tương lai',
        icon: '🌱',
        color: 'emerald',
        summary: 'Chuyển từ kinh tế khai thác nâu tiêu tốn tài nguyên sang kinh tế tuần hoàn tái tạo đại dương.',
        subBranches: [
          {
            id: 'ce-3-1',
            title: 'Mạng lưới Khu bảo tồn biển (MPA)',
            keyPoints: [
              'Mở rộng diện tích các khu bảo tồn biển (Nha Trang, Côn Đảo, Cát Bà, Cù Lao Chàm...).',
              'Bảo vệ nghiêm ngặt các rạn san hô đóng vai trò là "vườn ươm cá con" cho toàn vùng biển.',
            ],
            highlightTag: 'Khu bảo tồn MPA',
          },
          {
            id: 'ce-3-2',
            title: 'Năng lượng tái tạo biển & Cảng xanh',
            keyPoints: [
              'Phát triển điện gió ngoài khơi (Offshore Wind) tận dụng tiềm năng gió dồi dào của miền Trung.',
              'Quy chuẩn hóa mô hình "Cảng biển xanh" (Green Port) giảm phát thải khí nhà kính.',
            ],
            highlightTag: 'Điện gió ngoài khơi',
          },
        ],
      },
      {
        id: 'ce-4',
        title: 'Đích đến phát triển bền vững',
        badge: 'Thịnh vượng dài lâu',
        icon: '🏆',
        color: 'amber',
        summary: 'Cân bằng giữa tăng trưởng kinh tế, công bằng xã hội và bảo tồn thiên nhiên biển.',
        subBranches: [
          {
            id: 'ce-4-1',
            title: 'Đáp ứng nhu cầu hiện tại không làm tổn hại tương lai',
            keyPoints: [
              'Thế hệ hôm nay làm giàu từ biển nhưng vẫn để lại vùng biển giàu cá cho con cháu.',
              'Tuân thủ 17 mục tiêu phát triển bền vững của LHQ (đặc biệt SDG 14: Bảo tồn đại dương).',
            ],
            highlightTag: 'Mục tiêu SDG 14',
          },
        ],
      },
    ],
    examKeywords: [
      {
        term: 'Khai thác hải sản bất hợp pháp (IUU)',
        definition:
          'Illegal, Unreported and Unregulated fishing: Hoạt động đánh cá không khai báo, không theo quy định hoặc vi phạm vùng biển nước khác.',
        trapNote: 'Chống khai thác IUU là nhiệm vụ cấp bách để phát triển ngành thủy sản bền vững.',
      },
      {
        term: 'Kinh tế biển xanh (Blue Economy)',
        definition:
          'Mô hình sử dụng bền vững các nguồn tài nguyên biển cho tăng trưởng kinh tế gắn liền với bảo tồn sức khỏe các hệ sinh thái đại dương.',
      },
      {
        term: 'Carbon xanh (Blue Carbon)',
        definition:
          'Lượng carbon dioxide được hấp thụ và lưu giữ tự nhiên bởi các hệ sinh thái ven biển như rừng ngập mặn và thảm cỏ biển.',
      },
    ],
  },

  vietnam: {
    pillarId: 'vietnam',
    centerTitle: 'VIỆT NAM & BIỂN ĐÔNG',
    centerSubtitle: 'Bài 3 (phần III): Chủ quyền biển đảo, 5 vùng biển & Trách nhiệm công dân',
    centerIcon: '🇻🇳',
    curriculumRef: 'Sách giáo khoa Chuyên đề học tập Địa lí 11 – Bài 3: Chủ quyền biển đảo của Việt Nam',
    quickTakeaway:
      'Việt Nam có bờ biển dài trên 3.260 km, vùng biển trên 1 triệu km² với 5 vùng biển theo UNCLOS 1982. Hoàng Sa và Trường Sa là bộ phận lãnh thổ thiêng liêng, không thể tách rời.',
    branches: [
      {
        id: 'vn-1',
        title: '5 vùng biển xác lập theo UNCLOS & Luật Biển VN 2012',
        badge: 'Quy chế pháp lý',
        icon: '📏',
        color: 'sky',
        summary: 'Các vùng biển tính từ đường cơ sở thẳng năm 1982 theo chuẩn mực quốc tế.',
        subBranches: [
          {
            id: 'vn-1-1',
            title: 'Nội thủy & Lãnh hải (12 hải lý)',
            keyPoints: [
              'Nội thủy: Vùng nước phía trong đường cơ sở, chủ quyền hoàn toàn, tuyệt đối như đất liền.',
              'Lãnh hải: Rộng 12 hải lý (khoảng 22,2 km) từ đường cơ sở. Ranh giới ngoài của lãnh hải chính là BIÊN GIỚI QUỐC GIA TRÊN BIỂN.',
              'Tàu thuyền nước ngoài được "đi qua không gây hại" trong lãnh hải.',
            ],
            highlightTag: 'Lãnh hải: Biên giới biển',
          },
          {
            id: 'vn-1-2',
            title: 'Tiếp giáp lãnh hải (12 hải lý tiếp theo)',
            keyPoints: [
              'Rộng 12 hải lý tiếp liền lãnh hải (tổng cộng 24 hải lý từ đường cơ sở).',
              'Nhà nước thực hiện quyền tài phán để kiểm soát hải quan, thuế khóa, y tế, xuất nhập cảnh và an ninh.',
            ],
            highlightTag: 'Tiếp giáp: 12 hải lý tiếp',
          },
          {
            id: 'vn-1-3',
            title: 'Vùng đặc quyền kinh tế EEZ (200 hải lý)',
            keyPoints: [
              'Rộng 200 hải lý tính từ đường cơ sở.',
              'Việt Nam có QUYỀN CHỦ QUYỀN kinh tế (thăm dò, khai thác tài nguyên sinh vật, dầu khí) và quyền tài phán đối với nghiên cứu khoa học, bảo vệ môi trường.',
              'Các nước khác được tự do hàng hải, hàng không và đặt dây cáp ngầm.',
            ],
            highlightTag: 'EEZ: Quyền chủ quyền',
          },
          {
            id: 'vn-1-4',
            title: 'Thềm lục địa Việt Nam',
            keyPoints: [
              'Gồm đáy biển và lòng đất dưới đáy biển kéo dài tự nhiên ra đến mép ngoài của rìa lục địa (tối thiểu 200 hải lý, có thể mở rộng đến 350 hải lý theo UNCLOS).',
              'Quyền chủ quyền hoàn toàn trong khai thác khoáng sản dầu khí đáy biển.',
            ],
            highlightTag: 'Đáy & lòng đất dưới đáy',
          },
        ],
      },
      {
        id: 'vn-2',
        title: 'Hai quần đảo Hoàng Sa và Trường Sa',
        badge: 'Máu thịt thiêng liêng',
        icon: '🏝️',
        color: 'rose',
        summary: 'Việt Nam có đầy đủ bằng chứng lịch sử và cơ sở pháp lý khẳng định chủ quyền lâu đời.',
        subBranches: [
          {
            id: 'vn-2-1',
            title: 'Quần đảo Hoàng Sa (Đà Nẵng)',
            keyPoints: [
              'Là huyện đảo Hoàng Sa thuộc thành phố Đà Nẵng, gồm hơn 30 đảo, bãi đá ngầm, cồn cát san hô.',
              'Nhà nước phong kiến Việt Nam (từ thời chúa Nguyễn thế kỷ XVII) đã lập Đội Hoàng Sa để đo đạc, cắm mốc chủ quyền liên tục.',
            ],
            highlightTag: 'Huyện đảo Hoàng Sa',
          },
          {
            id: 'vn-2-2',
            title: 'Quần đảo Trường Sa (Khánh Hòa)',
            keyPoints: [
              'Là huyện đảo Trường Sa thuộc tỉnh Khánh Hòa, gồm hơn 100 đảo nổi, đảo chìm và bãi cạn san hô.',
              'Vị trí chiến lược án ngữ tuyến hàng hải huyết mạch quốc tế qua Biển Đông.',
              'Nhà giàn DK1 bảo vệ thềm lục địa phía Nam (bãi Tư Chính, Phúc Nguyên...).',
            ],
            highlightTag: 'Huyện đảo Trường Sa',
          },
        ],
      },
      {
        id: 'vn-3',
        title: 'Chiến lược phát triển kinh tế biển Việt Nam',
        badge: 'Nghị quyết 36-NQ/TW',
        icon: '📈',
        color: 'amber',
        summary: 'Mục tiêu đưa Việt Nam trở thành quốc gia biển mạnh, làm giàu từ biển bền vững.',
        subBranches: [
          {
            id: 'vn-3-1',
            title: '4 trụ cột ngành kinh tế biển then chốt',
            keyPoints: [
              '1. Du lịch và dịch vụ biển.',
              '2. Kinh tế hàng hải (Cảng biển nước sâu & đội tàu vận tải).',
              '3. Khai thác dầu khí và các tài nguyên khoáng sản biển khác.',
              '4. Nuôi trồng và khai thác hải sản xa bờ gắn với chế biến công nghệ cao.',
            ],
            highlightTag: '4 ngành kinh tế biển',
          },
        ],
      },
      {
        id: 'vn-4',
        title: 'Trách nhiệm của học sinh & Thế hệ trẻ',
        badge: 'Hành động thiết thực',
        icon: '🎓',
        color: 'emerald',
        summary: 'Học tập vững vàng, lan tỏa tình yêu biển đảo và bảo vệ môi trường biển quê hương.',
        subBranches: [
          {
            id: 'vn-4-1',
            title: '3 việc học sinh FPT School có thể làm ngay',
            keyPoints: [
              'Nắm chắc kiến thức Địa lí, lịch sử chủ quyền biển đảo theo chuẩn SGK mới.',
              'Lan tỏa thông tin chính xác, nói không với tin giả xuyên tạc chủ quyền lãnh thổ.',
              'Tham gia bảo vệ môi trường: Không xả rác nhựa bừa bãi, bảo vệ nguồn nước.',
            ],
            highlightTag: 'Chủ nhân tương lai',
          },
        ],
      },
    ],
    examKeywords: [
      {
        term: 'Chủ quyền tuyệt đối vs Quyền chủ quyền',
        definition:
          'Chủ quyền tuyệt đối áp dụng cho Nội thủy và Lãnh hải (như lãnh thổ trên đất liền). Quyền chủ quyền áp dụng cho Vùng đặc quyền kinh tế (EEZ) và Thềm lục địa (chỉ đối với thăm dò, khai thác tài nguyên).',
        trapNote: 'Đây là câu hỏi phân loại học sinh giỏi kinh điển trong các đề thi Địa lí 11.',
      },
      {
        term: 'Biên giới quốc gia trên biển',
        definition: 'Là ranh giới phía ngoài của LÃNH HẢI (cách đường cơ sở 12 hải lý), KHÔNG PHẢI ranh giới ngoài của EEZ.',
        trapNote: 'Học sinh rất hay nhầm biên giới biển là 200 hải lý.',
      },
      {
        term: 'Đường cơ sở thẳng năm 1982',
        definition: 'Đường gãy khúc nối 11 điểm mốc từ điểm A1 (Hòn Nhạn - Kiên Giang) đến điểm A11 (đảo Cồn Cỏ - Quảng Trị).',
      },
    ],
  },

  all: {
    pillarId: 'all',
    centerTitle: 'HỆ THỐNG HÓA TOÀN BỘ CHUYÊN ĐỀ ĐỊA LÍ 11 (BIỂN ĐÔNG)',
    centerSubtitle: 'Sơ đồ tư duy tổng hợp toàn diện 5 Trụ cột tri thức SGK Chuyên đề 11 (GDPT 2018)',
    centerIcon: '🧠',
    curriculumRef: 'Toàn bộ nội dung chuẩn theo Sách Giáo Khoa Chuyên Đề Học Tập Địa Lí 11 (NXB Giáo Dục Việt Nam)',
    quickTakeaway:
      'Ghi nhớ cốt lõi toàn chuyên đề: Biển Đông (3,44 triệu km², 9 nước ven biển) có 4 nhóm tài nguyên chiến lược. Để phát triển bền vững cần tuân thủ UNCLOS 1982, hợp tác hòa bình và bảo vệ nghiêm ngặt chủ quyền biển đảo Việt Nam (Hoàng Sa, Trường Sa, 1.010.274 km²).',
    branches: [
      {
        id: 'all-pillar-1',
        title: 'Trụ cột 1: Vị trí địa lí & Điều kiện tự nhiên Biển Đông',
        badge: '~3,44 triệu km² • 3°B - 26°B',
        icon: '🌐',
        color: 'sky',
        summary: 'Biển nửa kín lớn thứ 4 thế giới, cầu nối huyết mạch Ấn Độ Dương - Thái Bình Dương.',
        subBranches: [
          {
            id: 'all-p1-1',
            title: 'Diện tích & Phạm vi không gian',
            keyPoints: [
              'Diện tích khoảng 3,44 triệu km², lớn thứ 4 thế giới, thứ 2 châu Á.',
              'Trải dài từ 3°B đến 26°B và từ 100°Đ đến 121°Đ qua 3 vành đai khí hậu nhiệt đới.',
              'Bao bọc bởi 9 quốc gia ven biển và 1 vùng lãnh thổ (Đài Loan).',
            ],
            highlightTag: '3,44 tr. km²',
          },
          {
            id: 'all-p1-2',
            title: 'Các eo biển huyết mạch & Hai vịnh lớn',
            keyPoints: [
              'Eo biển yết hầu: Ma-lắc-ca (vận chuyển 1/4 dầu mỏ thế giới), Đài Loan, Lu-dông, Ga-xpa...',
              'Hai vịnh quan trọng: Vịnh Bắc Bộ và Vịnh Thái Lan.',
              'Tuyến đường hàng hải quốc tế tấp nập thứ 2 toàn cầu.',
            ],
            highlightTag: 'Eo biển Ma-lắc-ca',
          },
        ],
      },
      {
        id: 'all-pillar-2',
        title: 'Trụ cột 2: Tài nguyên thiên nhiên & Tiềm năng phát triển',
        badge: '4 nhóm tài nguyên chiến lược',
        icon: '💎',
        color: 'emerald',
        summary: 'Nguồn lợi sinh vật phong phú, dầu khí thềm lục địa, du lịch biển đảo và cảng nước sâu.',
        subBranches: [
          {
            id: 'all-p2-1',
            title: 'Sinh vật biển & Thủy hải sản',
            keyPoints: [
              'Hơn 2.000 loài cá biển, đóng góp 7 - 8% tổng sản lượng đánh bắt toàn thế giới.',
              'Rạn san hô, thảm cỏ biển nhiệt đới có năng suất sinh học cực cao.',
            ],
            highlightTag: '7 - 8% cá thế giới',
          },
          {
            id: 'all-p2-2',
            title: 'Khoáng sản dầu khí, Băng cháy & Cảng biển',
            keyPoints: [
              'Trữ lượng dầu khí lớn tại các bể trầm tích thềm lục địa (Nam Côn Sơn, Cửu Long, Sông Hồng...).',
              'Băng cháy (khí hydrate) là nguồn năng lượng tương lai của nhân loại.',
              'Nhiều vũng vịnh kín gió xây dựng cụm cảng nước sâu đón tàu tải trọng siêu lớn.',
            ],
            highlightTag: 'Dầu khí & Cảng nước sâu',
          },
        ],
      },
      {
        id: 'all-pillar-3',
        title: 'Trụ cột 3: Môi trường & Hợp tác quốc tế ở Biển Đông',
        badge: 'UNCLOS 1982 • DOC • COC',
        icon: '🤝',
        color: 'purple',
        summary: 'Bảo vệ môi trường sinh thái biển và giải quyết tranh chấp bằng biện pháp hòa bình.',
        subBranches: [
          {
            id: 'all-p3-1',
            title: 'Hiện trạng môi trường & Các thách thức',
            keyPoints: [
              'Khai thác hải sản quá mức (IUU), suy giảm rạn san hô, ô nhiễm nhựa và sự cố tràn dầu.',
              'Biến đổi khí hậu, nước biển dâng đe dọa sinh kế các vùng ven bờ.',
            ],
            highlightTag: 'Bảo tồn sinh thái',
          },
          {
            id: 'all-p3-2',
            title: 'Cơ chế pháp lý quốc tế & Thành tựu hợp tác',
            keyPoints: [
              'Công ước Liên Hợp Quốc về Luật Biển UNCLOS 1982 là "Hiến pháp của đại dương".',
              'Tuyên bố về cách ứng xử của các bên ở Biển Đông (DOC 2002), hướng tới COC hiệu lực, thực chất.',
              'Hiệp định phân định Vịnh Bắc Bộ và Hiệp định nghề cá Việt Nam - Trung Quốc (25/12/2000).',
              'Thỏa thuận vùng nước lịch sử chung Việt Nam - Cam-pu-chia (1982) và phân định thềm lục địa với Ma-lai-xi-a, In-đô-nê-xi-a, Thái Lan.',
            ],
            highlightTag: 'UNCLOS 1982 & DOC',
          },
        ],
      },
      {
        id: 'all-pillar-4',
        title: 'Trụ cột 4: Mô hình quan hệ Nhân - Quả (Phát triển bền vững)',
        badge: 'Chuỗi liên hoàn 5 mắt xích',
        icon: '🔄',
        color: 'amber',
        summary: 'Hợp tác hòa bình ➔ Khai thác hợp lí ➔ Phát triển kinh tế ➔ Bảo vệ môi trường ➔ Bền vững.',
        subBranches: [
          {
            id: 'all-p4-1',
            title: 'Mối quan hệ biện chứng giữa các yếu tố',
            keyPoints: [
              'Hợp tác hòa bình là tiền đề ổn định để nghiên cứu, khảo sát và đầu tư hạ tầng biển.',
              'Khai thác hợp lí đảm bảo phục hồi trữ lượng hải sản và không làm cạn kiệt tài nguyên không tái tạo.',
              'Bảo vệ môi trường biển là nền tảng sống còn cho sự phát triển lâu dài của mọi quốc gia ven biển.',
            ],
            highlightTag: 'Mô hình nhân - quả',
          },
        ],
      },
      {
        id: 'all-pillar-5',
        title: 'Trụ cột 5: Biển Đông & Chủ quyền Biển đảo Việt Nam',
        badge: '1.010.274 km² • Hoàng Sa & Trường Sa',
        icon: '🇻🇳',
        color: 'rose',
        summary: '5 vùng biển UNCLOS, hai quần đảo thiêng liêng Hoàng Sa - Trường Sa và 4 ngành kinh tế biển.',
        subBranches: [
          {
            id: 'all-p5-1',
            title: '5 vùng biển Việt Nam theo Luật Biển Việt Nam 2012',
            keyPoints: [
              'Nội thủy: Chủ quyền hoàn toàn, tuyệt đối như đất liền.',
              'Lãnh hải (12 hải lý): Biên giới quốc gia trên biển.',
              'Tiếp giáp lãnh hải (12 hải lý tiếp): Quyền tài phán an ninh, hải quan, y tế.',
              'Vùng đặc quyền kinh tế EEZ (200 hải lý): Quyền chủ quyền thăm dò, khai thác kinh tế.',
              'Thềm lục địa: Đáy và lòng đất dưới đáy biển, quyền chủ quyền khai thác khoáng sản.',
            ],
            highlightTag: '5 vùng biển chuẩn',
          },
          {
            id: 'all-p5-2',
            title: 'Hoàng Sa (Đà Nẵng), Trường Sa (Khánh Hòa) & Nhà giàn DK1',
            keyPoints: [
              'Bằng chứng lịch sử và pháp lý vững chắc: Các triều đại phong kiến Việt Nam đã xác lập chủ quyền thực sự, liên tục từ thế kỷ XVII.',
              'Huyện đảo Hoàng Sa (Đà Nẵng) và Huyện đảo Trường Sa (Khánh Hòa) là lãnh thổ không thể tách rời.',
              'Nhà giàn DK1 bảo vệ thềm lục địa phía Nam (Bãi Tư Chính, Phúc Nguyên...).',
            ],
            highlightTag: 'Chủ quyền thiêng liêng',
          },
          {
            id: 'all-p5-3',
            title: '4 ngành kinh tế biển then chốt & Trách nhiệm học sinh',
            keyPoints: [
              '1. Du lịch dịch vụ biển; 2. Kinh tế hàng hải; 3. Khai thác dầu khí & khoáng sản biển; 4. Nuôi trồng, đánh bắt hải sản xa bờ.',
              'Học sinh FPT School học tập nghiêm túc, lan tỏa tình yêu quê hương, bảo vệ môi trường biển.',
            ],
            highlightTag: 'Kinh tế biển mạnh',
          },
        ],
      },
    ],
    examKeywords: [
      {
        term: 'Diện tích toàn bộ Biển Đông',
        definition: 'Khoảng 3,44 triệu km², lớn thứ 4 thế giới và thứ 2 châu Á.',
        trapNote: 'Không nhầm với vùng biển của Việt Nam (~1.010.274 km²).',
      },
      {
        term: 'Biên giới quốc gia trên biển',
        definition: 'Là ranh giới ngoài của LÃNH HẢI (cách đường cơ sở 12 hải lý).',
        trapNote: 'Không phải ranh giới của EEZ (200 hải lý).',
      },
      {
        term: 'Chủ quyền tuyệt đối vs Quyền chủ quyền',
        definition: 'Chủ quyền tuyệt đối ở Nội thủy & Lãnh hải; Quyền chủ quyền ở EEZ & Thềm lục địa.',
        trapNote: 'Tránh nhầm lẫn phạm vi quyền năng của nhà nước.',
      },
      {
        term: 'Hoàng Sa & Trường Sa',
        definition: 'Huyện đảo Hoàng Sa trực thuộc TP Đà Nẵng; Huyện đảo Trường Sa trực thuộc tỉnh Khánh Hòa.',
      },
    ],
  },
};
