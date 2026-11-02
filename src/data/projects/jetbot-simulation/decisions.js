export const jetbotDecisions = [
  {
    id: "ADR-01",
    date: "[DATE TO BE ADDED]",
    title: "Lựa chọn công nghệ hiển thị 3D: WebGL / Three.js trên trình duyệt",
    status: "Accepted",
    context: "Cần một nền tảng trực quan hóa Digital Twin không bắt buộc người dùng phải cài đặt phần mềm nặng như ROS Gazebo hay Unity.",
    alternatives: ["ROS RViz / Gazebo native", "Unity WebGL Build", "Three.js Native Web"],
    selectedSolution: "Three.js Native Web",
    reasoning: "Three.js cho phép chạy trực tiếp trên mọi trình duyệt web hiện đại (kể cả di động) với dung lượng nhẹ (<1MB bundle), thời gian tải tức thì và dễ dàng tích hợp giao diện HTML5/Tailwind.",
    tradeoffs: "Cần tự viết công thức vật lý và động học cơ bản thay vì dùng engine vật lý tích hợp sẵn của Unity.",
    consequences: "Khả năng truy cập và chia sẻ dự án cho hội đồng học thuật hoặc người xem là không giới hạn."
  },
  {
    id: "ADR-02",
    date: "[DATE TO BE ADDED]",
    title: "Cấu trúc dữ liệu trực quan hóa Point Cloud từ LiDAR",
    status: "Accepted",
    context: "RPLiDAR A1 quét 360 mẫu mỗi vòng với tần số 10Hz, sinh ra 3600 điểm dữ liệu/giây.",
    alternatives: ["Vẽ từng đường kẻ THREE.Line", "Đối tượng THREE.Points với BufferAttribute Float32Array"],
    selectedSolution: "THREE.Points với Float32Array Buffer",
    reasoning: "THREE.Points chỉ tiêu tốn 1 draw call duy nhất cho toàn bộ tập hợp điểm, GPU có thể render hàng vạn điểm mà không gây lag CPU.",
    tradeoffs: "Dữ liệu phải chuyển thành mảng phẳng [x0, y0, z0, x1, y1, z1...].",
    consequences: "Duy trì ổn định tốc độ khung hình 60 FPS ngay cả trên laptop cấu hình thông thường."
  }
];
