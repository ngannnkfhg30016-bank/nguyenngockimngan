import { GradeLevel, ResourceItem, CooperationItem, KnowledgePillar } from '../types';

export interface LocationRoleData {
  areaKm2: string;
  latitudeSpan: string;
  surroundingCountries: string[];
  connectingStraits: { name: string; connects: string }[];
  importantGulfs: string[];
  roleAsean: Record<GradeLevel, string[]>;
  roleVietnam: Record<GradeLevel, string[]>;
  spatialFeatures: Record<GradeLevel, string[]>;
}

export const locationAndRoleData: LocationRoleData = {
  areaKm2: 'Khoảng 3,44 triệu km²',
  latitudeSpan: 'Trải rộng từ khoảng 3°B tới 26°B',
  surroundingCountries: [
    'Việt Nam',
    'Trung Quốc',
    'Cam-pu-chia',
    'Thái Lan',
    'Ma-lai-xi-a',
    'Xin-ga-po',
    'In-đô-nê-xi-a',
    'Bru-nây',
    'Phi-líp-pin',
  ],
  connectingStraits: [
    { name: 'Eo biển Ma-lắc-ca', connects: 'Thông giữa Biển Đông và Ấn Độ Dương' },
    { name: 'Eo biển Đài Loan', connects: 'Nối với biển Hoa Đông và biển Nhật Bản' },
    { name: 'Các eo biển thuộc Phi-líp-pin', connects: 'Nối thông ra Thái Bình Dương rộng lớn' },
  ],
  importantGulfs: ['Vịnh Bắc Bộ', 'Vịnh Thái Lan', 'Vịnh Xu-bích', 'Vịnh Ma-ni-la'],
  roleAsean: {
    tieuhoc: [
      'Là chiếc cầu nối xanh tuyệt đẹp giữa các quốc gia Đông Nam Á.',
      'Mang lại nguồn cá tôm dồi dào nuôi sống hàng triệu gia đình.',
      'Tạo nên những bãi biển trong lành cho mọi người vui chơi, khám phá.',
    ],
    thcs: [
      'Không gian sinh tồn, phát triển kinh tế biển trọng yếu của các nước Đông Nam Á.',
      'Cung cấp tuyến đường hàng hải huyết mạch nhộn nhịp thứ hai thế giới qua eo biển Ma-lắc-ca.',
      'Tạo điều kiện liên kết kinh tế, hợp tác giao lưu văn hóa và phát triển chuỗi cung ứng khu vực.',
    ],
    thpt: [
      'Biển Đông là vùng biển chiến lược quan trọng bậc nhất thế giới, án ngữ các tuyến hàng hải quốc tế kết nối Ấn Độ Dương và Thái Bình Dương.',
      'Điều hòa khí hậu nhiệt đới gió mùa ẩm cho toàn khu vực Đông Nam Á, giảm tính chất khô hạn lục địa.',
      'Không gian phát triển của 9 nền kinh tế biển liên quan, chiếm khoảng 7 - 8% sản lượng cá khai thác của thế giới.',
      'Địa bàn hợp tác an ninh, nghiên cứu hải văn, cứu hộ cứu nạn và ứng phó biến đổi khí hậu.',
    ],
  },
  roleVietnam: {
    tieuhoc: [
      'Biển Đông ôm trọn dải đất hình chữ S thân yêu của Việt Nam.',
      'Mang đến những bờ cát vàng, sóng biển rì rào và hải sản thơm ngon.',
      'Nơi có hai quần đảo Hoàng Sa và Trường Sa là máu thịt thiêng liêng của Tổ quốc.',
    ],
    thcs: [
      'Gắn liền với lịch sử dựng nước và giữ nước, mở rộng không gian phát triển của dân tộc.',
      'Phát triển 4 ngành kinh tế biển: Thủy sản, Dầu khí, Cảng biển - Vận tải, và Du lịch biển.',
      'Tạo nên hệ sinh thái ven biển đa dạng (rừng ngập mặn, rạn san hô, đầm phá).',
    ],
    thpt: [
      'Vị trí địa chính trị - kinh tế chiến lược: Việt Nam có bờ biển dài trên 3.260 km, vùng biển thuộc chủ quyền và quyền tài phán rộng trên 1 triệu km² (1.010.274 km²).',
      'Cửa ngõ vươn ra đại dương thế giới, kết nối các vùng kinh tế trọng điểm trong nước với chuỗi thương mại toàn cầu.',
      'Trữ lượng tài nguyên giàu có: thềm lục địa nhiều mỏ dầu khí (Bạch Hổ, Đại Hùng, Rồng...), ngư trường lớn với 4 ngư trường trọng điểm.',
      'Ý nghĩa quốc phòng - an ninh: Tuyến phòng thủ hướng biển bảo vệ vững chắc chủ quyền lãnh thổ quốc gia.',
    ],
  },
  spatialFeatures: {
    tieuhoc: [
      'Biển rất rộng lớn (3,44 triệu km²), nước biển xanh thẳm và có nhiều hòn đảo xinh đẹp.',
      'Nối liền hai đại dương lớn là Thái Bình Dương và Ấn Độ Dương.',
    ],
    thcs: [
      'Là biển nửa kín, trải dài từ vùng xích đạo đến vùng cận nhiệt đới (3°B đến 26°B).',
      'Được bao bọc bởi lục địa châu Á và các quần đảo vòng cung.',
    ],
    thpt: [
      'Đặc điểm hình thái: Biển nửa kín (semi-enclosed sea) lớn thứ 2 ở châu Á và thứ 4 trên thế giới, diện tích khoảng 3,44 triệu km².',
      'Độ sâu phân tầng rõ rệt: Thềm lục địa nông ở phía Bắc (vịnh Bắc Bộ) và phía Nam (thềm lục địa Sunda); bồn trũng sâu ở trung tâm (sâu tới trên 4.000m).',
      'Chế độ thủy văn nhiệt đới gió mùa: Hải lưu đảo chiều theo mùa gió Đông Bắc và Tây Nam, chịu tác động của bão nhiệt đới.',
    ],
  },
};

