/**
 * PORTFOLIO CENTRAL CONFIGURATION
 * 
 * Tất cả thông tin cá nhân được quản lý tập trung tại file này.
 * Hãy thay thế các giá trị mẫu [ADD YOUR ...] bằng thông tin thực tế của bạn.
 * KHÔNG cần sửa code UI khi cập nhật nội dung cơ bản.
 */

export const PORTFOLIO_DATA = {
  // --- THÔNG TIN CÁ NHÂN ---
  personal: {
    name: "[ADD YOUR NAME]", // Ví dụ: Nguyễn Văn A
    initials: "DEV",        // 2-3 ký tự monogram
    role: "Student Developer & Algorithmic Thinker",
    statusBadge: "ASPIRING SOFTWARE ENGINEER",
    location: "Vietnam",
    tagline: "Building ideas into meaningful digital experiences.",
    shortBio: "Học sinh / Lập trình viên đam mê giải thuật C++, hệ thống nhúng thông minh, mô phỏng Web3D và phát triển phần mềm chuẩn mực.",
    longBio: "Tôi là một người học tập và phát triển phần mềm với định hướng chuyên sâu vào cấu trúc dữ liệu, giải thuật tối ưu (DSA C++ / Competitive Programming), các mô hình thị giác máy tính và ứng dụng IoT/Robotics thực tế. Mục tiêu của tôi là xây dựng những sản phẩm công nghệ có chiều sâu kỹ thuật, giải quyết bài toán thực tế và chuẩn bị nền tảng học thuật vững chắc cho các cơ hội nghiên cứu và phát triển trong tương lai.",
    avatarUrl: "", // Để trống sẽ tự động hiển thị monogram hình học công nghệ cao
    cvAvailable: false, // Chuyển thành true khi đã upload file CV
    cvUrl: "",
    socialLinks: {
      github: "https://github.com/", // Điền username GitHub
      linkedin: "https://linkedin.com/in/", // Điền username LinkedIn
      email: "developer@example.com", // Điền email liên hệ
      codeforces: "https://codeforces.com/profile/", // Điền profile CP nếu có
    }
  },

  // --- FACTS LIST ---
  facts: [
    { label: "Mục tiêu hiện tại", value: "Cấu trúc dữ liệu & Giải thuật nâng cao (C++ DSA)" },
    { label: "Lĩnh vực quan tâm", value: "Competitive Programming, AI/Computer Vision, Robotics & IoT" },
    { label: "Ngôn ngữ trọng tâm", value: "C++ (C++17/20), Python, JavaScript / Three.js" },
    { label: "Trạng thái", value: "Đang mở cơ hội giao lưu học thuật & Dự án công nghệ" },
  ],

  // --- TRIẾT LÝ PHÁT TRIỂN ---
  philosophy: {
    quote: "Không chỉ dừng lại ở việc làm cho code chạy được; mà phải thấu hiểu bản chất độ phức tạp thời gian O(N), tối ưu tài nguyên bộ nhớ và thiết kế hệ thống có khả năng mở rộng bền bỉ.",
    author: "Core Engineering Principle"
  },

  // --- DỮ LIỆU TERMINAL HERO ---
  heroTerminal: {
    commandLines: [
      { cmd: "whoami", output: "student_developer && algorithm_learner" },
      { cmd: "core_stack", output: "['C++', 'Python', 'Three.js / WebGL', 'ESP32 / Embedded']" },
      { cmd: "focus_areas", output: "['Competitive Programming', 'Robotics Simulation', 'Computer Vision']" },
      { cmd: "current_status", output: "Optimizing solutions & writing ultra-detailed engineering logs..." },
    ]
  },

  // --- KỸ NĂNG & CÔNG NGHỆ ---
  // Không dùng % ảo. Thay vào đó dùng nhãn mức độ thực tế: "Đang học", "Nền tảng tốt", "Thành thạo", "Thực chiến"
  skills: [
    {
      category: "Cấu trúc dữ liệu & Giải thuật (DSA)",
      items: [
        { name: "C++ Modern (C++17/20)", level: "Trọng tâm", note: "STL, pointers, templates, memory management" },
        { name: "Cấu trúc dữ liệu nền tảng", level: "Vững chắc", note: "Array, Linked List, Stack, Queue, BST, Heap, Trie" },
        { name: "Giải thuật nâng cao (CP)", level: "Đang luyện tập", note: "Segment Tree, Fenwick (BIT), DSU, Dijkstra, DP" },
        { name: "Phân tích độ phức tạp", level: "Thực hành", note: "Time/Space Complexity, tránh TLE/MLE, Fast I/O" },
      ]
    },
    {
      category: "Khoa học Dữ liệu & AI / Computer Vision",
      items: [
        { name: "Python", level: "Thành thạo", note: "Data processing, script automation, algorithmic testing" },
        { name: "Computer Vision / YOLO", level: "Nghiên cứu ứng dụng", note: "Object detection, video frame processing" },
        { name: "Mô phỏng & Thử nghiệm", level: "Thực hành", note: "Virtual lab, algorithm visualization" },
      ]
    },
    {
      category: "Robotics & Hệ thống nhúng (Embedded/IoT)",
      items: [
        { name: "ESP32 & Vi điều khiển", level: "Thực hành", note: "GPIO, PWM, I2C, UART, Motor control" },
        { name: "JetBot / Robot Di động", level: "Dự án nghiên cứu", note: "Differential drive, cảm biến khoảng cách / LiDAR" },
        { name: "Hardware Integration", level: "Nền tảng", note: "Thiết kế mạch cơ bản, sơ đồ chân nối" },
      ]
    },
    {
      category: "Web & Đồ họa Tương tác (Web3D)",
      items: [
        { name: "Three.js & WebGL", level: "Ứng dụng", note: "3D scene graph, camera rigs, shader, particles" },
        { name: "JavaScript (ES6+) / React", level: "Thực chiến", note: "Component modularity, state hooks, responsive UI" },
        { name: "Tailwind CSS & Canvas", level: "Thành thạo", note: "Dark aesthetic, responsive bento layout" },
        { name: "Blender 3D", level: "Low-Poly & Assets", note: "Dựng hình kỹ thuật, tối ưu lưới cho Web3D" },
      ]
    },
    {
      category: "Công cụ & Quy trình Kỹ thuật",
      items: [
        { name: "Git & GitHub", level: "Chuẩn mực", note: "Version control, commit history, issue tracking" },
        { name: "VS Code & Linux CLI", level: "Môi trường chính", note: "C++ debugging, shell scripting" },
        { name: "Kỹ thuật ghi chép Journal", level: "Chuyên sâu", note: "ADR, bug triage, test case validation" },
      ]
    }
  ],

  // --- ĐANG HỌC TẬP (CURRENTLY LEARNING) ---
  currentlyLearning: [
    {
      topic: "Segment Tree & Lazy Propagation",
      status: "Practicing", // Exploring, Learning, Practicing, Building
      description: "Luyện tập truy vấn đoạn và cập nhật khoảng trong thi đấu lập trình ACM/ICPC.",
      focus: "Competitive Programming"
    },
    {
      topic: "Three.js Performance Optimization",
      status: "Building",
      description: "Áp dụng instanced mesh, on-demand render loop và camera rigs theo web3d-integration-patterns.",
      focus: "Creative Web3D"
    },
    {
      topic: "Kinematics cho Robot Di Động",
      status: "Exploring",
      description: "Mô hình toán học chuyển động bánh vi sai cho robot JetBot và xử lý tín hiệu cảm biến.",
      focus: "Robotics Simulation"
    },
    {
      topic: "Dynamic Programming Nâng Cao",
      status: "Learning",
      description: "Quy hoạch động trên cây (Tree DP) và quy hoạch động trạng thái bitmask.",
      focus: "Algorithms"
    }
  ],

  // --- HỌC VẤN (EDUCATION) ---
  education: [
    {
      institution: "[ADD INSTITUTION / TRƯỜNG ĐANG HỌC]",
      program: "[CHUYÊN NGÀNH HOẶC KHỐI LỚP - VD: THPT Chuyên / Ngành CNTT]",
      period: "2024 - Hiện tại",
      highlights: [
        "Trọng tâm học tập: Toán học, Tin học chuyên sâu, Vật lý ứng dụng",
        "Tự nghiên cứu: Cấu trúc dữ liệu & Thuật toán C++, Hệ thống IoT",
        "Hoạt động: Tham gia các dự án nghiên cứu khoa học kỹ thuật (STEM)"
      ]
    }
  ],

  // --- THÀNH TÍCH & GIẢI THƯỞNG (ACHIEVEMENTS) ---
  achievements: [
    {
      title: "[ADD TITLE - VD: Giải Tin học Trẻ / Học sinh Giỏi / Cuộc thi STEM]",
      organization: "[ADD TỔ CHỨC CẤP GIẢI / TRƯỜNG / SỞ GD]",
      date: "[ADD NĂM/THÁNG]",
      description: "Thành tích nghiên cứu hoặc thi đấu lập trình giải thuật. (Có thể cập nhật thêm khi có kết quả chính thức).",
      credentialUrl: ""
    }
  ],
  // Placeholder văn phong tinh tế nếu chưa có thành tích công khai
  achievementsPlaceholder: "Mỗi dòng code viết ra, mỗi bài toán tối ưu thành công là một cột mốc kỹ thuật vững chắc. Danh mục thành tích đang tiếp tục được cập nhật theo lộ trình thi đấu.",

  // --- CHỨNG CHỈ (CERTIFICATIONS) ---
  certifications: [
    {
      name: "Python Master Certificate",
      issuer: "Technical Training Program",
      date: "2026",
      credentialId: "PY-MST-2026",
      verificationUrl: "",
      note: "Chứng nhận năng lực lập trình Python chuyên sâu, xử lý dữ liệu và thuật toán."
    },
    {
      name: "[ADD CERTIFICATE NAME - VD: CS50x / HackerRank Problem Solving]",
      issuer: "[ADD ISSUING ORG]",
      date: "[ADD DATE]",
      credentialId: "[ADD ID]",
      verificationUrl: "",
      note: "Chứng chỉ bổ sung đang trong quá trình hoàn thiện."
    }
  ]
};
