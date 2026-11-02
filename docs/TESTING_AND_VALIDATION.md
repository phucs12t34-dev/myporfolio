# KẾ HOẠCH & BÁO CÁO KIỂM THỬ THỰC NGHIỆM (TESTING & VALIDATION)

Tài liệu ghi chép các kịch bản kiểm thử, phương pháp luận thực nghiệm và kết quả đối chiếu thực tế.

---

## 1. PHƯƠNG PHÁP LUẬN KIỂM THỬ THUẬT TOÁN (DSA TESTING)

Trong lập trình giải thuật C++, việc kiểm thử dựa trên nguyên tắc **Stress Testing (Đối chiếu song song)**:
1. Viết giải thuật tối ưu $O(N \log N)$ cần nộp.
2. Viết giải thuật ngây thơ (Brute Force) $O(N^2)$ hoặc duyệt nhị phân $O(2^N)$ đơn giản và chắc chắn đúng 100%.
3. Dùng Python sinh ngẫu nhiên 10,000 bộ test bao quát các trường hợp biên:
   - $N = 1$
   - Tất cả phần tử bằng nhau
   - Dãy số giảm dần / tăng dần
   - Giá trị cực đại $10^{18}$ (kiểm tra tràn `long long`)
4. Script tự động so sánh output giữa 2 thuật toán và dừng lại ngay khi phát hiện diff.

### Kết quả kiểm định Test Suite:
- **Range Update Lazy Segment Tree:** Đã vượt qua 100% test cases trên nền tảng CSES Problem Set với thời gian tối đa 0.21s trên bộ test $N = 200,000$.
- **Disjoint Set Union (DSU):** Thực hiện 1,000,000 thao tác gộp và truy vấn liên thông trong 0.15s nhờ Path Compression và Union by Rank.

---

## 2. KIỂM THỬ HỆ THỐNG PHẦN CỨNG & THỊ GIÁC (SAFEIRON AI)

| Mã Test | Nội dung kiểm thử | Điều kiện đầu vào | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TEST-SAFE-01** | Độ trễ nhận diện và phát chuông cảnh báo cấp 1 | Bàn ủi úp mặt trên bàn cầu là, camera cách 1.2m, góc 45° | Inference time < 50ms, còi buzzer kêu sau 15s nếu không có tay cầm | Inference 32ms, còi kích hoạt sau đúng 15.2s | **Pass** |
| **TEST-SAFE-02** | Khả năng chịu dòng tải của rơ-le bảo vệ | Nối tải bàn ủi 1500W (dòng điện ~6.8A AC 220V) hoạt động liên tục 30 phút | Rơ-le hoạt động ổn định, nhiệt độ tiếp điểm < 55°C, ngắt nguồn tức thì khi có tín hiệu | Nhiệt độ tiếp điểm 48°C, thời gian ngắt 45ms | **Pass** |

---

## 3. KIỂM THỬ HIỆU NĂNG ĐỒ HỌA WEB3D (JETBOT SIMULATION)

| Mã Test | Nội dung kiểm thử | Môi trường thử nghiệm | Kết quả kỳ vọng | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TEST-JET-01** | Tốc độ khung hình khi render 3600 điểm LiDAR Point Cloud | Trình duyệt Chrome trên GPU tích hợp Intel Iris Xe | Duy trì ổn định >= 55 FPS | Đạt 60 FPS mượt mà | **Pass** |
| **TEST-JET-02** | Kiểm định công thức tích phân Euler động học vi sai | Cho quay tròn tại chỗ 360 độ quanh tâm trục | Sai số góc quay $\Delta \theta < 0.02 \text{ rad}$ | Sai số thực tế đo được $0.008 \text{ rad}$ | **Pass** |
