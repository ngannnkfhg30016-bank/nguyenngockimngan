export interface GameTaskLocation {
  id: string;
  targetName: string;
  targetType: 'sea' | 'country' | 'island' | 'gulf' | 'strait' | 'port';
  instruction: string;
  hint: string;
  coordinates: { x: number; y: number }; // Percentage on SVG map
  toleranceRadius: number; // percentage
  fact: string;
}

export const locateGameTasks: GameTaskLocation[] = [
  {
    id: 'loc-1',
    targetName: 'Biển Đông',
    targetType: 'sea',
    instruction: 'Hãy nhấp vào vùng biển rộng lớn Biển Đông (nằm ở trung tâm)',
    hint: 'Biển Đông trải rộng giữa Việt Nam và Philippines, diện tích 3,44 triệu km²',
    coordinates: { x: 55, y: 50 },
    toleranceRadius: 18,
    fact: 'Biển Đông có diện tích khoảng 3,44 triệu km², là biển nửa kín lớn thứ 2 ở châu Á!',
  },
  {
    id: 'loc-2',
    targetName: 'Dải đất hình chữ S Việt Nam',
    targetType: 'country',
    instruction: 'Hãy nhấp vào vị trí đất nước Việt Nam thân yêu',
    hint: 'Nằm ở bờ tây của Biển Đông, có hình dáng chữ S uốn lượn ven biển',
    coordinates: { x: 34, y: 44 },
    toleranceRadius: 12,
    fact: 'Bờ biển Việt Nam dài hơn 3.260 km chạy dọc suốt chiều dài đất nước!',
  },
  {
    id: 'loc-3',
    targetName: 'Quần đảo Hoàng Sa',
    targetType: 'island',
    instruction: 'Hãy nhấp vào Quần đảo Hoàng Sa (thuộc chủ quyền Việt Nam)',
    hint: 'Nằm ở phía bắc Biển Đông, phía đông thành phố Đà Nẵng',
    coordinates: { x: 52, y: 35 },
    toleranceRadius: 10,
    fact: 'Quần đảo Hoàng Sa là huyện đảo thuộc TP Đà Nẵng, có diện tích vùng biển quản lý hơn 30.680 km².',
  },
  {
    id: 'loc-4',
    targetName: 'Quần đảo Trường Sa',
    targetType: 'island',
    instruction: 'Hãy nhấp vào Quần đảo Trường Sa (thuộc chủ quyền Việt Nam)',
    hint: 'Nằm ở phía nam và trung tâm Biển Đông, gồm nhiều đảo san hô chìm nổi',
    coordinates: { x: 62, y: 64 },
    toleranceRadius: 14,
    fact: 'Quần đảo Trường Sa là huyện đảo thuộc tỉnh Khánh Hòa, có diện tích vùng biển quản lý rộng trên 250.800 km².',
  },
  {
    id: 'loc-5',
    targetName: 'Vịnh Bắc Bộ',
    targetType: 'gulf',
    instruction: 'Hãy tìm và nhấp vào Vịnh Bắc Bộ',
    hint: 'Vịnh biển nằm ở phía bắc Việt Nam, kề cận đảo Hải Nam',
    coordinates: { x: 42, y: 22 },
    toleranceRadius: 10,
    fact: 'Việt Nam và Trung Quốc đã ký Hiệp định phân định Vịnh Bắc Bộ và Hiệp định nghề cá năm 2000 tại Bắc Kinh.',
  },
  {
    id: 'loc-6',
    targetName: 'Eo biển Ma-lắc-ca',
    targetType: 'strait',
    instruction: 'Hãy tìm Eo biển Ma-lắc-ca (nối Biển Đông với Ấn Độ Dương)',
    hint: 'Nằm ở góc tây nam, kẹp giữa bán đảo Malaysia và đảo Sumatra',
    coordinates: { x: 22, y: 88 },
    toleranceRadius: 11,
    fact: 'Eo biển Ma-lắc-ca là một trong những tuyến hàng hải quốc tế nhộn nhịp nhất hành tinh!',
  },
  {
    id: 'loc-7',
    targetName: 'Đảo Phú Quốc',
    targetType: 'island',
    instruction: 'Hãy xác định vị trí Đảo Phú Quốc (thành phố đảo lớn nhất Việt Nam)',
    hint: 'Nằm trong Vịnh Thái Lan, góc tây nam của Việt Nam',
    coordinates: { x: 30, y: 68 },
    toleranceRadius: 9,
    fact: 'Phú Quốc được mệnh danh là Đảo Ngọc với các rạn san hô đẹp và thương hiệu nước mắm truyền thống nức tiếng.',
  },
];