export const resourcesList: ResourceItem[] = [
  {
    id: 'res-fishery',
    name: 'Hải sản Biển Đông',
    category: 'fishery',
    title: 'Nguồn lợi sinh vật & Hải sản',
    shortDesc: {
      tieuhoc: 'Cung cấp hàng trăm loại cá, tôm, mực tươi ngon cho bữa ăn hàng ngày.',
      thcs: 'Hơn 100 loài cá giá trị kinh tế cao, đóng góp 7 - 8% sản lượng cá đánh bắt thế giới.',
      thpt: 'Hệ sinh thái biển nhiệt đới đa dạng sinh học cao, nguồn lợi thủy sản chiếm 7 - 8% sản lượng cá khai thác toàn cầu.',
    },
    characteristics: [
      'Có hơn 100 loài cá có giá trị kinh tế cao và khả năng khai thác với trữ lượng lớn.',
      'Các loài tiêu biểu: Cá ngừ, cá thu, cá nục, cá trích, mực, tôm hùm, hải sâm.',
      'Đa dạng các hệ sinh thái: Rạn san hô, cỏ biển, rừng ngập mặn tạo bãi đẻ tự nhiên.',
    ],
    role: [
      'Bảo đảm an ninh lương thực và thực phẩm cho hàng trăm triệu cư dân ven biển.',
      'Tạo sinh kế cho hàng triệu ngư dân các nước trong khu vực Đông Nam Á.',
      'Cung cấp nguyên liệu xuất khẩu thủy sản mang lại giá trị ngoại tệ cao.',
    ],
    howExtracted: [
      'Đánh bắt xa bờ kết hợp thiết bị định vị và bảo quản lạnh hiện đại.',
      'Thực hiện nghiêm túc quy định chống khai thác bất hợp pháp (IUU).',
      'Quy định mùa cấm đánh bắt và kích thước mắt lưới tối thiểu.',
    ],
    vietnamExample:
      'Việt Nam có 4 ngư trường trọng điểm: Hải Phòng - Quảng Ninh; Ninh Thuận - Bình Thuận - Bà Rịa Vũng Tàu; Cà Mau - Kiên Giang; và ngư trường Quần đảo Hoàng Sa - Quần đảo Trường Sa.',
    environmentalRisk:
      'Nguy cơ cạn kiệt nguồn lợi do đánh bắt tận diệt, dùng xung điện, lưới cào đáy phá hủy rạn san hô, và rác thải nhựa đại dương.',
    iconName: 'Fish',
    tags: ['Sinh vật biển', 'Ngư trường', 'An ninh lương thực'],
  },
  {
    id: 'res-oilgas',
    name: 'Dầu mỏ và Khí tự nhiên',
    category: 'oilgas',
    title: 'Khoáng sản Năng lượng',
    shortDesc: {
      tieuhoc: 'Vàng đen dưới đáy biển sâu giúp chạy xe, tạo điện và sản xuất xăng dầu.',
      thcs: 'Trữ lượng dầu khí dồi dào ở thềm lục địa, động lực phát triển công nghiệp.',
      thpt: 'Nguồn năng lượng hóa thạch chiến lược, phân bố chủ yếu ở thềm lục địa nông và các bồn trũng trầm tích.',
    },
    characteristics: [
      'Phân bố tại các bồn trũng trầm tích như Sông Hồng, Cửu Long, Nam Côn Sơn, Mã Lai - Thổ Chu.',
      'Trữ lượng ước tính hàng tỉ tấn dầu và hàng trăm tỉ mét khối khí thiên nhiên.',
      'Có tiềm năng phát hiện băng cháy (hydrat khí methane) ở vùng nước sâu.',
    ],
    role: [
      'Cung cấp nhiên liệu cho các nhà máy nhiệt điện khí và nhà máy lọc hóa dầu.',
      'Đảm bảo an ninh năng lượng quốc gia và phục vụ công nghiệp hóa.',
      'Đóng góp tỉ trọng lớn vào ngân sách nhà nước và thu hút đầu tư nước ngoài.',
    ],
    howExtracted: [
      'Xây dựng các giàn khoan cố định và giàn khoan bán chìm hiện đại.',
      'Đường ống dẫn khí ngầm dưới biển đưa khí vào bờ xử lý tại các cụm công nghiệp khí - điện - đạm.',
    ],
    vietnamExample:
      'Việt Nam khai thác hiệu quả các mỏ: Bạch Hổ, Rồng, Đại Hùng, Rạng Đông, Lan Tây, Lan Đỏ; cung cấp khí cho các cụm Phú Mỹ (Bà Rịa - Vũng Tàu) và Khí - Điện - Đạm Cà Mau.',
    environmentalRisk:
      'Sự cố tràn dầu từ giàn khoan và tàu chở dầu gây ô nhiễm nghiêm trọng nước biển, làm chết sinh vật biển và hủy hoại bãi biển du lịch.',
    iconName: 'Flame',
    tags: ['Năng lượng', 'Thềm lục địa', 'Bạch Hổ'],
  },
  {
    id: 'res-shipping',
    name: 'Giao thông vận tải biển',
    category: 'shipping',
    title: 'Huyết mạch Hàng hải Quốc tế',
    shortDesc: {
      tieuhoc: 'Những con tàu khổng lồ chở hàng hóa qua lại tấp nập giữa các châu lục.',
      thcs: 'Tuyến hàng hải quốc tế nhộn nhịp thứ hai thế giới qua eo biển Ma-lắc-ca.',
      thpt: 'Huyết mạch thương mại liên đại dương nối Thái Bình Dương - Ấn Độ Dương, vận chuyển hơn 50% dầu thô toàn cầu.',
    },
    characteristics: [
      'Hơn 50% khối lượng vận tải dầu thô và một phần ba tổng lượng hàng hóa thương mại thế giới đi qua Biển Đông.',
      'Tập trung các eo biển chiến lược: Eo Ma-lắc-ca, eo Đài Loan, eo Ba-si, eo Ga-xpa.',
      'Hệ thống luồng lạch nước sâu cho phép các tàu container siêu lớn di chuyển.',
    ],
    role: [
      'Cầu nối thương mại then chốt giữa Đông Á với châu Âu, Trung Đông và châu Phi.',
      'Thúc đẩy tăng trưởng kinh tế, xuất nhập khẩu và hội nhập toàn cầu.',
      'Hình thành mạng lưới logistics quốc tế hiện đại.',
    ],
    howExtracted: [
      'Xây dựng luồng hàng hải an toàn, hệ thống hải đăng, phao tiêu và radar ven biển.',
      'Phát triển đội tàu viễn dương và hợp tác bảo đảm an toàn hàng hải quốc tế.',
    ],
    vietnamExample:
      'Đường bờ biển Việt Nam nằm song song với tuyến hàng hải quốc tế nhộn nhịp nhất thế giới, tạo ưu thế vượt trội để phát triển dịch vụ hàng hải quốc tế.',
    environmentalRisk:
      'Ô nhiễm khí thải tàu biển (lưu huỳnh, carbon), nước dằn tàu đem theo sinh vật ngoại lai gây hại, và nguy cơ va chạm tàu thuyền gây rò rỉ nhiên liệu.',
    iconName: 'Ship',
    tags: ['Hàng hải', 'Eo biển Malacca', 'Logistics'],
  },
  {
    id: 'res-port',
    name: 'Cảng biển nước sâu',
    category: 'port',
    title: 'Hạ tầng Cảng biển & Hậu cần',
    shortDesc: {
      tieuhoc: 'Nơi tàu thuyền cập bến bốc dỡ hàng hóa và tránh gió bão an toàn.',
      thcs: 'Các cảng biển nước sâu đóng vai trò cửa ngõ xuất nhập khẩu hàng hóa.',
      thpt: 'Đầu mối trung chuyển container quốc tế, hình thành các vùng kinh tế ven biển động lực.',
    },
    characteristics: [
      'Nhiều vũng vịnh kín gió, độ sâu lý tưởng (>14 - 18m) đón được tàu trọng tải lớn.',
      'Phân bố đều dọc bờ biển các nước Đông Nam Á và Trung Quốc.',
    ],
    role: [
      'Là đầu mối giao thông đa phương thức kết nối đường biển, đường bộ, đường sắt và đường thủy nội địa.',
      'Hỗ trợ công nghiệp chế biến xuất khẩu và dịch vụ kho vận cảng biển.',
    ],
    howExtracted: [
      'Nạo vét luồng tàu, lắp đặt cẩu bờ hiện đại, ứng dụng công nghệ cảng thông minh (Smart Port).',
    ],
    vietnamExample:
      'Cụm cảng Hải Phòng (Lạch Huyện), Đà Nẵng, Quy Nhơn, Cái Mép - Thị Vải (Bà Rịa - Vũng Tàu đón được siêu tàu 200.000 tấn đi trực tiếp châu Mỹ, châu Âu).',
    environmentalRisk:
      'Bùn nạo vét xả ra biển làm đục nước, mất sinh thái bùn cát tự nhiên và ô nhiễm dầu nhờn từ tàu neo đậu.',
    iconName: 'Anchor',
    tags: ['Cảng biển', 'Cái Mép', 'Hải Phòng'],
  },
  {
    id: 'res-tourism',
    name: 'Du lịch & Dịch vụ biển',
    category: 'tourism',
    title: 'Cảnh quan & Kinh tế Du lịch Biển',
    shortDesc: {
      tieuhoc: 'Những bãi biển cát trắng, rạn san hô rực rỡ thu hút du khách đến tắm biển và nghỉ dưỡng.',
      thcs: 'Tiềm năng du lịch biển đảo phong phú với nhiều di sản thiên nhiên thế giới.',
      thpt: 'Ngành kinh tế mũi nhọn phát huy cảnh quan vịnh biển nhiệt đới, khí hậu ấm áp quanh năm.',
    },
    characteristics: [
      'Khí hậu nhiệt đới nắng ấm, làn nước trong xanh, hàng vạn hòn đảo kỳ vĩ.',
      'Sở hữu nhiều di sản thế giới: Vịnh Hạ Long, quần đảo Cát Bà, vườn quốc gia Côn Đảo, Phuket, Bali.',
    ],
    role: [
      'Tạo công ăn việc làm cho cộng đồng địa phương và quảng bá hình ảnh đất nước.',
      'Thúc đẩy phát triển đồng bộ ngành giao thông, ẩm thực, khách sạn và dịch vụ.',
    ],
    howExtracted: [
      'Xây dựng khu nghỉ dưỡng sinh thái, tour lặn biển ngắm san hô, du thuyền trên vịnh.',
      'Phát triển mô hình du lịch xanh không rác thải nhựa.',
    ],
    vietnamExample:
      'Việt Nam có các trung tâm du lịch biển nổi tiếng: Vịnh Hạ Long (Quảng Ninh), Cát Bà (Hải Phòng), Sầm Sơn, Lăng Cô, Đà Nẵng, Nha Trang, Mũi Né, Vũng Tàu, Phú Quốc.',
    environmentalRisk:
      'Quá tải du khách xả rác bừa bãi, gãy nát rạn san hô do dẫm đạp, nước thải chưa xử lý xả trực tiếp ra biển làm ô nhiễm nguồn nước.',
    iconName: 'Palmtree',
    tags: ['Du lịch biển', 'Hạ Long', 'Phú Quốc'],
  },
  {
    id: 'res-windenergy',
    name: 'Năng lượng gió & Biển',
    category: 'windenergy',
    title: 'Năng lượng Tái tạo Xanh',
    shortDesc: {
      tieuhoc: 'Những cối xay gió khổng lồ đứng giữa biển biến sức gió thành điện sạch cho trường học và gia đình.',
      thcs: 'Tiềm năng điện gió ngoài khơi và năng lượng sóng, thủy triều dồi dào, thân thiện với thiên nhiên.',
      thpt: 'Nguồn năng lượng tái tạo tiềm năng bậc nhất trong tiến trình chuyển dịch năng lượng xanh và Net Zero 2050.',
    },
    characteristics: [
      'Tốc độ gió trung bình trên Biển Đông đạt từ 7 - 10 m/s ở độ cao 100m, cực kỳ lý tưởng cho tuabin gió.',
      'Khu vực thềm lục địa nông (<50m) thuận lợi để đóng móng tuabin gió ngoài khơi.',
    ],
    role: [
      'Giảm phụ thuộc vào năng lượng hóa thạch, giảm phát thải khí nhà kính.',
      'Đảm bảo an ninh năng lượng sạch dài hạn cho các trung tâm kinh tế ven biển.',
    ],
    howExtracted: [
      'Lắp đặt các trang trại điện gió ngoài khơi (Offshore Wind Farms) truyền tải điện bằng cáp ngầm.',
    ],
    vietnamExample:
      'Các cánh đồng điện gió biển ở Bạc Liêu, Sóc Trăng, Trà Vinh, Bình Thuận; quy hoạch các cụm điện gió ngoài khơi lớn tại Bắc Bộ và Nam Trung Bộ.',
    environmentalRisk:
      'Tiếng ồn khi đóng cọc ảnh hưởng tạm thời đến cá heo và động vật biển; cần quy hoạch tránh tuyến di cư của chim biển.',
    iconName: 'Wind',
    tags: ['Điện gió biển', 'Net Zero', 'Năng lượng sạch'],
  },
  {
    id: 'res-aquaculture',
    name: 'Nuôi trồng thủy sản biển',
    category: 'aquaculture',
    title: 'Nuôi biển Công nghệ cao',
    shortDesc: {
      tieuhoc: 'Các lồng bè nuôi cá bớp, tôm hùm bồng bềnh trên mặt vịnh trong vắt.',
      thcs: 'Chuyển đổi từ đánh bắt tự nhiên sang nuôi trồng công nghệ cao bền vững.',
      thpt: 'Khai thác tiềm năng diện tích mặt nước đầm phá, vũng vịnh để nuôi hải sản giá trị cao theo chuẩn VietGAP.',
    },
    characteristics: [
      'Nhiều vũng vịnh kín gió, đầm phá ven biển (phá Tam Giang, vịnh Vân Phong, vịnh Cam Ranh).',
      'Độ mặn và nhiệt độ nước thích hợp quanh năm cho các loài hải sản quý.',
    ],
    role: [
      'Chủ động nguồn cung thực phẩm chất lượng cao, giảm áp lực đánh bắt hải sản tự nhiên.',
      'Tạo thu nhập cao cho ngư dân chuyển đổi nghề nghiệp.',
    ],
    howExtracted: [
      'Ứng dụng lồng nuôi bằng nhựa HDPE chịu sóng gió lớn xa bờ, thức ăn sinh học kiểm soát dịch bệnh.',
    ],
    vietnamExample:
      'Mô hình nuôi biển công nghiệp tại Quảng Ninh, Khánh Hòa (vịnh Vân Phong, Cam Ranh), Kiên Giang (quanh đảo Phú Quốc, Nam Du).',
    environmentalRisk:
      'Thức ăn dư thừa và kháng sinh gây hiện tượng phú dưỡng nước, ô nhiễm đáy biển nếu mật độ lồng nuôi quá dày.',
    iconName: 'Waves',
    tags: ['Nuôi biển', 'HDPE', 'Khánh Hòa'],
  },
];

