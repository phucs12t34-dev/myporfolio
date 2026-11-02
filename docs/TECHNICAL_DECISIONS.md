# TỔNG HỢP CÁC QUYẾT ĐỊNH KIẾN TRÚC KỸ THUẬT (ARCHITECTURAL DECISION RECORDS — ADR)

Tài liệu này lưu trữ nguyên nhân, các giải pháp thay thế và đánh giá được-mất của từng quyết định kỹ thuật quan trọng trong các dự án.

---

## 1. SAFEIRON AI

### [ADR-SAFEIRON-01] Phương pháp nhận diện tư thế bàn ủi
- **Bối cảnh:** Cần xác định chính xác tư thế bàn ủi (đứng thẳng an toàn hay úp ngang nguy hiểm) để đưa ra cảnh báo kịp thời.
- **Phương án cân nhắc:**
  1. *Gắn cảm biến gia tốc IMU (MPU6050) trên thân bàn ủi.*
  2. *Camera thị giác máy tính quan sát từ trên cao.*
  3. *Cảm biến khoảng cách siêu âm chiếu từ ổ cắm.*
- **Giải pháp được chọn:** Camera thị giác máy tính (Computer Vision với YOLOv8 nano).
- **Lý do:** Mặt bàn ủi khi hoạt động có nhiệt độ lên tới 180°C–220°C, dễ phá hủy linh kiện điện tử và pin nếu gắn trực tiếp. Camera từ xa hoàn toàn cách ly nhiệt, an toàn và phát hiện được thêm bàn tay người dùng đang cầm ủi hay không.
- **Đánh đổi:** Cần năng lực tính toán xử lý ảnh cao hơn so với đọc tín hiệu I2C đơn thuần từ IMU.

### [ADR-SAFEIRON-02] Giao thức truyền thông giữa Khối AI và ESP32
- **Bối cảnh:** Cần truyền lệnh ngắt khẩn cấp từ thiết bị xử lý ảnh đến mạch bảo vệ nguồn trong thời gian < 150ms.
- **Phương án cân nhắc:** HTTP REST Polling, MQTT Broker cục bộ (Mosquitto), Bluetooth BLE.
- **Giải pháp được chọn:** MQTT Broker cục bộ.
- **Lý do:** Kiến trúc Publish/Subscribe nhẹ, thời gian trễ cực thấp trong mạng LAN (<50ms), hỗ trợ QoS 1 bảo đảm gói tin ngắt nguồn không bị thất lạc.

---

## 2. JETBOT SIMULATION

### [ADR-JETBOT-01] Nền tảng hiển thị mô phỏng 3D
- **Bối cảnh:** Cần nền tảng Digital Twin có thể chạy trực tiếp trên web để chia sẻ và trình diễn không cần cài đặt phần mềm chuyên dụng.
- **Phương án cân nhắc:** ROS RViz / Gazebo native, Unity WebGL Build, Three.js WebGL Native.
- **Giải pháp được chọn:** Three.js WebGL Native.
- **Lý do:** Dung lượng file nhẹ (< 500kB), tải trang tức thì trong 1 giây, dễ dàng can thiệp trực tiếp vào từng ma trận biến đổi hình học qua JavaScript và tích hợp mượt mà với UI Tailwind CSS.
- **Đánh đổi:** Phải tự lập trình các phương trình vi sai kinematics và va chạm cơ bản.

### [ADR-JETBOT-02] Trực quan hóa dữ liệu RPLiDAR Point Cloud
- **Bối cảnh:** Tốc độ quét 3600 điểm/giây nếu tạo 3600 đối tượng Mesh sẽ làm nghẽn CPU/GPU.
- **Phương án cân nhắc:** `THREE.Line` vẽ từng tia, `THREE.Points` với `Float32Array BufferAttribute`.
- **Giải pháp được chọn:** `THREE.Points` với `Float32Array`.
- **Lý do:** Gom toàn bộ điểm dữ liệu vào 1 Draw Call duy nhất, GPU render đa luồng đạt 60 FPS ổn định.

---

## 3. C++ DSA & COMPETITIVE PROGRAMMING

### [ADR-DSA-01] Cài đặt Cây Phân Đoạn (Segment Tree) mảng tĩnh 4*N vs Con trỏ động
- **Bối cảnh:** Cần cấu trúc dữ liệu thực hiện cập nhật đoạn và truy vấn đoạn trong thời gian O(log N) cho các kỳ thi giới hạn 1.0 giây / 256MB.
- **Phương án cân nhắc:** Con trỏ động `Node* left, right` vs Mảng 1 chiều kích thước `4 * N`.
- **Giải pháp được chọn:** Mảng 1 chiều kích thước `4 * N`.
- **Lý do:** Bộ nhớ liên tục trên RAM giúp tối ưu hóa L1/L2 Cache hit của CPU, tốc độ truy cập nhanh gấp 2–3 lần so với cấp phát động liên tục bằng `new/delete` và loại trừ hoàn toàn nguy cơ rò rỉ bộ nhớ (memory leak).
