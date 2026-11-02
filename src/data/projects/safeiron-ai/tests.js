export const safeIronTests = [
  {
    testId: "TEST-01",
    name: "Kiểm tra độ trễ nhận diện và phát cảnh báo cấp 1",
    method: "Đo thời gian từ lúc đặt bàn ủi úp mặt xuống đến khi chuông còi buzzer kêu.",
    inputConditions: "Bàn ủi đặt úp mặt trên bàn cầu là, camera cách 1.2m, góc nghiêng 45 độ.",
    expectedOutput: "Thời gian nhận diện < 100ms; còi buzzer kích hoạt sau đúng 15s nếu không có người cầm.",
    actualOutput: "Inference time 32ms; còi kêu sau 15.2s.",
    status: "Pass",
    notes: "Độ trễ hoàn toàn đáp ứng tiêu chuẩn an toàn phòng cháy."
  },
  {
    testId: "TEST-02",
    name: "Kiểm tra khả năng chịu tải của mạch rơ-le cách ly",
    method: "Nối tải điện trở 1500W (bàn ủi ở công suất tối đa) qua rơ-le Songle 10A trong 30 phút.",
    inputConditions: "Điện áp AC 220V, dòng tải đo được ~6.8A.",
    expectedOutput: "Rơ-le hoạt động ổn định, nhiệt độ bề mặt tiếp điểm < 55°C, ngắt nguồn dứt khoát khi có lệnh.",
    actualOutput: "Nhiệt độ tiếp điểm đạt 48°C; ngắt nguồn thành công sau tín hiệu ngắt 45ms.",
    status: "Pass",
    notes: "Khuyến nghị nâng cấp rơ-le bán dẫn SSR (Solid State Relay) cho phiên bản thương mại để tăng tuổi thọ chu kỳ đóng cắt."
  }
];