export interface ManagementScenario {
  id: string;
  topic: string;
  title: string;
  situation: string;
  options: {
    text: string;
    isSustainable: boolean;
    ecoScore: number;
    econScore: number;
    feedback: string;
  }[];
}

export const managementScenarios: ManagementScenario[] = [
  {
    id: 'man-1',
    topic: 'Khai thác hải sản quá mức',
    title: 'Bảo vệ nguồn lợi hải sản mùa sinh sản',
    situation:
      'Vào tháng 5 - tháng 7 hàng năm, các đàn cá mẹ bắt đầu vào các bãi cạn ven biển để đẻ trứng. Một số đội tàu muốn ra khơi đánh bắt vì gom được nhiều cá.',
    options: [
      {
        text: 'Thực thi lệnh cấm đánh bắt cá sinh sản tạm thời tại các bãi đẻ, hỗ trợ ngư dân tu sửa tàu bè và chuyển đổi sang nuôi biển hoặc du lịch.',
        isSustainable: true,
        ecoScore: 30,
        econScore: 20,
        feedback:
          'Chính xác! Tạm dừng khai thác mùa sinh sản giúp cá con lớn lên, phục hồi nguồn lợi sinh học gấp 5-10 lần cho mùa vụ sau.',
      },
      {
        text: 'Cho phép dùng lưới cào đáy quét sạch cả cá con lẫn cá mẹ để tối đa hóa doanh thu trước mắt.',
        isSustainable: false,
        ecoScore: -35,
        econScore: 10,
        feedback:
          'Nguy hiểm! Lưới cào đáy phá hủy thảm thực vật đáy biển và tận diệt cá non, dẫn đến kiệt quệ nguồn cá trong tương lai.',
      },
    ],
  },
  {
    id: 'man-2',
    topic: 'Xả rác và nước thải biển',
    title: 'Xử lý rác thải nhựa tại các điểm du lịch đảo',
    situation:
      'Lượng khách du lịch mùa hè tăng đột biến khiến các bãi biển tràn ngập chai nhựa và túi nilon trôi dạt ra rạn san hô.',
    options: [
      {
        text: 'Phát động chương trình "Đảo ngọc không rác nhựa", yêu cầu khách đổi chai nhựa lấy bình nước tái sử dụng, đặt trạm thu gom rác hiện đại.',
        isSustainable: true,
        ecoScore: 35,
        econScore: 25,
        feedback:
          'Tuyệt vời! Giải pháp này vừa giữ gìn làn nước trong xanh thu hút du khách cao cấp, vừa bảo vệ loài rùa biển và san hô quý.',
      },
      {
        text: 'Đẩy rác xuống biển sâu cho sóng cuốn đi nơi khác để khỏi tốn chi phí thu gom.',
        isSustainable: false,
        ecoScore: -40,
        econScore: -15,
        feedback:
          'Hành vi vi phạm pháp luật! Rác thải nhựa trôi nổi sẽ phân rã thành vi nhựa, đầu độc chuỗi thức ăn thủy sản và giết chết sinh vật biển.',
      },
    ],
  },
  {
    id: 'man-3',
    topic: 'Quy hoạch cảng biển & Vận tải',
    title: 'Xây dựng cảng xanh (Green Port) thông minh',
    situation:
      'Một thành phố ven biển chuẩn bị đầu tư mở rộng cảng nước sâu đón tàu container thế hệ mới.',
    options: [
      {
        text: 'Đầu tư hệ thống điện bờ cấp cho tàu tắt máy phụ khi cập cảng, số hóa thủ tục logistics và xử lý 100% nước thải bùn đáy.',
        isSustainable: true,
        ecoScore: 30,
        econScore: 35,
        feedback:
          'Rất xuất sắc! Mô hình Cảng Xanh giúp giảm phát thải khí nhà kính và đạt chuẩn quốc tế để đón các liên minh hàng hải hàng đầu.',
      },
      {
        text: 'Nạo vét luồng lạch ồ ạt và đổ bùn thải thẳng vào khu bảo tồn rạn san hô gần cảng để giảm chi phí vận chuyển bùn.',
        isSustainable: false,
        ecoScore: -45,
        econScore: 5,
        feedback:
          'Hủy hoại sinh thái! Bùn thải làm đục nước biển, che lấp ánh sáng mặt trời khiến toàn bộ rạn san hô bị ngạt và chết trắng.',
      },
    ],
  },
  {
    id: 'man-4',
    topic: 'Năng lượng biển bền vững',
    title: 'Phát triển trang trại điện gió ngoài khơi',
    situation:
      'Khu vực biển Nam Trung Bộ có sức gió mạnh dồi dào, cần quy hoạch lắp đặt tuabin điện gió ngoài khơi.',
    options: [
      {
        text: 'Khảo sát kỹ đường đi của chim biển, ngư trường đánh bắt và dòng hải lưu để lắp đặt cánh quạt gió hài hòa với hoạt động đánh bắt của ngư dân.',
        isSustainable: true,
        ecoScore: 40,
        econScore: 30,
        feedback:
          'Rất đúng đắn! Chuyển dịch năng lượng tái tạo gắn liền với an sinh của ngư dân và bảo tồn sinh cảnh chim biển.',
      },
      {
        text: 'Đốt than đá ven biển thay vì làm điện gió vì than đá rẻ và nhanh hơn.',
        isSustainable: false,
        ecoScore: -35,
        econScore: -10,
        feedback:
          'Lựa chọn lạc hậu! Nhà máy nhiệt điện than phát thải lượng lớn khí CO2 và tro xỉ gây ô nhiễm không khí và biển ven bờ.',
      },
    ],
  },
];

