export const vli10Journal = [
  {
    session: "01",
    date: "[DATE TO BE ADDED]",
    status: "Completed",
    title: "Phân tích đặc tả bài học & Xây dựng mô hình vật lý chuyển động",
    objectives: "Nghiên cứu sách giáo khoa Vật lý 10 Bài 6 và lập trình mô hình chuyển động của vật trên máng nghiêng.",
    initialSituation: "Học sinh tại các trường học thường thiếu trang thiết bị cổng quang điện tử thực hành trực tiếp.",
    workPerformed: [
      "Tổng hợp yêu cầu sư phạm: Cách bố trí máng nghiêng, thước milimet, tấm chắn sáng và 2 cổng quang E, F.",
      "Viết phương trình gia tốc: `a = g * (sin(alpha) - mu * cos(alpha))` có tính đến hệ số ma sát lăn `mu`.",
      "Vẽ máng trượt và xe thí nghiệm trên Canvas 2D với tỷ lệ pixel/centimeter chuẩn hóa.",
      "Lập trình đồng hồ số đo thời gian với độ chính xác đến hàng phần nghìn giây (0.001s)."
    ],
    technicalDetails: "Vòng lặp vật lý sử dụng bước thời gian cố định (Fixed Timestep) để bảo đảm kết quả đo lường không bị ảnh hưởng bởi biến động FPS của màn hình máy tính.",
    problemsEncountered: "Nếu chỉ tính phương trình lý thuyết thuần túy, kết quả các lần đo sẽ giống hệt nhau, không phản ánh được bản chất của môn thực nghiệm vật lý.",
    troubleshooting: "Thêm hàm phân phối xác suất Gauss (Gaussian Noise) cho các đại lượng đo với độ lệch chuẩn `sigma = 0.002s` tương ứng sai số dụng cụ thực tế.",
    results: "Phòng thí nghiệm ảo tái tạo trung thực kết quả thí nghiệm như trong phòng lab thực tế.",
    lessonsLearned: "Việc mô phỏng chính xác cả yếu tố sai số thực nghiệm đem lại giá trị giáo dục vượt trội.",
    remainingIssues: "Cần tối ưu giao diện hiển thị trên điện thoại thông minh.",
    nextObjectives: "Bổ sung tính năng xuất báo cáo thực hành file PDF cho giáo viên chấm điểm."
  }
];