export const cooperationList: CooperationItem[] = [
  {
    id: 'coop-fishery',
    title: 'Hợp tác nghề cá ở Vịnh Bắc Bộ (Việt Nam - Trung Quốc)',
    field: 'Khai thác và bảo tồn tài nguyên thủy sản',
    content: {
      tieuhoc:
        'Hai nước cùng ký thỏa thuận để ngư dân cùng đánh cá hòa bình, bảo vệ cá mẹ và cá con lớn lên.',
      thcs:
        'Ký ngày 25/12/2000 tại Bắc Kinh, thành lập vùng đánh cá chung để cùng khai thác và bảo tồn nguồn lợi thủy sản bền vững.',
      thpt:
        'Hiệp định hợp tác nghề cá ở Vịnh Bắc Bộ ký ngày 25-12-2000 tại Bắc Kinh. Thiết lập vùng đánh cá chung từ đường đóng cửa vịnh đến vĩ tuyến 20°B, dựa trên hai nguyên tắc cốt lõi: bảo tồn, quản lí nguồn lợi thủy sản và bình đẳng về năng lực tàu thuyền giữa hai bên.',
    },
    keyAgreements: [
      'Hiệp định hợp tác nghề cá ở Vịnh Bắc Bộ (ký ngày 25-12-2000 tại Bắc Kinh)',
      'Xác lập vùng đánh cá chung có giới hạn rõ ràng',
      'Phối hợp tuần tra kiểm tra liên hợp nghề cá trên biển',
    ],
    peacefulPrinciples: [
      'Nguyên tắc bảo tồn và quản lí các nguồn lợi thủy sản sinh vật',
      'Nguyên tắc bình đẳng về năng lực tàu thuyền',
      'Tạo cơ sở pháp lý vững chắc cho hoạt động hợp tác hòa bình giữa hai nước',
    ],
    impactOnEconomy:
      'Giúp ngư dân yên tâm bám biển, nâng cao hiệu quả khai thác, ổn định trật tự đánh bắt trên vịnh.',
    impactOnEnvironment:
      'Kiểm soát hạn chế đánh bắt vào mùa sinh sản, bảo vệ đàn cá phục hồi và chống cạn kiệt nguồn lợi.',
  },
  {
    id: 'coop-thailand-gulf',
    title: 'Hợp tác hòa bình trong Vịnh Thái Lan',
    field: 'Phân định và khai thác chung vùng chồng lấn',
    content: {
      tieuhoc:
        'Việt Nam cùng các nước bạn bè Thái Lan, Cam-pu-chia cùng thỏa thuận giữ gìn vùng biển chung thanh bình.',
      thcs:
        'Ký các hiệp định về vùng nước lịch sử (1982 với Cam-pu-chia) và Hiệp định phân định ranh giới biển năm 1997 với Thái Lan.',
      thpt:
        'Vùng Vịnh Thái Lan có tình hình phân định biển rất phức tạp. Việt Nam đã chủ động đàm phán: Ký Hiệp định về vùng nước lịch sử với Cam-pu-chia năm 1982; Ký Hiệp định về phân định ranh giới trên biển với Thái Lan ngày 9-8-1997, tạo hình mẫu giải quyết bất đồng bằng biện pháp hòa bình.',
    },
    keyAgreements: [
      'Hiệp định vùng nước lịch sử Việt Nam - Cam-pu-chia (1982)',
      'Hiệp định phân định ranh giới biển Việt Nam - Thái Lan (ngày 9-8-1997)',
      'Thỏa thuận khai thác chung thềm lục địa chồng lấn Việt Nam - Ma-lai-xi-a (1992)',
    ],
    peacefulPrinciples: [
      'Đàm phán hòa bình trên cơ sở tôn trọng luật pháp quốc tế',
      'Áp dụng nguyên tắc công bằng trong phân định ranh giới biển',
      'Duy trì tập quán đánh bắt truyền thống của ngư dân các bên',
    ],
    impactOnEconomy:
      'Mở ra cơ hội hợp tác dầu khí chung, tạo hành lang an toàn cho hoạt động du lịch và đánh bắt thủy sản.',
    impactOnEnvironment:
      'Phối hợp xử lý tràn dầu vịnh Thái Lan và bảo tồn rạn san hô vùng nước nông.',
  },
  {
    id: 'coop-unclos',
    title: 'Tôn trọng Luật pháp quốc tế & UNCLOS 1982',
    field: 'Khuôn khổ pháp lý và giải quyết hòa bình tranh chấp',
    content: {
      tieuhoc:
        'Các nước cùng tôn trọng luật chung của thế giới để biển luôn yên bình, không xảy ra xung đột.',
      thcs:
        'Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982) là “Hiến pháp của đại dương” định rõ quyền và trách nhiệm các quốc gia.',
      thpt:
        'UNCLOS 1982 xác lập chế định pháp lý toàn diện về các vùng biển: nội thủy, lãnh hải, tiếp giáp lãnh hải, vùng đặc quyền kinh tế (200 hải lý) và thềm lục địa. Các nước cam kết thực hiện Tuyên bố về ứng xử của các bên ở Biển Đông (DOC 2002) và thúc đẩy Bộ Quy tắc ứng xử (COC) thực chất, hiệu lực.',
    },
    keyAgreements: [
      'Công ước Liên Hợp Quốc về Luật Biển 1982 (UNCLOS 1982)',
      'Tuyên bố về ứng xử của các bên ở Biển Đông (DOC 2002 ký giữa ASEAN và Trung Quốc)',
      'Tiến trình đàm phán Bộ Quy tắc ứng xử ở Biển Đông (COC)',
    ],
    peacefulPrinciples: [
      'Giải quyết tranh chấp bằng các biện pháp hòa bình theo Điều 33 Hiến chương Liên Hợp Quốc',
      'Không đe dọa hoặc sử dụng vũ lực',
      'Tự kiềm chế, không có hành động làm phức tạp thêm tình hình',
    ],
    impactOnEconomy:
      'Tạo môi trường hòa bình, ổn định và an toàn cho dòng chảy thương mại toàn cầu qua Biển Đông.',
    impactOnEnvironment:
      'Quy định nghĩa vụ quốc tế về bảo vệ và giữ gìn môi trường biển (Phần XII của UNCLOS 1982).',
  },
  {
    id: 'coop-rescue-environment',
    title: 'Hợp tác cứu hộ hàng hải & Bảo vệ môi trường đại dương',
    field: 'An toàn sinh mạng & Ứng phó biến đổi khí hậu',
    content: {
      tieuhoc:
        'Khi gặp bão lớn, tàu bè các nước sẵn sàng cứu giúp nhau và cùng nhau dọn rác nhựa trên biển.',
      thcs:
        'Phối hợp cứu nạn tàu thuyền gặp nạn trong bão, chia sẻ dữ liệu khí tượng và chung tay chống ô nhiễm rác thải nhựa.',
      thpt:
        'Hợp tác đa phương thực hiện Công ước SAR 1979 về tìm kiếm cứu nạn hàng hải; thiết lập đường dây nóng hỗ trợ ngư dân gặp nạn; chương trình kiểm trắc hải văn, ứng phó sự cố tràn dầu xuyên biên giới và mạng lưới bảo tồn biển.',
    },
    keyAgreements: [
      'Công ước quốc tế về tìm kiếm và cứu nạn hàng hải (SAR 1979)',
      'Sáng kiến ASEAN về rác thải nhựa biển (Bangkok Declaration on Combating Marine Debris)',
      'Cơ chế giám sát môi trường biển khu vực Đông Á (PEMSEA)',
    ],
    peacefulPrinciples: [
      'Nhân đạo hàng hải: Cứu giúp người và tàu thuyền gặp nạn không phân biệt quốc tịch',
      'Chia sẻ minh bạch dữ liệu thời tiết, sóng gió và cảnh báo thiên tai sớm',
    ],
    impactOnEconomy:
      'Giảm thiểu tối đa thiệt hại tài sản và tàu bè do bão nhiệt đới; bảo vệ hạ tầng cảng biển.',
    impactOnEnvironment:
      'Bảo vệ hệ sinh thái rạn san hô, giảm ô nhiễm hạt vi nhựa, giữ gìn nguồn hải sản cho tương lai.',
  },
];

