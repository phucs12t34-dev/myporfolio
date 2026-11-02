export const vli10Project = {
  id: "vli10-lab",
  title: "Vật Lý 10 Virtual Lab — Phòng Thí nghiệm Đo Tốc độ Ảo",
  shortDescription: "Phần mềm mô phỏng thí nghiệm đo tốc độ vật chuyển động bằng cổng quang điện tử và đồng hồ đo thời gian hiện số chuẩn chương trình GDPT Vật lý 10.",
  category: "STEM & Interactive Simulation",
  status: "Completed",
  period: "2026",
  technologies: ["HTML5 Canvas", "JavaScript", "CSS3 Glassmorphism", "Vật lý Chuyển động biến đổi đều", "Xử lý Sai số Thực nghiệm"],
  githubUrl: "https://github.com/",
  demoUrl: "",
  featured: false,
  summary: "Phòng thí nghiệm ảo hỗ trợ học sinh thực hành Bài 6: Thực hành đo tốc độ của vật chuyển động. Mô phỏng chính xác xe trượt trên máng đệm khí/máng nghiêng, kích hoạt chùm tia hồng ngoại của 2 cổng quang điện E và F, tự động hiển thị thời gian chắn sáng trên đồng hồ kỹ thuật số và hỗ trợ tính toán bảng sai số thực nghiệm.",
  highlights: [
    "Mô phỏng động học chính xác theo phương trình v = s/t và a = 2s/t^2 với nhiễu ngẫu nhiên mô phỏng sai số dụng cụ đo",
    "Giao diện tương tác trực quan: điều chỉnh góc nghiêng máng trượt, khoảng cách giữa 2 cổng quang điện tử",
    "Tự động tính giá trị trung bình, sai số tuyệt đối và sai số tỉ đối theo đúng quy chuẩn sách giáo khoa"
  ],
  architectureOverview: "Kiến trúc gồm: Engine tính toán vật lý (Physics Kinematics), Bộ sinh tín hiệu xung cổng quang (Optoelectronic Sensor Trigger), và Bảng giao diện điều khiển hiện số thời gian thực."
};
