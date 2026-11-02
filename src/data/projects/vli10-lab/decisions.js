export const vli10Decisions = [
  {
    id: "ADR-01",
    date: "[DATE TO BE ADDED]",
    title: "Chọn Canvas 2D vs WebGL 3D cho phòng thí nghiệm sư phạm",
    status: "Accepted",
    context: "Cần xây dựng giao diện mô phỏng trực quan dễ dùng cho giáo viên và học sinh phổ thông.",
    alternatives: ["Mô phỏng 3D WebGL", "Canvas 2D thuần + SVG"],
    selectedSolution: "Canvas 2D thuần + SVG",
    reasoning: "Thí nghiệm bài 6 diễn ra trên một mặt phẳng chuyển động 1 chiều; Canvas 2D giúp giao diện trực quan, rõ ràng góc nhìn trắc diện (side-view), đọc vạch chia thước kẻ cực kỳ sắc nét và tương thích 100% với các máy tính bảng cấu hình thấp tại trường học.",
    tradeoffs: "Không xoay được góc 3D tự do.",
    consequences: "Tải trang trong vòng 0.2s, không tốn tài nguyên phần cứng."
  }
];