export interface DiplomacyScenario {
  id: string;
  title: string;
  background: string;
  options: {
    text: string;
    isPeaceful: boolean;
    explanation: string;
  }[];
}

export const diplomacyScenarios: DiplomacyScenario[] = [
  {
    id: 'dip-1',
    title: 'Tàu cá nước bạn gặp bão nguy hiểm trong vùng biển',
    background:
      'Cơn bão nhiệt đới số 4 đổ bộ bất ngờ với sức gió cấp 12, một tàu cá của nước láng giềng bị hỏng máy trôi dạt và phát tín hiệu cấp cứu SOS.',
    options: [
      {
        text: 'Lập tức điều động lực lượng Cảnh sát biển & Trung tâm cứu nạn hàng hải ra ứng cứu, đưa thuyền viên vào nơi tránh bão an toàn, chăm sóc y tế chu đáo.',
        isPeaceful: true,
        explanation:
          'Hành động nhân đạo cao đẹp phù hợp với Công ước SAR 1979 và tinh thần láng giềng hữu nghị trên Biển Đông!',
      },
      {
        text: 'Làm ngơ không cứu vì không phải tàu thuyền nước mình.',
        isPeaceful: false,
        explanation:
          'Vi phạm đạo lý nhân đạo hàng hải và vi phạm nghĩa vụ cứu người gặp nạn trên biển quy định trong UNCLOS 1982.',
      },
    ],
  },
  {
    id: 'dip-2',
    title: 'Vùng biển có tranh chấp chưa được phân định ranh giới',
    background:
      'Hai quốc gia lân cận có vùng biển chồng lấn thềm lục địa, chưa đạt được hiệp định phân định cuối cùng.',
    options: [
      {
        text: 'Hai bên kiềm chế, ngồi vào bàn đàm phán hòa bình trên cơ sở UNCLOS 1982, tạm thời ký thỏa thuận hợp tác khai thác chung hoặc nghiên cứu khoa học.',
        isPeaceful: true,
        explanation:
          'Đây là bài học thành công thực tế giữa Việt Nam và Thái Lan (1997), Việt Nam và Malaysia (1992) trong hợp tác khai thác chung hòa bình!',
      },
      {
        text: 'Đơn phương điều tàu chiến xua đuổi và xây dựng công trình trái phép.',
        isPeaceful: false,
        explanation:
          'Hành động làm phức tạp thêm tình hình, vi phạm Tuyên bố DOC và đi ngược lại Hiến chương Liên Hợp Quốc.',
      },
    ],
  },
  {
    id: 'dip-3',
    title: 'Sự cố tràn dầu xuyên biên giới trên Biển Đông',
    background:
      'Một tàu chở dầu nước ngoài bị rò rỉ trên luồng quốc tế, vệt dầu loang rộng có nguy cơ trôi dạt vào bờ biển nhiều nước.',
    options: [
      {
        text: 'Kích hoạt cơ chế ứng phó khẩn cấp chung ASEAN, chia sẻ ảnh vệ tinh và phối hợp phao quây dầu dập tắt nguy cơ.',
        isPeaceful: true,
        explanation:
          'Ô nhiễm đại dương không có biên giới. Hợp tác đa phương là con đường duy nhất để bảo vệ hệ sinh thái Biển Đông!',
      },
      {
        text: 'Chối bỏ trách nhiệm và đổ lỗi qua lại trong khi dầu tiếp tục loang ra.',
        isPeaceful: false,
        explanation:
          'Sự chậm trễ sẽ biến sự cố thành thảm họa hủy diệt các rạn san hô và toàn bộ ngành du lịch biển của các nước.',
      },
    ],
  },
];

