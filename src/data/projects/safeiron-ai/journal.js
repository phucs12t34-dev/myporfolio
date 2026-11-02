export const safeIronJournal = [
  {
    session: "01",
    date: "[DATE TO BE ADDED]",
    status: "Completed",
    title: "Khảo sát bài toán & Xác lập kiến trúc giải pháp SafeIron AI",
    objectives: "Phân tích nguyên nhân hỏa hoạn do thiết bị nhiệt gia dụng và lựa chọn kiến trúc phần cứng/phần mềm phù hợp.",
    initialSituation: "Chưa có hệ thống giám sát tự động; bàn ủi truyền thống chỉ dựa vào rơ-le nhiệt cơ học bên trong, không có mắt nhìn nhận biết tư thế đặt.",
    workPerformed: [
      "Khảo sát các vụ tai nạn cháy do quên rút điện bàn ủi và tổng hợp các tình huống nguy hiểm thường gặp.",
      "Đối chiếu giữa 2 hướng tiếp cận: 1) Gắn cảm biến gia tốc (IMU) trực tiếp lên tay cầm bàn ủi; 2) Sử dụng Camera thị giác máy tính gắn góc nhìn cố định.",
      "Lập sơ đồ khối tổng thể của hệ thống bao gồm module xử lý ảnh và mạch bảo vệ nguồn."
    ],
    technicalDetails: "Phân tích trade-off: Cảm biến IMU trực tiếp trên bàn ủi chịu nhiệt độ cao (>150°C) dễ hỏng hóc và vướng dây nối; phương án Camera AI từ xa kết hợp cảm biến dòng điện ngoài ổ cắm mang lại độ bền cao hơn và không can thiệp vào kết cấu điện gốc của bàn ủi.",
    problemsEncountered: "Bàn ủi có nhiều mẫu mã, màu sắc và góc quay khác nhau trong thực tế, dễ gây nhầm lẫn nếu dùng thị giác truyền thống (color thresholding).",
    troubleshooting: "Quyết định chuyển sang mô hình Deep Learning dạng Object Detection (YOLOv8 nano) để nhận diện bounding box và nhãn tư thế thay vì thuật toán trích xuất đặc trưng đơn giản.",
    results: "Hoàn thiện tài liệu đặc tả yêu cầu kỹ thuật (SRS) và danh mục linh kiện thử nghiệm.",
    lessonsLearned: "Trong thiết kế hệ thống IoT an toàn, giải pháp không xâm lấn (non-invasive) luôn an toàn và dễ triển khai thực tế hơn.",
    remainingIssues: "Cần thu thập tập dữ liệu ảnh bàn ủi ở nhiều góc độ và điều kiện ánh sáng khác nhau.",
    nextObjectives: "Thu thập dữ liệu, gán nhãn dataset và tiến hành train thử nghiệm mô hình YOLOv8n."
  },
  {
    session: "02",
    date: "[DATE TO BE ADDED]",
    status: "In Progress",
    title: "Huấn luyện mô hình YOLOv8n & Thiết lập giao thức kết nối ESP32",
    objectives: "Thu thập dataset 300+ ảnh bàn ủi, gán nhãn 3 trạng thái và lập trình firmware đọc dữ liệu cảm biến trên ESP32.",
    initialSituation: "Có mô hình ý tưởng nhưng chưa có weights inference thực tế.",
    workPerformed: [
      "Thu thập ảnh mẫu bàn ủi ở các góc nghiêng: 90 độ (đứng), 0 độ (úp ngang), và trạng thái người dùng đang cầm ủi.",
      "Sử dụng Roboflow để gán nhãn (classes: 'iron_upright', 'iron_flat', 'hand_holding').",
      "Viết script Python với OpenCV và Ultralytics YOLO để chạy live inference trên webcam.",
      "Lập trình firmware ESP32 bằng C++ (Arduino/PlatformIO) điều khiển rơ-le và gửi heartbeat qua MQTT."
    ],
    technicalDetails: "Mô hình YOLOv8n được train trên Colab với 100 epochs, batch size 16. Tốc độ inference trên CPU máy tính đạt ~28-35 FPS với độ trễ < 35ms.",
    problemsEncountered: "Khi bàn ủi bị che khuất một phần bởi quần áo, độ tin cậy nhận diện nhãn 'iron_flat' bị sụt giảm.",
    troubleshooting: "Thêm logic lọc thời gian (Time-Window Debounce): Chỉ phát cảnh báo cấp 2 khi trạng thái 'iron_flat' kéo dài liên tục quá 15 giây mà không phát hiện 'hand_holding'.",
    results: "Tỉ lệ nhận diện ban đầu đạt mAP50 ~ 84%. Mạch ESP32 nhận lệnh ngắt qua MQTT trong vòng 120ms.",
    lessonsLearned: "Không nên kích hoạt cơ chế ngắt dựa trên một khung hình đơn lẻ; việc kết hợp Time-Window Debounce giúp loại bỏ hoàn toàn các trường hợp cảnh báo sai (false positive).",
    remainingIssues: "Cần tối ưu mô hình để chạy trực tiếp trên vi xử lý nhúng hỗ trợ NPU hoặc Edge Device nhỏ gọn.",
    nextObjectives: "Hoàn thiện vỏ hộp module cảnh báo và thử nghiệm thực tế với nguồn điện 220V qua rơ-le cách ly quang (Optocoupler)."
  }
];
