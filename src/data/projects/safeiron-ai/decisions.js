export const safeIronDecisions = [
  {
    id: "ADR-01",
    date: "[DATE TO BE ADDED]",
    title: "Chọn phương pháp nhận diện: Camera Edge AI vs Cảm biến gắn trên bàn ủi",
    status: "Accepted",
    context: "Cần xác định chính xác tư thế bàn ủi (đứng hay úp) để đưa ra cảnh báo kịp thời.",
    alternatives: [
      "Phương án A: Gắn cảm biến gia tốc MPU6050 trên thân bàn ủi.",
      "Phương án B: Camera quan sát từ trên cao kết hợp Computer Vision nhận diện vật thể.",
      "Phương án C: Cảm biến khoảng cách hồng ngoại/siêu âm chiếu từ ổ cắm."
    ],
    selectedSolution: "Phương án B (Camera Vision)",
    reasoning: "Phương án A gặp trở ngại nghiêm trọng về nhiệt độ thân bàn ủi có thể vượt quá 180°C làm hỏng cảm biến và mạch pin. Camera Vision hoàn toàn tách biệt, bảo đảm độ bền thiết bị và cho phép phát hiện thêm ngữ cảnh (có tay người đang cầm hay không).",
    tradeoffs: "Đòi hỏi phần cứng xử lý ảnh có năng lực tính toán cao hơn so với đọc tín hiệu IMU đơn thuần.",
    consequences: "Hệ thống cần module camera ổn định và mô hình YOLO tinh gọn."
  },
  {
    id: "ADR-02",
    date: "[DATE TO BE ADDED]",
    title: "Giao thức truyền thông giữa AI Vision Node và Khối bảo vệ ESP32",
    status: "Accepted",
    context: "Cần phương thức gửi tín hiệu cảnh báo từ máy tính/Edge AI đến ESP32 trong mạng nội bộ.",
    alternatives: ["HTTP REST polling", "MQTT broker cục bộ (Mosquitto)", "Bluetooth BLE"],
    selectedSolution: "MQTT Broker cục bộ",
    reasoning: "MQTT là giao thức Publish/Subscribe nhẹ, thời gian trễ rất thấp (<50ms trong LAN), hỗ trợ Quality of Service (QoS 1) bảo đảm gói tin ngắt khẩn cấp không bị thất lạc.",
    tradeoffs: "Cần duy trì một MQTT broker nhẹ chạy nền.",
    consequences: "Tín hiệu cảnh báo được phân phối đồng thời đến còi báo động và app điện thoại."
  }
];