export interface OceanProblem {
  id: string;
  name: string;
  icon: string;
  level: number;
  description: string;
  solved: boolean;
  actionName: string;
}

export const initialOceanProblems: OceanProblem[] = [
  {
    id: 'prob-1',
    name: 'Rác thải nhựa trôi dạt',
    icon: 'Trash2',
    level: 1,
    description: 'Túi nilon và chai nhựa bao vây rạn san hô khiến rùa biển bị mắc kẹt.',
    solved: false,
    actionName: 'Thu gom & Tái chế nhựa',
  },
  {
    id: 'prob-2',
    name: 'Vết dầu loang ven bờ',
    icon: 'Droplets',
    level: 2,
    description: 'Váng dầu từ tàu cá làm ngạt thở các loài cá tôm non ven bờ.',
    solved: false,
    actionName: 'Thả phao quây & Bơm hút dầu',
  },
  {
    id: 'prob-3',
    name: 'Rạn san hô bị tẩy trắng',
    icon: 'Sun',
    level: 3,
    description: 'Nước biển ấm lên và ô nhiễm khiến các rạn san hô rực rỡ mất màu.',
    solved: false,
    actionName: 'Trồng phục hồi san hô con',
  },
  {
    id: 'prob-4',
    name: 'Đánh bắt cá tận diệt bằng kích điện',
    icon: 'ZapOff',
    level: 4,
    description: 'Hành vi dùng xung điện huỷ hoại mầm sống đáy biển.',
    solved: false,
    actionName: 'Tuyên truyền & Tuần tra bảo vệ',
  },
  {
    id: 'prob-5',
    name: 'Rừng ngập mặn bị xâm hại',
    icon: 'Trees',
    level: 5,
    description: 'Cây đước, mắm ven biển che chắn sóng bão bị suy giảm.',
    solved: false,
    actionName: 'Trồng rừng ngập mặn chắn sóng',
  },
];