export const causeEffectModel = {
  title: 'Mô hình Phát triển Bền vững Biển Đông',
  steps: [
    {
      step: 1,
      name: 'Hợp tác hòa bình',
      desc: 'Tôn trọng UNCLOS 1982, ký kết các hiệp định phân định và hợp tác khai thác chung.',
      icon: 'Handshake',
      color: 'bg-amber-50 border-amber-300 text-amber-900',
    },
    {
      step: 2,
      name: 'Khai thác hợp lí',
      desc: 'Áp dụng quy chuẩn đánh bắt IUU, công nghệ sạch, hạn ngạch khai thác dầu khí và khoáng sản.',
      icon: 'SlidersHorizontal',
      color: 'bg-sky-50 border-sky-300 text-sky-900',
    },
    {
      step: 3,
      name: 'Phát triển kinh tế',
      desc: 'Tăng trưởng đồng bộ 4 ngành kinh tế biển: Thủy sản, Dầu khí, Vận tải cảng biển, Du lịch.',
      icon: 'TrendingUp',
      color: 'bg-indigo-50 border-indigo-300 text-indigo-900',
    },
    {
      step: 4,
      name: 'Bảo vệ môi trường',
      desc: 'Phục hồi rạn san hô, giảm rác thải nhựa, ứng phó tràn dầu và thích ứng biến đổi khí hậu.',
      icon: 'Leaf',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    },
    {
      step: 5,
      name: 'Phát triển bền vững',
      desc: 'Đảm bảo nguồn lợi cho thế hệ mai sau, biển hòa bình, thịnh vượng và an ninh sinh thái.',
      icon: 'ShieldCheck',
      color: 'bg-blue-50 border-blue-300 text-blue-900',
    },
  ],
};

