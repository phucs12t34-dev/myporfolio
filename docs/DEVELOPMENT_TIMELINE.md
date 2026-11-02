# DÒNG THỜI GIAN PHÁT TRIỂN KỸ THUẬT (DEVELOPMENT TIMELINE)

Tài liệu ghi chép các phiên phát triển thực tế (Development Sessions) theo thứ tự thời gian.

---

## 1. DỰ ÁN SAFEIRO-AI (AI & EMBEDDED IOT)

### Phiên làm việc 01: Khảo sát bài toán & Xác lập kiến trúc giải pháp
- **Ngày thực hiện:** [DATE TO BE ADDED]
- **Trạng thái:** Hoàn thành (Completed)
- **1. Mục tiêu:** Đánh giá nguyên nhân cháy nổ gia dụng do bàn ủi và phân tích trade-off giữa cảm biến IMU gắn trên tay cầm so với Camera Computer Vision cố định.
- **2. Hiện trạng:** Chưa có hệ thống cảnh báo tự động; bàn ủi truyền thống chỉ dựa vào rơ-le nhiệt cơ học bên trong.
- **3. Công việc:** Khảo sát các tình huống quên rút điện; lập sơ đồ khối hệ thống gồm Edge AI Node và Mạch bảo vệ nguồn ESP32.
- **4. Chi tiết kỹ thuật:** Cảm biến IMU trực tiếp trên thân bàn ủi chịu nhiệt độ >150°C dễ hỏng hóc và vướng dây; phương án Camera AI từ xa kết hợp cảm biến dòng điện ACS712 ngoài ổ cắm mang lại độ bền cao hơn và không xâm lấn kết cấu gốc.
- **5. Vấn đề phát sinh:** Bàn ủi có nhiều mẫu mã, màu sắc và góc quay khác nhau trong thực tế.
- **6. Quá trình khắc phục:** Quyết định chuyển sang mô hình Deep Learning dạng Object Detection (YOLOv8 nano) để nhận diện bounding box và nhãn tư thế thay vì thuật toán trích xuất đặc trưng màu sắc đơn giản.
- **7. Kết quả:** Hoàn thành đặc tả SRS và danh mục linh kiện thử nghiệm.
- **8. Bài học:** Giải pháp không xâm lấn (non-invasive) luôn an toàn và dễ triển khai thực tế trong dân dụng.

### Phiên làm việc 02: Huấn luyện mô hình YOLOv8n & Firmware ESP32
- **Ngày thực hiện:** [DATE TO BE ADDED]
- **Trạng thái:** Đang phát triển (In Progress)
- **1. Mục tiêu:** Thu thập dataset 300+ ảnh, huấn luyện model nhận diện 3 nhãn tư thế và lập trình firmware ESP32 điều khiển rơ-le.
- **2. Hiện trạng:** Đã có kiến trúc nhưng chưa có trọng số model inference thực tế.
- **3. Công việc:** Gán nhãn Roboflow; viết script inference live webcam; lập trình C++ ESP32 nhận lệnh qua MQTT.
- **4. Chi tiết kỹ thuật:** Train YOLOv8n trên Google Colab 100 epochs, tốc độ suy luận ~28-35 FPS với độ trễ < 35ms trên CPU.
- **5. Vấn đề phát sinh:** Bàn ủi bị che khuất một phần bởi quần áo làm tụt confidence score của nhãn `iron_flat`.
- **6. Quá trình khắc phục:** Bổ sung thuật toán Time-Window Debounce: Chỉ phát cảnh báo cấp 2 khi trạng thái `iron_flat` kéo dài liên tục quá 15 giây mà không phát hiện `hand_holding`.
- **7. Kết quả:** mAP50 đạt 84%, thời gian phản hồi ngắt rơ-le qua mạng LAN là 120ms.

---

## 2. DỰ ÁN JETBOT ROBOTICS & WEB3D SIMULATION

### Phiên làm việc 01: Khởi tạo Scene Three.js & Mô hình hình học xe
- **Ngày thực hiện:** [DATE TO BE ADDED]
- **Trạng thái:** Hoàn thành (Completed)
- **1. Mục tiêu:** Xây dựng khung hình 3D xe JetBot với hệ tọa độ chuẩn, vật liệu PBR và OrbitControls.
- **2. Hiện trạng:** Chỉ có ảnh phần cứng Waveshare Jetbot thực tế.
- **3. Công việc:** Khởi tạo WebGLRenderer với antialias; dựng thân xe, 2 bánh xe chủ động, bánh caster, tháp quét LiDAR; cấu trúc Scene Graph phân cấp (`robotGroup -> chassis -> (wheels, lidar)`).
- **4. Chi tiết kỹ thuật:** Tối ưu hóa số lượng đa giác (Low-Poly) để chạy mượt 60 FPS mà không ngốn tài nguyên máy tính.
- **5. Vấn đề:** Tâm quay (pivot point) của bánh xe bị đặt lệch góc biên.
- **6. Khắc phục:** Bọc bánh xe vào pivotGroup tại tâm trục hình học.
- **7. Kết quả:** Render 3D 60 FPS, chuyển động xoay quan sát mượt mà.

### Phiên làm việc 02: Hiện thực Động học Bánh vi sai & Point Cloud LiDAR
- **Ngày thực hiện:** [DATE TO BE ADDED]
- **Trạng thái:** Hoàn thành (Completed)
- **1. Mục tiêu:** Cài đặt công thức động học vi sai (Differential Drive Kinematics) và hiển thị quét tia laser từ RPLiDAR A1.
- **2. Hiện trạng:** Mô hình đứng yên, chưa có động lực học.
- **3. Công việc:** Viết module tích phân Euler tính toán tọa độ Odometry `(x, y, theta)`; sử dụng `THREE.Points` với `Float32Array BufferAttribute` để vẽ đám mây điểm.
- **4. Chi tiết kỹ thuật:** 1 draw call duy nhất cho 3600 điểm dữ liệu/giây.
- **5. Vấn đề:** Tích phân Euler bị trôi dạt góc quay sau nhiều chu kỳ.
- **6. Khắc phục:** Chuẩn hóa góc quay `theta = fmod(theta + PI, 2*PI) - PI`.
- **7. Kết quả:** Robot di chuyển bám sát vật lý thực nghiệm, điểm quét LiDAR phản hồi tức thì.