export interface LocatePoint {
  id: string;
  name: string;
  category: 'island' | 'gulf' | 'strait';
  coords: { lat: number; lng: number };
  hint: string;
}

export const locatePoints: LocatePoint[] = [
  {
    id: 'pt-hoangsa',
    name: 'Quần đảo Hoàng Sa (Đà Nẵng)',
    category: 'island',
    coords: { lat: 16.5, lng: 112.0 },
    hint: 'Quần đảo tiền tiêu phía Bắc Biển Đông, huyện đảo trực thuộc TP Đà Nẵng.',
  },
  {
    id: 'pt-truongsa',
    name: 'Quần đảo Trường Sa (Khánh Hòa)',
    category: 'island',
    coords: { lat: 8.8, lng: 114.2 },
    hint: 'Quần đảo án ngữ tuyến hàng hải trung tâm Biển Đông, huyện đảo thuộc tỉnh Khánh Hòa.',
  },
  {
    id: 'pt-malacca',
    name: 'Eo biển Ma-lắc-ca',
    category: 'strait',
    coords: { lat: 2.5, lng: 101.5 },
    hint: 'Tuyến hàng hải nối Biển Đông với Ấn Độ Dương, kẹp giữa bán đảo Malaysia và đảo Sumatra.',
  },
  {
    id: 'pt-vinhbacbo',
    name: 'Vịnh Bắc Bộ',
    category: 'gulf',
    coords: { lat: 20.0, lng: 107.5 },
    hint: 'Vịnh biển nửa kín phía Bắc Việt Nam, được phân định bằng Hiệp định năm 2000.',
  },
  {
    id: 'pt-vinhthailan',
    name: 'Vịnh Thái Lan',
    category: 'gulf',
    coords: { lat: 9.5, lng: 101.5 },
    hint: 'Vịnh biển nông phía Tây Nam Việt Nam, tiếp giáp đảo Phú Quốc.',
  },
  {
    id: 'pt-dailoan',
    name: 'Eo biển Đài Loan',
    category: 'strait',
    coords: { lat: 24.0, lng: 119.5 },
    hint: 'Eo biển nối Biển Đông với biển Hoa Đông và các tuyến hàng hải đi Nhật Bản.',
  },
];

export interface ResourceClassificationItem {
  id: string;
  name: string;
  category: 'fishery' | 'mineral' | 'tourism' | 'maritime';
  desc: string;
}

export const resourceItems: ResourceClassificationItem[] = [
  {
    id: 'res-fish',
    name: 'Cá ngừ đại dương & Tôm hùm',
    category: 'fishery',
    desc: 'Hải sản nhiệt đới giá trị dinh dưỡng và xuất khẩu cao hàng tỉ USD.',
  },
  {
    id: 'res-oil',
    name: 'Dầu mỏ mỏ Bạch Hổ',
    category: 'mineral',
    desc: 'Nguồn năng lượng chiến lược khai thác từ thềm lục địa trầm tích Cửu Long.',
  },
  {
    id: 'res-port',
    name: 'Cảng nước sâu Cái Mép - Thị Vải',
    category: 'maritime',
    desc: 'Cụm cảng biển quốc tế đón được siêu tàu container trọng tải trên 200.000 tấn.',
  },
  {
    id: 'res-halong',
    name: 'Vịnh Hạ Long & Bãi biển Mỹ Khê',
    category: 'tourism',
    desc: 'Kỳ quan thiên nhiên thế giới thu hút hàng triệu du khách trong và ngoài nước.',
  },
  {
    id: 'res-gas',
    name: 'Khí tự nhiên mỏ Lan Tây - Lan Đỏ',
    category: 'mineral',
    desc: 'Được dẫn bằng đường ống ngầm cấp cho cụm khí - điện - đạm Phú Mỹ.',
  },
  {
    id: 'res-shipping',
    name: 'Luồng tàu biển quốc tế Bắc - Nam',
    category: 'maritime',
    desc: 'Tuyến vận tải biển chở hơn 50% khối lượng dầu mỏ thương mại toàn cầu.',
  },
];