export const vietnamAndEastSeaData = {
  totalSeaAreaKm2: '1.010.274 km²',
  coastlineLengthKm: 'Hơn 3.260 km',
  coastalProvinces: 28,
  archipelagos: [
    {
      name: 'Quần đảo Hoàng Sa',
      areaKm2: '30.680 km²',
      description: 'Huyện đảo thuộc thành phố Đà Nẵng, có vị trí tiền tiêu chiến lược ở phía Bắc Biển Đông.',
    },
    {
      name: 'Quần đảo Trường Sa',
      areaKm2: '250.800 km²',
      description: 'Huyện đảo thuộc tỉnh Khánh Hòa, án ngữ tuyến hàng hải quốc tế trung tâm Biển Đông.',
    },
  ],
  importantIslands: [
    { name: 'Đảo Phú Quốc', location: 'Tỉnh Kiên Giang (Vịnh Thái Lan)', role: 'Thành phố đảo du lịch sinh thái lớn nhất nước' },
    { name: 'Quần đảo Côn Đảo', location: 'Tỉnh Bà Rịa - Vũng Tàu', role: 'Khu bảo tồn biển và di tích lịch sử đặc biệt' },
    { name: 'Đảo Bạch Long Vĩ', location: 'Thành phố Hải Phòng (Vịnh Bắc Bộ)', role: 'Trung tâm hậu cần nghề cá và tìm kiếm cứu nạn vịnh Bắc Bộ' },
    { name: 'Đảo Cát Bà', location: 'Thành phố Hải Phòng', role: 'Khu dự trữ sinh quyển thế giới và di sản thiên nhiên' },
    { name: 'Đảo Lý Sơn', location: 'Tỉnh Quảng Ngãi', role: 'Quê hương của Hải đội Hoàng Sa kiêm quản Trường Sa xưa' },
    { name: 'Đảo Phú Quý', location: 'Tỉnh Bình Thuận', role: 'Trạm tiền tiêu kinh tế - quốc phòng Nam Trung Bộ' },
    { name: 'Bãi Tư Chính', location: 'Thềm lục địa phía Nam Việt Nam', role: 'Vùng thềm lục địa hoàn toàn thuộc quyền chủ quyền và quyền tài phán của Việt Nam' },
  ],
  fourKeySectors: [
    {
      title: 'Khai thác & Chế biến Dầu khí',
      icon: 'Flame',
      content: 'Trụ cột năng lượng quốc gia với các mỏ Bạch Hổ, Rồng, Đại Hùng, Lan Tây...',
    },
    {
      title: 'Kinh tế Hàng hải (Cảng & Vận tải)',
      icon: 'Ship',
      content: 'Hệ thống cảng nước sâu Hải Phòng, Cái Mép - Thị Vải đón được các siêu tàu mẹ lớn nhất thế giới.',
    },
    {
      title: 'Khai thác & Nuôi trồng Thủy sản',
      icon: 'Fish',
      content: 'Việt Nam nằm trong top 3 nước xuất khẩu thủy sản hàng đầu thế giới (tôm, cá tra, cá ngừ).',
    },
    {
      title: 'Du lịch & Dịch vụ Biển',
      icon: 'Palmtree',
      content: 'Đóng góp lớn vào GDP với các thương hiệu du lịch quốc tế: Hạ Long, Nha Trang, Đà Nẵng, Phú Quốc.',
    },
  ],
  studentActionScenarios: [
    {
      id: 'sc-1',
      question: 'Nếu là một học sinh đang sinh sống hoặc du lịch tại vùng ven biển, em có thể làm gì thiết thực để bảo vệ biển?',
      options: [
        'Tham gia dọn sạch rác bãi biển, tuyệt đối không xả rác và túi nilon xuống nước.',
        'Mua các sản vật làm từ san hô quý hiếm để làm kỷ niệm.',
        'Thả bóng bay hoặc đồ nhựa xuống biển để ước nguyện.',
      ],
      correctIndex: 0,
      explanation: 'Hành động nhặt rác, từ chối đồ nhựa dùng một lần và tuyên truyền cho người thân là việc làm thiết thực, vừa sức và ý nghĩa nhất của mỗi học sinh!',
    },
    {
      id: 'sc-2',
      question: 'Vì sao Việt Nam cần phát triển kinh tế biển theo hướng bền vững thay vì khai thác cạn kiệt?',
      options: [
        'Để biển phục hồi nguồn lợi sinh học, gìn giữ môi trường trong lành và bảo vệ sinh kế cho các thế hệ tương lai.',
        'Vì đánh bắt thủy sản không còn đem lại lợi nhuận kinh tế nữa.',
        'Vì các nước khác không cho phép khai thác biển.',
      ],
      correctIndex: 0,
      explanation: 'Phát triển kinh tế biển bền vững là nguyên tắc sống còn theo Nghị quyết số 36-NQ/TW về Chiến lược phát triển bền vững kinh tế biển Việt Nam đến năm 2030, tầm nhìn 2045.',
    },
    {
      id: 'sc-3',
      question: 'Hợp tác hòa bình trên biển mang lại lợi ích gì trực tiếp cho ngư dân Việt Nam?',
      options: [
        'Được hỗ trợ cứu hộ cứu nạn kịp thời khi gặp bão, có ngư trường ổn định và tuân thủ luật pháp quốc tế.',
        'Cho phép ngư dân đánh bắt ở bất kỳ đâu mà không cần tuân thủ quy định nào.',
        'Ngư dân không cần trang bị thiết bị an toàn và định vị trên tàu thuyền.',
      ],
      correctIndex: 0,
      explanation: 'Hợp tác hòa bình bảo đảm môi trường an toàn, thiết lập các hiệp định nghề cá rõ ràng, giúp ngư dân vững tâm vươn khơi bám biển dài ngày.',
    },
  ],
};

