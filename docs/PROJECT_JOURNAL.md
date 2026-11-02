# TỔNG QUAN HỆ THỐNG NHẬT KÝ PHÁT TRIỂN DỰ ÁN (PROJECT DEVELOPMENT JOURNAL)

Hệ thống tài liệu kỹ thuật chuyên sâu ghi nhận quá trình nghiên cứu, thiết kế kiến trúc, phát triển giải thuật và kiểm thử thực nghiệm của các dự án công nghệ.

---

## 1. MỤC TIÊU CỦA HỆ THỐNG NHẬT KÝ

Nhật ký kỹ thuật không chỉ đơn thuần là danh sách các tính năng đã hoàn thiện (Changelog), mà là hồ sơ khoa học chứng minh:
- **Tư duy tiếp cận vấn đề:** Tại sao bài toán lại đáng được giải quyết?
- **Khảo sát & Phân tích yêu cầu:** Cơ sở lý thuyết toán học / vật lý / giải thuật đã áp dụng.
- **Quyết định kiến trúc (ADR):** Phân tích được-mất (Trade-offs) giữa các giải pháp công nghệ.
- **Lịch sử xử lý sự cố (Troubleshooting):** Các lỗi logic, tràn số nguyên, TLE, hoặc sai lệch cảm biến và phương pháp gỡ lỗi có hệ thống.
- **Kiểm định thực nghiệm (Validation):** Bằng chứng đo lường khách quan.

Tài liệu này phục vụ trực tiếp cho hồ sơ năng lực học thuật, ứng tuyển học bổng, các kỳ thi nghiên cứu khoa học kỹ thuật (STEM) và phỏng vấn kỹ sư phần mềm.

---

## 2. DANH MỤC CÁC DỰ ÁN CHÍNH

### [PROJ-01] SafeIron AI — Giám sát An toàn Bàn ủi Thông minh
- **Lĩnh vực:** AI Computer Vision & Embedded IoT (ESP32 / YOLOv8 / MQTT).
- **Trạng thái:** Đang phát triển (In Progress).
- **Chi tiết:** Xem [PROJECT_JOURNAL - SafeIron AI](./safeiron_journal.md) và `src/data/projects/safeiron-ai/`.

### [PROJ-02] JetBot Robotics & Web3D Digital Twin Simulation
- **Lĩnh vực:** Robotics, Động học Vi sai & Đồ họa Web3D (Three.js / WebGL / RPLiDAR / Jetson Nano).
- **Trạng thái:** Hoàn thành giai đoạn mô phỏng (Completed).
- **Chi tiết:** Xem `src/data/projects/jetbot-simulation/`.

### [PROJ-03] C++ Competitive Programming & DSA Algorithmic Toolkit
- **Lĩnh vực:** Cấu trúc dữ liệu & Giải thuật nâng cao (C++17/20, Stanford CS97SI, ACM/ICPC).
- **Trạng thái:** Hoàn thiện và đang mở rộng (Completed).
- **Chi tiết:** Xem `src/data/projects/dsa-cp-toolkit/`.

### [PROJ-04] Vật Lý 10 Virtual Lab — Phòng Thí nghiệm Đo Tốc độ Ảo
- **Lĩnh vực:** Mô phỏng giáo dục STEM (HTML5 Canvas / Động học chất điểm / Xử lý sai số Gauss).
- **Trạng thái:** Hoàn thành (Completed).
- **Chi tiết:** Xem `src/data/projects/vli10-lab/`.

---

## 3. CƠ CHẾ HAI CẤP ĐỘ TRÌNH DIỄN (TWO PRESENTATION LEVELS)

1. **Cấp độ 1 (Level 1 — Public Portfolio UI):**
   - Tích hợp trực tiếp trên giao diện website portfolio.
   - Thẻ dự án bento có nút "Mở Nhật ký Dev".
   - Bộ lọc theo tab: Phiên Dev Log, Quyết định ADR, Bug Tracker, Kiểm thử Test Cases, Lộ trình Roadmap.
   - Trực quan, dễ đọc, phù hợp cho người xem lướt nhanh nhưng vẫn thấy rõ chiều sâu kỹ thuật.

2. **Cấp độ 2 (Level 2 — Full Engineering Docs):**
   - Lưu trữ toàn văn dưới dạng Markdown trong thư mục `/docs/`.
   - Có thể xuất ra PDF hoặc nộp kèm báo cáo khoa học.

---

## 4. QUY TẮC TRUNG THỰC KỸ THUẬT (INTEGRITY RULE)

- Tuyệt đối không bịa đặt số liệu kiểm thử, kết quả giải đấu hay lịch sử sửa lỗi giả mạo.
- Các thông tin chưa có ngày tháng hoặc cần bổ sung đều được gắn nhãn minh bạch:
  - `[DATE TO BE ADDED]`
  - `[TECHNICAL DETAILS TO BE ADDED]`
  - `[TEST RESULTS NOT PROVIDED]`

---

## 5. KIẾN TRÚC TÍCH HỢP ĐỒ HỌA WEB3D (WEB3D INTEGRATION PATTERNS)

Toàn bộ hệ thống đồ họa không gian ba chiều (3D background & mô phỏng robot) tuân thủ nghiêm ngặt cẩm nang **web3d-integration-patterns**:
- **Pattern 1: Layered Separation (Three.js WebGL + React UI Overlay)**: Tách biệt hoàn toàn luồng render WebGL và luồng component của React để đảm bảo hiệu năng 60 FPS.
- Chi tiết kiến trúc, vòng đời giải phóng bộ nhớ GPU (VRAM Cleanup) và kỹ thuật giới hạn DPR xem tại: [docs/WEB3D_INTEGRATION_PATTERNS.md](./WEB3D_INTEGRATION_PATTERNS.md).