export interface TreatyCard {
  id: string;
  year: string;
  countries: string;
  name: string;
  significance: string;
}

export const treatyCards: TreatyCard[] = [
  {
    id: 'tc-vbb-2000',
    year: '2000 (25-12-2000)',
    countries: 'Việt Nam – Trung Quốc',
    name: 'Hiệp định Phân định Vịnh Bắc Bộ & Hiệp định Nghề cá',
    significance:
      'Xác định ranh giới lãnh hải, vùng đặc quyền kinh tế và thềm lục địa theo nguyên tắc công bằng; thiết lập vùng đánh cá chung quản lý bền vững nguồn lợi.',
  },
  {
    id: 'tc-vtl-1997',
    year: '1997 (09-08-1997)',
    countries: 'Việt Nam – Thái Lan',
    name: 'Hiệp định Phân định Ranh giới trên biển Vịnh Thái Lan',
    significance:
      'Hiệp định phân định biển đầu tiên của Việt Nam với nước láng giềng trong khu vực ASEAN sau khi gia nhập UNCLOS 1982.',
  },
  {
    id: 'tc-vnl-1982',
    year: '1982 (07-07-1982)',
    countries: 'Việt Nam – Cam-pu-chia',
    name: 'Hiệp định về Vùng nước lịch sử',
    significance:
      'Thỏa thuận cùng khai thác và bảo đảm trật tự an ninh trên vùng nước lịch sử chung giữa hai nước trong Vịnh Thái Lan.',
  },
  {
    id: 'tc-unclos-1982',
    year: '1982',
    countries: 'Đại hội đồng Liên Hợp Quốc',
    name: 'Công ước Liên Hợp Quốc về Luật Biển (UNCLOS 1982)',
    significance:
      'Được mệnh danh là “Hiến pháp của Đại dương”, quy định quy chế pháp lý về lãnh hải 12 hải lý, EEZ 200 hải lý và thềm lục địa.',
  },
];

export interface OceanProblemGameItem {
  id: string;
  issue: string;
  region: string;
  impact: string;
  solution: string;
}

export const oceanProblems: OceanProblemGameItem[] = [
  {
    id: 'op-iuu',
    issue: 'Đánh bắt cá tận diệt bằng thuốc nổ và kích điện',
    region: 'Vùng bãi rạn ven bờ',
    impact: 'Hủy diệt vĩnh viễn hệ sinh thái rạn san hô, làm chết cả ấu trùng và cá non.',
    solution:
      'Thực thi pháp luật nghiêm minh, cấm hoàn toàn thuốc nổ/xung điện và hỗ trợ ngư dân chuyển đổi nghề nuôi biển bền vững.',
  },
  {
    id: 'op-plastic',
    issue: 'Rác thải nhựa và ngư cụ ma (ngư cụ bỏ hoang)',
    region: 'Toàn bộ vùng biển mở và ven đảo',
    impact: 'Rùa biển và chim biển bị nghẹt thở, phân rã thành vi nhựa tích tụ trong cá tôm.',
    solution:
      'Cắt giảm rác nhựa dùng một lần, xây dựng mô hình Đảo không rác nhựa và phát động phong trào làm sạch bờ biển.',
  },
  {
    id: 'op-oilspill',
    issue: 'Sự cố rò rỉ và tràn dầu tàu chở hàng',
    region: 'Luồng hàng hải quốc tế & cảng biển',
    impact: 'Váng dầu ngăn chặn ánh sáng mặt trời, làm ngạt thở các loài thủy sinh và nhiễm độc bùn cát.',
    solution:
      'Triển khai phao quây dầu chuyên dụng, máy hút gom dầu và sử dụng chế phẩm vi sinh phân hủy sinh học an toàn.',
  },
];

