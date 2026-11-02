# NHẬT KÝ LỖI, SỰ CỐ & QUY TRÌNH GỠ LỖI (BUGS, ERRORS & TROUBLESHOOTING LOG)

Ghi nhận các lỗi kỹ thuật thực tế phát sinh trong quá trình phát triển mã nguồn, nguyên nhân gốc rễ và giải pháp triệt để đã áp dụng.

---

## 1. DỰ ÁN SAFEIRO-AI

### [BUG-SAFEIRON-01] Nhầm lẫn bàn ủi úp trên vải tối màu dưới ánh sáng yếu
- **Mức độ:** Cao (High)
- **Mô-đun:** `yolo_inference.py`
- **Mô tả hiện tượng:** Khi bàn ủi đặt úp trên mặt vải màu đen hoặc xám trong phòng thiếu sáng, độ tin cậy nhận diện nhãn `iron_flat` tụt xuống dưới ngưỡng kích hoạt (chỉ còn 0.38 thay vì > 0.70).
- **Nguyên nhân gốc rễ:** Tập dữ liệu huấn luyện ban đầu chủ yếu thu thập trong điều kiện ánh sáng văn phòng tiêu chuẩn và nền vải sáng màu, thiếu các trường hợp tương phản yếu (low contrast).
- **Phương pháp gỡ lỗi:** Xuất log độ tin cậy của bounding box qua từng khung hình; dùng OpenCV trích xuất biểu đồ histogram ánh sáng.
- **Giải pháp áp dụng:**
  1. Áp dụng kỹ thuật Data Augmentation: Thay đổi ngẫu nhiên độ sáng (Brightness ± 30%), Mosaic và Color Jittering.
  2. Bổ sung 120 ảnh chụp bàn ủi dưới ánh sáng vàng yếu và vải tối màu vào tập train.
- **Xác thực:** Kiểm tra lại trên tập test gồm 50 khung hình thiếu sáng, độ tin cậy trung bình tăng lên 0.79. Trạng thái: **Fixed**.

### [BUG-SAFEIRON-02] Còi buzzer kêu ngắt quãng khi mạng Wi-Fi chập chờn
- **Mức độ:** Trung bình (Medium)
- **Mô-đun:** ESP32 Firmware C++
- **Mô tả hiện tượng:** Khi hệ thống đang ở trạng thái báo động, nếu sóng Wi-Fi bị ngắt tạm thời, còi buzzer bị tắt rồi bật lại liên tục.
- **Nguyên nhân gốc rễ:** Máy trạng thái (Finite State Machine) trên vi điều khiển phụ thuộc trực tiếp vào callback tin nhắn MQTT liên tục mà không có biến trạng thái chốt (Latching Alarm State).
- **Giải pháp áp dụng:** Khởi tạo biến trạng thái chốt an toàn: `bool system_latched_alarm = true;`. Khi đã kích hoạt cấp 2, còi báo động bắt buộc phải kêu liên tục cho đến khi người dùng ấn nút nhấn vật lý Reset trên bo mạch. Trạng thái: **Fixed**.

---

## 2. DỰ ÁN C++ DSA

### [BUG-DSA-01] Lỗi tràn số nguyên âm khi thực hiện phép trừ Modulo
- **Mức độ:** Nghiêm trọng (Critical)
- **Mô-đun:** `modulo_arithmetic.h`
- **Mô tả hiện tượng:** Phép tính `(a - b) % MOD` trả về số âm trong C++ khi `a < b`, dẫn đến kết quả sai lệch toàn bộ mảng quy hoạch động hoặc tổ hợp.
- **Nguyên nhân gốc rễ:** Khác với định nghĩa đồng dư trong toán học, toán tử `%` của ngôn ngữ C++ với số âm vẫn giữ dấu âm.
- **Giải pháp áp dụng:** Cài đặt hàm tiện ích chuẩn mực:
```cpp
inline long long subMod(long long a, long long b, long long m) {
    return (a - b % m + m) % m;
}
```
- **Xác thực:** Chạy kiểm thử Stress Test trên 100,000 cặp số ngẫu nhiên; không còn giá trị âm xuất hiện. Trạng thái: **Fixed**.

---

## 3. DỰ ÁN JETBOT SIMULATION

### [BUG-JETBOT-01] Hiện tượng giật khung hình khi đổi chiều vận tốc tức thời
- **Mức độ:** Thấp (Low)
- **Mô-đun:** Three.js Animation Loop
- **Mô tả hiện tượng:** Khi ấn phím chuyển từ tiến sang lùi, bánh xe và thân xe bị giật tức thì một khoảng bước nhảy.
- **Nguyên nhân gốc rễ:** Vận tốc điều khiển bị gán trực tiếp theo hàm bước nhảy (Step function) mà không có quán tính gia tốc.
- **Giải pháp áp dụng:** Bổ sung hàm nội suy quán tính (Lerp):
```javascript
current_velocity += (target_velocity - current_velocity) * 0.15;
```
- **Xác thực:** Chuyển động xe trở nên êm ái, chân thực. Trạng thái: **Fixed**.
