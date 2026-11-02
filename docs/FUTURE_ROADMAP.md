# LỘ TRÌNH PHÁT TRIỂN TƯƠNG LAI (FUTURE ROADMAP)

Bảng phân loại các nhiệm vụ phát triển tiếp theo theo mức độ ưu tiên kỹ thuật.

---

## 1. MỨC ĐỘ ƯU TIÊN CAO (CRITICAL / HIGH PRIORITY)

1. **[DSA-CP] Cài đặt cấu trúc Cây Splay Tree / Treap:**
   - *Mục tiêu:* Hỗ trợ cắt nối dãy và đảo ngược đoạn giá trị trong độ phức tạp thời gian $O(\log N)$.
   - *Phục vụ:* Các bài toán xử lý dãy số động trong kỳ thi học sinh giỏi quốc gia.
   - *Trạng thái:* Đang lên kế hoạch (Planned).

2. **[SAFEIRON] Bổ sung cảm biến nhiệt hồng ngoại không tiếp xúc MLX90614:**
   - *Mục tiêu:* Kết hợp đồng thời dữ liệu thị giác AI (nhận diện hình học tư thế) và dữ liệu đo nhiệt độ bề mặt thực tế (đo bức xạ hồng ngoại từ xa) qua bộ lọc Kalman.
   - *Lợi ích:* Loại bỏ hoàn toàn khả năng cảnh báo nhầm khi bàn ủi chưa cắm điện hoặc đã nguội.
   - *Trạng thái:* Đang lên kế hoạch (Planned).

3. **[JETBOT] Tích hợp bản đồ lưới 2D Occupancy Grid Map (2D SLAM):**
   - *Mục tiêu:* Tự động vẽ bản đồ phòng từ dữ liệu khoảng cách điểm va chạm của RPLiDAR theo thời gian thực trên Three.js.
   - *Trạng thái:* Đang lên kế hoạch (Planned).

---

## 2. MỨC ĐỘ ƯU TIÊN TRUNG BÌNH (MEDIUM PRIORITY)

1. **[DSA-CP] Thuật toán Luồng cực đại Dinic Max Flow:**
   - Cài đặt thuật toán phân tầng BFS kết hợp DFS tìm luồng chặn với độ phức tạp $O(V^2 E)$.
2. **[WEB3D] Tối ưu hóa GLTF PBR Texture Atlas:**
   - Giảm dung lượng file mô hình 3D xuống dưới 300kB bằng kỹ thuật gộp bảng màu (Color Palette Mapping).
3. **[STEM LAB] Bổ sung mô phỏng Bài 9: Chuyển động ném ngang:**
   - Vẽ quỹ đạo parabol thời gian thực trên Canvas 2D.
