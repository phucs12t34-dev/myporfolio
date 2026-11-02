export const safeIronProject = {
  id: "safeiron-ai",
  title: "SafeIron AI — Hệ thống Giám sát An toàn Bàn ủi Thông minh",
  shortDescription: "Giải pháp IoT kết hợp Computer Vision phát hiện tư thế đặt bàn ủi mất an toàn nhằm ngăn ngừa nguy cơ hỏa hoạn và bỏng nhiệt trong gia đình.",
  category: "AI & Embedded IoT",
  status: "In Progress", // Concept, In Progress, Completed, Archived
  period: "2026 - Đang phát triển",
  technologies: ["Python", "YOLOv8", "OpenCV", "ESP32", "C++", "MQTT / WebSocket", "Edge AI"],
  githubUrl: "https://github.com/",
  demoUrl: "",
  featured: true,
  summary: "SafeIron AI ra đời từ nhu cầu thực tiễn: bàn ủi gia đình thường xuyên bị quên ở tư thế úp mặt nóng xuống bề mặt vải, gây cháy nhà hoặc tai nạn bỏng cho trẻ nhỏ. Dự án tích hợp camera AI nhận diện tư thế bàn ủi và mạch vi điều khiển ESP32 kích hoạt cảnh báo âm thanh đa cấp cùng cơ chế ngắt rơ-le an toàn.",
  highlights: [
    "Mô hình YOLOv8 custom nhận diện 3 trạng thái tư thế: Safe (Dựng đứng), Warning (Nằm ngang không tiếp xúc), Danger (Úp mặt nhiệt trên vải quá thời gian giới hạn)",
    "Hệ thống cảnh báo hai tầng: Chuông báo còi buzzer tại chỗ + Gửi thông báo khẩn qua giao thức MQTT",
    "Thiết kế mạch điều khiển rơ-le công suất cao ngắt nguồn độc lập khi phát hiện nhiệt quá ngưỡng"
  ],
  architectureOverview: "Kiến trúc gồm 2 khối: Khối biên (ESP32 thu thập cảm biến dòng ACS712, cảm biến nhiệt không tiếp xúc và điều khiển còi/rơ-le) giao tiếp hai chiều với Khối thị giác (Edge AI camera xử lý khung hình qua YOLOv8 inference)."
};
