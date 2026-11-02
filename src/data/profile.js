// ==============================================================================
// ⚡ CYBER-STREET PROFILE DATA // THÔNG TIN CÁ NHÂN & SỞ THÍCH // PHUC.DEV
// ==============================================================================
// HƯỚNG DẪN: Mày chỉ cần mở file này ra, sửa các trường thông tin bên dưới
// theo sở thích và cá tính của mày. Web sẽ tự động cập nhật ngay lập tức!
// ==============================================================================

export const PROFILE_DATA = {
  // --- 1. THÔNG TIN CƠ BẢN (STREET IDENTITY) ---
  identity: {
    name: "Nguyễn Thanh Phúc",
    nickname: "Phúc",
    handle: "phucs12t34-dev",
    tagline: "Phucszz",
    location: "CanTho, Vietnam",
    school: "THPT FPT Hậu Giang (FSchool)",
    status: "Nobody can take me down",
    
    // SLOGAN ĐƯỜNG PHỐ BẤT HỦ:
    slogan: "i alway beleave in myself",
    sloganSub: "luôn tự tin vào bản thân dù mọi chuyện có tệ đi nữa",

    // ẢNH ĐẠI DIỆN:
    avatarUrl: "./avatar.png",
    avatarBadge: "ASHHH // LEVEL: C++",

    // Tuyên ngôn cá tính (Street Bio):
    bio: [
      "Một người theo đuổi bất cứ thứ gì nó thích kể cả khi 'imposible' và muốn có ny UwU'.",
      "Thích cái cảm giác lụm được cái giải nào đó và khoe với mọi người",
      "Ngoài đời thì năng động, nói nhiều, mỏ hơi hỗn, nhưng mà bên trong thì hơi mềm"
    ]
  },

  // --- 2. CÁ TÍNH & BẢN SẮC (ATTITUDE & STREET MANIFESTO) ---
  manifesto: [
    {
      code: "RULE_01",
      title: "T không thích mấy thằng hay cắt cuộc trò chuyện của t",
      desc: "thích 'ai hỏi?' thì về nói chuyện một mình đi 3 để yên t nói chuyện=)."
    },
    {
      code: "RULE_02",
      title: "T sẽ dừng lại nếu t thấy t gây phiền phức",
      desc: "ngta thấy phiền r thì m nói làm j nữa-))."
    },
    {
      code: "RULE_03",
      title: "Không gì là không thể nếu cố gắng",
      desc: "Vấn đề lớn thì cũng không sao, quantrong là m có dám đi đến hết chặn đường vs t hay ko thôi;))."
    },
    {
      code: "RULE_04",
      title: "Luôn thể hiện cá tính ",
      desc: "T rất là trẩu nên là lỡ có ghét hay gì thì cho t xin lỗi nhé ng ae."
    }
  ],

  // --- 3. SỞ THÍCH CÁ NHÂN & PHONG CÁCH SỐNG (HOBBIES & STREET CULTURE) ---
  hobbies: [
    {
      id: "Nghe nhạc",
      category: "ÂM NHẠC & VIBE",
      title: "Rap & ballab",
      icon: "Headphones",
      badge: "HEAVY BASS // 24/7",
      highlight: "chill chill khi code hoặc feelling khi suy",
      details: [
        "Thể loại ruột: Ballab, Trap, Lofi Hip-hop, Vietnamese Underground Rap",
        "Vibe ưa thích: Beat trầm, flow sắc bén, nhạc buồn buồn",
        "Thói quen: nghe rap khi tâm trạng vui và nghe Ballab khi thấy buồn"
      ],
      playlist: [
          { track: "Hustlang All Day", artist: "Robber" },
          { track: "Thủ đô Cypher", artist: "Rapital" },
          { track: "Ngựa Ô", artist: "Dangrangto và TeuYungBoy" }
      ]
    },
    {
      id: "cpp-dsa",
      category: "ĐAM MÊ CỐT LÕI",
      title: "C++ & Cấu Trúc Dữ Liệu Giải Thuật",
      icon: "Terminal",
      badge: "O(N LOG N) OBSESSED",
      highlight: "Cảm giác AC lúc 3h sáng sướng hơn bất kỳ thứ gì trên đời",
      details: [
        "Sân chơi cày cuốc: Codeforces, VNOJ, LeetCode, HackerRank",
        "Cấu trúc dữ liệu yêu thích: Segment Tree with Lazy Propagation, DSU (Disjoint Set Union), Fenwick Tree (BIT), Trie",
        "Kỹ thuật tủ: Fast I/O (cin.tie(NULL)), Bitwise manipulation, Binary Search trên miền kết quả",
        "Triết lý: Tránh tràn số nguyên (luôn cẩn thận 'int' vs 'long long'), không để dính TLE 10^8 ops/s"
      ]
    },
    {
      id: "streetwear",
      category: "PHONG CÁCH",
      title: "Streetwear & Sneaker Fit",
      icon: "Shirt",
      badge: "COMFY // OVERSIZED",
      highlight: "Hoodie đen form rộng + Sneaker thoải mái lướt phố",
      details: [
        "Outfit chuẩn bài: Hoodie thụng tối màu, quần jean đen, giày sneaker êm chân",
        "Gu thẩm mỹ: jean đen retro + hoodie",
        "Nguyên tắc: Đơn giản, thực dụng, thoải mái để ngồi code cả ngày hoặc ra ngoài hít khí trời"
      ]
    },
    {
      id: "nightowl",
      category: "LỐI SỐNG",
      title: "Cú Đêm & Thời Gian Làm Việc",
      icon: "Moon",
      badge: "00:00 - 04:00 AM",
      highlight: "Khi trời khuya là lúc mà dopamine của t bùng nổ",
      details: [
        "Vũ khí sinh tồn: 1 lon Sting dâu lạnh / Cà phê đen đậm đặc / 1 lon Pepsi 0 calo vị chanh ",
        "Setup không gian: Đèn bàn tối, màn hình IDE theme Dark Cyberpunk, bàn phím cơ gõ tanh tách",
        "Tâm trạng: luôn luôn feel crazy và không muốn dừng lại"
      ]
    },
    {
      id: "gaming",
      category: "GIẢI TRÍ",
      title: "Gaming & Xem Filmm",
      icon: "Gamepad2",
      badge: "FAST REFLEX",
      highlight: "Bắn vài trận game hoặc ra ngoài vận động để reset não",
      details: [
        "Game yêu thích: Valorant, Counter strike 2, Arena Breakout Infinities, League Of Legend",
        "Mục đích: Không cày nghiện, chỉ chơi để xã stress thôi",
        "Thể thao: Thích chạy xe dạo phố đêm lộng gió hoặc chơi bóng chuyền với mấy thk bạn"
      ]
    }
  ],

  // --- 4. C++ ARSENAL // KỸ NĂNG THUẬT TOÁN ĐƯỜNG PHỐ ---
  arsenal: [
    {
      name: "C++ Modern (C++17/C++20)",
      level: "VŨ KHÍ CHÍNH",
      tags: ["STL", "Pointers", "Memory", "Fast I/O"],
      stat: "100%",
      desc: "Nắm vững STL, iterator, con trỏ, tham chiếu và tư duy tối ưu hằng số."
    },
    {
      name: "Cấu Trúc Dữ Liệu Nâng Cao",
      level: "BÍ KÍP ĐOẠN",
      tags: ["Segment Tree", "Lazy Propagation", "DSU", "Fenwick Tree"],
      stat: "92%",
      desc: "Chuyên trị các bài toán truy vấn đoạn, cập nhật khoảng và cây rời rạc."
    },
    {
      name: "Thuật Toán Đồ Thị & Đường Đi",
      level: "BẢN ĐỒ ĐÔ THỊ",
      tags: ["Dijkstra", "BFS/DFS", "Kruskal", "Tarjan SCC"],
      stat: "85%",
      desc: "Tìm đường ngắn nhất, cây khung nhỏ nhất và phát hiện thành phần liên thông mạnh."
    },
    {
      name: "Quy Hoạch Động (Dynamic Programming)",
      level: "TƯ DUY TỐI ƯU",
      tags: ["Knapsack", "Tree DP", "Bitmask", "LCS/LIS"],
      stat: "88%",
      desc: "Chuyển trạng thái mượt mà, tối ưu không gian bộ nhớ từ 2D xuống 1D."
    }
  ],

  // --- 5. CÁC ĐỒ VẬT ĐƯỜNG PHỐ & TRÍCH DẪN VUI (STREET EASTER EGGS) ---
  streetQuotes: [
    "'So stress' — nhưng vẫn nộp code đến khi nào AC thì thôi.",
    "Bỏ qua mấy lời bàn tán, chỉ tin vào thực lực và sự nỗ lực của chính mình.",
    "cin.tie(NULL); ios_base::sync_with_stdio(false); — Vạch xuất phát của mọi cuộc đua tốc độ.",
    "Pointer không đáng sợ. Đáng sợ là không biết con trỏ của cuộc đời mình đang trỏ đi đâu.",
    "i alway beleave in myself — Khắc vào từng dòng code."
  ],

  // --- 6. LIÊN HỆ & MẠNG XÃ HỘI (CONNECT & SOCIAL LINKS) ---
  socials: {
    github: "https://github.com/phucs12t34-dev",
    codeforces: "https://codeforces.com/",
    facebook: "https://facebook.com/",
    discord: "https://discord.com/",
    email: "phucs12t34.dev@gmail.com"
  }
};
