export const dsaTests = [
  {
    testId: "TEST-01",
    name: "Kiểm tra giới hạn thời gian (Time Limit Exceeded - TLE)",
    method: "Nạp mảng N = 200,000 số nguyên, thực hiện Q = 200,000 truy vấn cập nhật đoạn và tính tổng.",
    inputConditions: "Thời gian cho phép 1.0s, bộ nhớ 256MB.",
    expectedOutput: "Chạy xong toàn bộ trong < 0.4s, bộ nhớ < 35MB.",
    actualOutput: "Thời gian thực tế: 0.21s, bộ nhớ 18.4MB.",
    status: "Pass",
    notes: "Đạt chuẩn thi đấu ACM/ICPC quốc tế."
  }
];
