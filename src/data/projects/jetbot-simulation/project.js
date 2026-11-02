export const jetbotProject = {
  id: "jetbot-simulation",
  title: "JetBot Robotics & Web3D Digital Twin Simulation",
  shortDescription: "Hệ thống mô phỏng số 3D (Digital Twin) và bảng điều khiển telemetry thời gian thực cho robot di động tự hành JetBot (Jetson Nano / RP2040 / RPLiDAR).",
  category: "Robotics & Web3D",
  status: "Completed",
  period: "2026",
  technologies: ["Three.js", "WebGL", "JavaScript (ES6+)", "Differential Drive Kinematics", "RPLiDAR A1", "Jetson Nano", "RP2040", "WebSockets"],
  githubUrl: "https://github.com/",
  demoUrl: "",
  featured: true,
  summary: "Dự án phát triển nền tảng mô phỏng số đồng bộ hai chiều (Digital Twin) cho robot JetBot 2 bánh vi sai. Ứng dụng công nghệ Web3D (Three.js) để tái tạo không gian 3 chiều của robot, hiển thị quét đám mây điểm (Point Cloud) từ cảm biến LiDAR, giám sát trạng thái động cơ, góc quay IMU và tốc độ bánh xe theo thời gian thực.",
  highlights: [
    "Mô hình 3D tương tác hoàn chỉnh của khung xe Waveshare Jetbot, cụm quét LiDAR 360 độ và camera góc rộng",
    "Mô phỏng động học vi sai (Differential Drive Kinematics): Tính toán vận tốc dài v, vận tốc góc w và tọa độ Odometry (x, y, theta)",
    "Bảng điều khiển Telemetry đo lường: Dòng tiêu thụ động cơ, điện áp pin 18650, tốc độ RPM và luồng video trực tiếp từ camera"
  ],
  architectureOverview: "Hệ thống gồm Khối Robot Vật lý (Jetson Nano xử lý AI, RP2040 điều khiển động cơ PWM, RPLiDAR quét khoảng cách) gửi dữ liệu telemetry qua WebSocket về Giao diện Web3D tương tác trên trình duyệt."
};