export const curriculumPillars: KnowledgePillar[] = [
  {
    id: 'location',
    title: '1. Vị trí địa lí & Vai trò của Biển Đông',
    subtitle: 'Không gian địa lí 3,44 triệu km², các eo biển chiến lược và 9 quốc gia ven biển',
    adaptedSummary: {
      tieuhoc:
        'Biển Đông là vùng biển rộng mênh mông, xanh ngát bao bọc phía Đông đất nước ta. Nơi đây có muôn vàn loài cá bơi lội và hai quần đảo Hoàng Sa, Trường Sa yêu dấu!',
      thcs:
        'Biển Đông là biển nửa kín lớn thứ 2 ở châu Á, nối thông hai đại dương lớn Thái Bình Dương và Ấn Độ Dương qua eo biển Ma-lắc-ca sầm uất.',
      thpt:
        'Biển Đông có diện tích khoảng 3,44 triệu km², trải rộng từ 3°B đến 26°B. Đây là tuyến hàng hải quốc tế huyết mạch thứ 2 thế giới, mang ý nghĩa địa chính trị - kinh tế sống còn.',
    },
    keyFacts: [
      'Diện tích: Khoảng 3,44 triệu km² (biển lớn thứ 4 thế giới)',
      'Tọa độ: Trải rộng từ khoảng 3°B đến 26°B, 100°Đ đến 121°Đ',
      'Vịnh biển lớn: Vịnh Bắc Bộ và Vịnh Thái Lan',
      'Eo biển huyết mạch: Ma-lắc-ca, Đài Loan, Lu-dông, Ga-xpa',
    ],
    sections: [
      {
        heading: 'Vị trí địa lý và phạm vi không gian',
        content:
          'Biển Đông là một biển nửa kín thuộc Thái Bình Dương, được bao bọc bởi lục địa châu Á ở phía tây và bắc, cùng chuỗi các đảo và quần đảo ở phía đông và nam. Biển Đông trải dài từ vùng xích đạo đến vùng cận nhiệt đới.',
        bulletPoints: [
          '9 quốc gia tiếp giáp Biển Đông: Việt Nam, Trung Quốc, Cam-pu-chia, Thái Lan, Ma-lai-xi-a, Xin-ga-po, In-đô-nê-xi-a, Bru-nây, Phi-líp-pin.',
          'Kết nối trực tiếp Ấn Độ Dương qua eo biển Ma-lắc-ca, eo biển Sunda.',
          'Kết nối Thái Bình Dương qua eo biển Đài Loan, eo biển Lu-dông và vùng biển Philippines.',
        ],
      },
      {
        heading: 'Ý nghĩa chiến lược đối với khu vực và thế giới',
        content:
          'Biển Đông là cửa ngõ giao thương hàng hải quốc tế trọng yếu bậc nhất toàn cầu. Hơn 50% khối lượng dầu mỏ vận chuyển bằng đường biển của thế giới đi qua Biển Đông.',
        bulletPoints: [
          'Tuyến đường hàng hải nhộn nhịp thứ hai thế giới chỉ sau Địa Trung Hải.',
          'Hầu hết các nền kinh tế lớn của Đông Á (Nhật Bản, Hàn Quốc, Trung Quốc) phụ thuộc vào tuyến vận tải qua Biển Đông.',
          'Điều hòa khí hậu nhiệt đới gió mùa ẩm cho toàn bộ các nước Đông Nam Á.',
        ],
      },
    ],
  },
  {
    id: 'resources',
    title: '2. Tài nguyên thiên nhiên Biển Đông',
    subtitle: 'Nguồn lợi sinh vật phong phú, tiềm năng khoáng sản, năng lượng và du lịch biển',
    adaptedSummary: {
      tieuhoc:
        'Biển Đông mang đến cho chúng ta nhiều loại cá tôm thơm ngon, những mỏ dầu dưới đáy biển sâu và những bãi biển tuyệt đẹp để tắm mát mùa hè.',
      thcs:
        'Biển Đông sở hữu 4 nhóm tài nguyên kinh tế then chốt: Thủy hải sản nhiệt đới, dầu khí khoáng sản thềm lục địa, luồng tàu biển quốc tế và du lịch nghỉ dưỡng.',
      thpt:
        'Hệ sinh thái biển đa dạng sinh học cao cung cấp 7-8% sản lượng cá thế giới; trữ lượng dầu khí hàng tỉ tấn tại các bồn trũng trầm tích; tiềm năng điện gió ngoài khơi vượt trội.',
    },
    keyFacts: [
      'Sinh vật: Hơn 100 loài cá kinh tế, chiếm 7 - 8% sản lượng cá khai thác thế giới',
      'Khoáng sản: Hàng tỉ tấn dầu thô, hàng trăm tỉ m³ khí tự nhiên, triển vọng băng cháy',
      'Kinh tế hàng hải: Nhiều vịnh nước sâu xây dựng cảng quốc tế trung chuyển',
      'Du lịch: Hàng trăm bãi tắm đẹp, nhiều di sản thiên nhiên thế giới (Vịnh Hạ Long, Cát Bà...)',
    ],
    sections: [
      {
        heading: 'Nguồn lợi sinh vật và hệ sinh thái biển',
        content:
          'Biển Đông nằm trong vùng nhiệt đới giàu nguồn lợi sinh vật, đặc trưng bởi năng suất sinh học cao và tính đa dạng loài phong phú.',
        bulletPoints: [
          'Hệ sinh thái rạn san hô, thảm cỏ biển và rừng ngập mặn tạo bãi đẻ tự nhiên cho các loài hải sản quý.',
          'Nguồn cung cấp an ninh lương thực - thực phẩm quan trọng cho hơn 600 triệu dân cư khu vực.',
          'Nhiều loài đặc sản có giá trị xuất khẩu cao: cá ngừ đại dương, cá thu, tôm hùm, hải sâm.',
        ],
      },
      {
        heading: 'Tài nguyên khoáng sản, năng lượng và hàng hải',
        content:
          'Thềm lục địa Biển Đông chứa các bồn trầm tích dày có tiềm năng dầu khí lớn. Vị trí địa lí thuận lợi tạo cơ hội vàng phát triển kinh tế cảng biển và điện gió ngoài khơi.',
        bulletPoints: [
          'Bồn trầm tích Cửu Long, Nam Côn Sơn, Sông Hồng, Mã Lai - Thổ Chu trữ lượng dầu khí lớn.',
          'Tốc độ gió trung bình 7-10 m/s thích hợp xây dựng các trang trại điện gió ngoài khơi.',
          'Các vịnh kín gió nước sâu như Vân Phong, Cam Ranh, Lạch Huyện xây dựng cảng đón tàu trên 100.000 tấn.',
        ],
      },
    ],
  },
  {
    id: 'cooperation',
    title: '3. Các lĩnh vực hợp tác ở Biển Đông',
    subtitle: 'Nghề cá, quản lí tài nguyên, an toàn hàng hải và khuôn khổ pháp lý quốc tế',
    adaptedSummary: {
      tieuhoc:
        'Các nước láng giềng cùng nhau nắm tay bảo vệ biển, cứu giúp tàu cá gặp nạn khi có bão và cùng nhau dọn rác để biển luôn sạch đẹp.',
      thcs:
        'Hợp tác hòa bình trên cơ sở Công ước Luật Biển UNCLOS 1982, ký kết các hiệp định phân định biên giới biển và thỏa thuận đánh cá chung.',
      thpt:
        'Hợp tác đa phương và song phương theo UNCLOS 1982: Hiệp định Vịnh Bắc Bộ 2000 (Việt Nam - Trung Quốc), Hiệp định Vịnh Thái Lan 1997 (Việt Nam - Thái Lan), thực thi DOC 2002 và hướng tới COC.',
    },
    keyFacts: [
      'UNCLOS 1982: Công ước của LHQ về Luật Biển - Hiến pháp của đại dương',
      'Hiệp định Vịnh Bắc Bộ (25/12/2000): Phân định lãnh hải, EEZ, thềm lục địa & nghề cá',
      'Hiệp định Vịnh Thái Lan (09/08/1997): Giải quyết vùng biển chồng lấn giữa Việt Nam - Thái Lan',
      'DOC 2002: Tuyên bố ứng xử của các bên ở Biển Đông giữa ASEAN và Trung Quốc',
    ],
    sections: [
      {
        heading: 'Hợp tác khai thác và bảo tồn nguồn lợi sinh vật biển',
        content:
          'Để giải quyết nguy cơ cạn kiệt hải sản, các nước Biển Đông đã triển khai nhiều cơ chế phối hợp nghề cá, nổi bật là Hiệp định hợp tác nghề cá ở Vịnh Bắc Bộ năm 2000 giữa Việt Nam và Trung Quốc.',
        bulletPoints: [
          'Nguyên tắc 1: Bảo tồn và quản lí bền vững các nguồn lợi thủy sản sinh vật.',
          'Nguyên tắc 2: Bình đẳng về năng lực tàu thuyền khai thác của hai bên.',
          'Thành lập vùng đánh cá chung có quy chế giám sát, tuần tra liên hợp định kỳ.',
        ],
      },
      {
        heading: 'Hợp tác tìm kiếm cứu nạn và bảo vệ môi trường biển',
        content:
          'Biển Đông thường xuyên hứng chịu nhiều cơn bão nhiệt đới dữ dội. Hợp tác nhân đạo cứu nạn tàu thuyền và ứng phó sự cố tràn dầu là cầu nối hòa bình giữa các quốc gia.',
        bulletPoints: [
          'Thực thi Công ước quốc tế về tìm kiếm và cứu nạn trên biển (SAR 1979).',
          'Chia sẻ dữ liệu trắc quan hải văn, dự báo sớm áp thấp và siêu bão.',
          'Thiết lập mạng lưới ứng phó sự cố tràn dầu xuyên biên giới trong ASEAN.',
        ],
      },
    ],
  },
  {
    id: 'cause-effect',
    title: '4. Mối quan hệ giữa Hợp tác, Kinh tế và Môi trường',
    subtitle: 'Sơ đồ nhân quả: Hợp tác hòa bình ➔ Khai thác hợp lí ➔ Phát triển kinh tế ➔ Bảo vệ môi trường ➔ Bền vững',
    adaptedSummary: {
      tieuhoc:
        'Muốn có nhiều cá và biển đẹp mãi mãi, các nước phải đoàn kết không cãi nhau, không xả rác và đánh bắt cá vừa phải để cá con kịp lớn.',
      thcs:
        'Hợp tác hòa bình tạo điều kiện để khai thác tài nguyên đúng cách; khai thác hợp lý giúp phát triển kinh tế bền vững và bảo vệ môi trường biển dài lâu.',
      thpt:
        'Mô hình phát triển bền vững Biển Đông: Hợp tác hòa bình trên cơ sở luật pháp quốc tế là điều kiện tiên quyết. Khai thác hợp lý là giải pháp kỹ thuật - kinh tế. Bảo vệ môi trường là điều kiện sinh tồn dài hạn.',
    },
    keyFacts: [
      'Nguyên tắc: Không thể phát triển kinh tế nếu môi trường biển bị hủy hoại',
      'Điều kiện tiên quyết: Môi trường hòa bình, an ninh và tôn trọng luật quốc tế',
      'Trọng tâm: Chống khai thác hải sản bất hợp pháp (IUU), xử lý rác nhựa & tràn dầu',
      'Đích đến: Kinh tế tuần hoàn biển và thịnh vượng chung cho toàn khu vực',
    ],
    sections: [
      {
        heading: 'Chuỗi quan hệ biện chứng trong quản trị biển',
        content:
          'Phát triển bền vững kinh tế biển không thể diễn ra trong tình trạng căng thẳng hay môi trường sinh thái suy thoái. Mọi quốc gia ven Biển Đông đều có trách nhiệm bảo vệ ngôi nhà chung đại dương.',
        bulletPoints: [
          'Nếu có xung đột, dòng tàu thuyền bị đình trệ, ngư dân không thể vươn khơi, các dự án cảng biển và năng lượng đình trệ.',
          'Nếu khai thác tận diệt (xung điện, thuốc nổ, lưới vét đáy), nguồn cá sẽ cạn kiệt chỉ sau vài năm, đẩy hàng triệu ngư dân vào nghèo đói.',
          'Nếu ô nhiễm dầu và hạt vi nhựa lan rộng, hệ sinh thái rạn san hô chết trắng, hủy diệt ngành du lịch biển.',
        ],
      },
      {
        heading: 'Chiến lược phát triển kinh tế biển xanh (Blue Economy)',
        content:
          'Chuyển đổi từ mô hình khai thác nâu (tiêu tốn tài nguyên, phát thải cao) sang mô hình kinh tế biển xanh thân thiện môi trường, tái tạo hệ sinh thái.',
        bulletPoints: [
          'Nhân rộng các khu bảo tồn biển (MPA) để làm vườn ươm sinh thái tự nhiên.',
          'Thúc đẩy kinh tế tuần hoàn, thu gom và tái chế 100% rác thải nhựa đại dương.',
          'Ứng dụng công nghệ năng lượng sạch: điện gió ngoài khơi, cảng biển xanh (Green Port).',
        ],
      },
    ],
  },
  {
    id: 'vietnam',
    title: '5. Việt Nam và Biển Đông – Chủ quyền & Trách nhiệm',
    subtitle: 'Diện tích biển trên 1 triệu km², Hoàng Sa – Trường Sa, 28 tỉnh ven biển và khát vọng quốc gia biển mạnh',
    adaptedSummary: {
      tieuhoc:
        'Việt Nam có bờ biển dài uốn lượn hình chữ S, có 28 tỉnh thành giáp biển. Quần đảo Hoàng Sa và Trường Sa mãi mãi thuộc về đất nước Việt Nam thân yêu!',
      thcs:
        'Việt Nam có vùng biển rộng trên 1 triệu km², sở hữu hai quần đảo Hoàng Sa và Trường Sa. Thế hệ trẻ có trách nhiệm học tập tốt và cùng gìn giữ biển đảo quê hương.',
      thpt:
        'Việt Nam có bờ biển dài trên 3.260 km, diện tích vùng biển thuộc chủ quyền và quyền tài phán là 1.010.274 km². Nghị quyết 36-NQ/TW xác định mục tiêu đưa Việt Nam trở thành quốc gia biển mạnh, phát triển bền vững 4 ngành kinh tế biển then chốt.',
    },
    keyFacts: [
      'Diện tích vùng biển Việt Nam: 1.010.274 km² (gấp hơn 3 lần diện tích đất liền)',
      'Chiều dài bờ biển: Hơn 3.260 km từ Móng Cái (Quảng Ninh) đến Hà Tiên (Kiên Giang)',
      'Tỉnh/thành ven biển: 28 trên tổng số 63 tỉnh/thành phố trực thuộc Trung ương',
      'Quần đảo chủ quyền: Hoàng Sa (Đà Nẵng: 30.680 km²) và Trường Sa (Khánh Hòa: 250.800 km²)',
    ],
    sections: [
      {
        heading: 'Không gian lãnh thổ biển và các vùng biển của Việt Nam',
        content:
          'Theo Công ước UNCLOS 1982 và Luật Biển Việt Nam 2012, các vùng biển của nước ta bao gồm nội thủy, lãnh hải (12 hải lý), vùng tiếp giáp lãnh hải (24 hải lý), vùng đặc quyền kinh tế (200 hải lý) và thềm lục địa.',
        bulletPoints: [
          'Chủ quyền thiêng liêng, bất khả xâm phạm đối với quần đảo Hoàng Sa và quần đảo Trường Sa.',
          'Hàng ngàn hòn đảo ven bờ và xa bờ: Phú Quốc, Côn Đảo, Cát Bà, Bạch Long Vĩ, Lý Sơn, Phú Quý...',
          'Bãi Tư Chính nằm hoàn toàn trên thềm lục địa phía nam thuộc quyền chủ quyền và tài phán của Việt Nam.',
        ],
      },
      {
        heading: 'Trách nhiệm công dân và hành động thiết thực của học sinh',
        content:
          'Học sinh FPT School và thế hệ trẻ cả nước là những chủ nhân tương lai kế thừa sứ mệnh bảo vệ chủ quyền và làm giàu từ biển bạc quê hương.',
        bulletPoints: [
          'Học tập và nắm vững kiến thức Địa lí, luật pháp biển quốc tế và lịch sử chủ quyền biển đảo.',
          'Tích cực tham gia các phong trào nhặt rác bờ biển, từ chối rác thải nhựa dùng một lần.',
          'Lan tỏa thông điệp yêu chuộng hòa bình, tôn trọng luật pháp quốc tế và tự hào biển đảo Việt Nam.',
        ],
      },
    ],
  },
];

