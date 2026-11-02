export const vli10Tests = [
  {
    testId: "TEST-01",
    name: "Kiểm định định luật II Newton trên mô hình số",
    method: "Thay đổi góc nghiêng alpha từ 5 đến 30 độ; tính gia tốc lý thuyết và so sánh với gia tốc tính từ thực nghiệm ảo.",
    inputConditions: "g = 9.8 m/s^2, khoảng cách d = 0.5m.",
    expectedOutput: "Độ lệch giữa gia tốc đo và gia tốc lý thuyết < 1.5%.",
    actualOutput: "Độ lệch trung bình 0.85%.",
    status: "Pass",
    notes: "Đạt chuẩn mô hình giáo dục trực quan theo Bộ Giáo Dục & Đào Tạo."
  }
];
