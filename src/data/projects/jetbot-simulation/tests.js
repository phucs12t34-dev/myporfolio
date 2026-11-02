export const jetbotTests = [
  {
    testId: "TEST-01",
    name: "Kiểm tra độ chính xác chu vi quay tại chỗ (In-place Rotation)",
    method: "Cho v_left = -v_right = 0.5 rad/s; quay 1 vòng tròn 360 độ và so sánh góc theta cuối cùng.",
    inputConditions: "Thời gian quay lý thuyết t = 2*PI / w. Bán kính bánh xe r = 0.0325m, chiều dài trục L = 0.13m.",
    expectedOutput: "Góc theta quay về đúng giá trị ban đầu với sai số góc < 0.02 rad.",
    actualOutput: "Sai số góc đo được: 0.008 rad.",
    status: "Pass",
    notes: "Mô hình toán học động học bánh vi sai đã được kiểm chứng chuẩn xác."
  }
];
