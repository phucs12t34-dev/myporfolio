export const safeIronIssues = [
  {
    id: "BUG-01",
    date: "[DATE TO BE ADDED]",
    severity: "High",
    component: "YOLO Inference Script",
    description: "Nhầm lẫn bàn ủi úp mặt trên vải sẫm màu với nếp gấp của quần áo khi ánh sáng phòng yếu.",
    expectedBehavior: "Nhận diện đúng bounding box bàn ủi với confidence score > 0.7.",
    actualBehavior: "Confidence score tụt xuống 0.38, dẫn đến trạng thái 'untracked'.",
    rootCause: "Dataset huấn luyện ban đầu thiếu các mẫu vải màu đen/xám và điều kiện thiếu sáng.",
    debuggingProcess: "Kiểm tra log confidence từng frame; phát hiện contrast gradient ở mép bàn ủi bị hòa lẫn vào nền.",
    solution: "Bổ sung kỹ thuật Data Augmentation (Brightness adjustment, Mosaic, Color jittering) và thêm 120 ảnh chụp dưới ánh sáng vàng yếu.",
    verification: "Kiểm thử lại với 50 frame ánh sáng yếu, confidence đạt trung bình 0.79.",
    status: "Fixed"
  },
  {
    id: "BUG-02",
    date: "[DATE TO BE ADDED]",
    severity: "Medium",
    component: "ESP32 Firmware",
    description: "Còi buzzer bị kích hoạt ngắt quãng (chớp tắt liên tục) khi mạng Wi-Fi chập chờn.",
    expectedBehavior: "Khi đã kích hoạt cảnh báo, chuông phải duy trì liên tục cho đến khi người dùng ấn nút Reset vật lý.",
    actualBehavior: "Mỗi khi mất kết nối MQTT ngắn hạn, còi tự tắt rồi bật lại.",
    rootCause: "State machine trên ESP32 phụ thuộc vào callback MQTT liên tục mà không có biến trạng thái chốt (Latching Alarm State).",
    debuggingProcess: "Xem Serial log của ESP32 phát hiện WiFiClient reconnect liên tục làm reset vòng lặp kiểm tra.",
    solution: "Cập nhật logic firmware: Sử dụng biến trạng thái chốt 'system_alarm_latched = true', chỉ xóa cờ báo động khi nút nhấn cứng được kích hoạt.",
    verification: "Mô phỏng ngắt router Wi-Fi; còi báo động vẫn kêu liên tục đảm bảo an toàn.",
    status: "Fixed"
  }
];
