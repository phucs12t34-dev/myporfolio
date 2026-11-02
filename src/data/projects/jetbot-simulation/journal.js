export const jetbotJournal = [
  {
    session: "01",
    date: "[DATE TO BE ADDED]",
    status: "Completed",
    title: "Khởi tạo môi trường Web3D & Xây dựng mô hình hình học robot",
    objectives: "Thiết lập Three.js canvas, hệ thống trục tọa độ 3D và dựng khung mô hình JetBot dạng Low-Poly tối ưu draw call.",
    initialSituation: "Chỉ có ảnh chụp thực tế của robot JetBot phần cứng, chưa có giao diện mô phỏng 3D trên web.",
    workPerformed: [
      "Khởi tạo Scene, PerspectiveCamera (FOV 60) và WebGLRenderer hỗ trợ antialias và shadow map.",
      "Xây dựng các thành phần hình học (Geometries): Thân xe hợp kim nhôm, 2 bánh xe chủ động, bánh đa hướng caster ball, cụm đế gắn cảm biến RPLiDAR.",
      "Thiết lập vật liệu PBR (MeshStandardMaterial) với độ nhám kim loại mô phỏng chính xác chất liệu nhôm anode của Waveshare.",
      "Cấu hình OrbitControls cho phép người dùng xoay 360 độ, zoom và pan camera quanh robot."
    ],
    technicalDetails: "Áp dụng cấu trúc Scene Graph dạng phân cấp (Hierarchy): robotGroup -> chassis -> (wheelLeft, wheelRight, lidarTower -> lidarHead). Nhờ đó khi robotGroup di chuyển hoặc quay góc theta, toàn bộ linh kiện con tự động biến đổi theo hệ tọa độ địa phương.",
    problemsEncountered: "Tâm quay (Origin / Pivot Point) của bánh xe ban đầu bị đặt ở góc biên làm bánh xe quay lệch tâm.",
    troubleshooting: "Điều chỉnh offset hình học trong buffer geometry hoặc bọc bánh xe vào một pivotGroup nằm chính giữa tâm trục quay.",
    results: "Render thành công mô hình JetBot 60 FPS mượt mà trên trình duyệt với mức tiêu thụ GPU thấp.",
    lessonsLearned: "Việc chuẩn hóa tọa độ tâm quay ngay từ đầu giúp giải phóng rất nhiều khó khăn khi lập trình animation sau này.",
    remainingIssues: "Chưa có thuật toán điều khiển di chuyển theo công thức động học vi sai.",
    nextObjectives: "Viết module kinematics mô phỏng di chuyển tiến/lùi, xoay tròn theo phím điều hướng W-A-S-D."
  },
  {
    session: "02",
    date: "[DATE TO BE ADDED]",
    status: "Completed",
    title: "Hiện thực Động học Bánh vi sai & Hiển thị quét RPLiDAR",
    objectives: "Lập trình công thức Odometry giải tích và trực quan hóa các tia quét chướng ngại vật từ LiDAR.",
    initialSituation: "Mô hình đứng yên, chưa phản ứng với lệnh điều khiển và chưa có dữ liệu cảm biến.",
    workPerformed: [
      "Lập trình module kinematics: Nhận vận tốc 2 bánh v_left, v_right để tính vận tốc tịnh tiến v = (v_r + v_l)/2 và vận tốc góc w = (v_r - v_l)/L.",
      "Cập nhật tọa độ tích phân Euler qua từng frame: x += v * cos(theta) * dt, y += v * sin(theta) * dt, theta += w * dt.",
      "Tạo hiệu ứng quay liên tục của cụm đầu quét LiDAR (360 độ / 600 RPM).",
      "Viết renderer hiển thị đám mây điểm (Point Cloud) biểu diễn khoảng cách đến vật cản."
    ],
    technicalDetails: "Để hiển thị hàng nghìn tia quét mà không tụt FPS, sử dụng THREE.Points với BufferGeometry thay vì tạo từng đối tượng Mesh riêng lẻ.",
    problemsEncountered: "Tích phân Euler tích lũy sai số trôi dạt (Drift error) khi xe quay nhiều vòng liên tục.",
    troubleshooting: "Áp dụng giới hạn chuẩn hóa góc quay theta để tránh hiện tượng số thực tràn chu kỳ.",
    results: "Robot mô phỏng di chuyển mượt mà, bám sát các phương trình động học vi sai chuẩn quốc tế.",
    lessonsLearned: "Sức mạnh của BufferGeometry trong Three.js cho phép xử lý dữ liệu cảm biến thời gian thực với hiệu năng cực cao.",
    remainingIssues: "Cần tích hợp kết nối WebSocket nhận dữ liệu telemetry từ robot phần cứng thật.",
    nextObjectives: "Hoàn thiện dashboard thông số pin, dòng điện, và xuất tài liệu hướng dẫn kỹ thuật."
  }
];
