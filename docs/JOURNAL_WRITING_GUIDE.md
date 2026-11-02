# HƯỚNG DẪN VIẾT VÀ BẢO TRÌ NHẬT KÝ PHÁT TRIỂN (JOURNAL WRITING GUIDE)

Tài liệu chuẩn hóa quy trình ghi chép để bảo đảm tính khoa học, khả năng truy vết và chất lượng học thuật của dự án.

---

## 1. CẤU TRÚC MỘT PHIÊN LÀM VIỆC (DEVELOPMENT SESSION TEMPLATE)

Mỗi khi bạn bắt đầu một buổi code hoặc thử nghiệm phần cứng mới, hãy tạo một entry mới trong file `journal.js` của dự án tương ứng theo cấu trúc:

```javascript
{
  session: "03", // Số thứ tự phiên
  date: "2026-11-15", // Ngày thực hiện hoặc [DATE TO BE ADDED]
  status: "Completed", // Completed / In Progress / Planned
  title: "Tên tiêu đề ngắn gọn phản ánh đúng công việc chính",
  objectives: "Mục tiêu cụ thể muốn giải quyết trong phiên này là gì?",
  initialSituation: "Hiện trạng trước khi bắt đầu phiên làm việc.",
  workPerformed: [
    "Các bước thao tác theo thứ tự thời gian 1",
    "Các bước thao tác theo thứ tự thời gian 2",
    "Thử nghiệm cụ thể đã chạy..."
  ],
  technicalDetails: "Giải thích sâu về thuật toán, công thức toán học, cấu trúc dữ liệu hoặc sơ đồ mạch điện.",
  problemsEncountered: "Lỗi phát sinh thực tế (lỗi biên dịch, sai kết quả, lỗi phần cứng).",
  troubleshooting: "Các giả thuyết đã đặt ra, công cụ debug đã dùng và cách sửa triệt để.",
  results: "Bằng chứng kết quả (độ phức tạp thời gian đo được, FPS, tỉ lệ nhận diện mAP).",
  lessonsLearned: "Kiến thức kỹ thuật mới hoặc kinh nghiệm thực tiễn đã đúc kết được.",
  remainingIssues: "Những phần việc nào còn dang dở chưa xong?",
  nextObjectives: "Phiên tiếp theo sẽ tập trung vào mục tiêu gì?"
}
```

---

## 2. NGUYÊN TẮC GHI CHÉP CHẤT LƯỢNG CAO

1. **Tránh câu viết chung chung:**
   - ❌ *Không viết:* "Hôm nay tôi ngồi fix bug và code thêm một số thứ."
   - ✅ *Nên viết:* "Tái hiện lỗi tràn số âm trong hàm `subMod()` khi $a < b$; đã bổ sung công thức `(a - b % m + m) % m` và kiểm thử với 100,000 cặp số ngẫu nhiên."

2. **Gắn liền với độ phức tạp thuật toán:**
   - Luôn nêu rõ độ phức tạp thời gian (Time Complexity) $O(\dots)$ và không gian bộ nhớ (Space Complexity) $O(\dots)$.
   - Đối chiếu với giới hạn thời gian (Time Limit: 1.0s tương đương $\approx 10^8$ phép tính cơ bản của CPU).

3. **Trung thực về tình trạng dự án:**
   - Nếu tính năng đang trong giai đoạn ý tưởng, ghi rõ `status: "Concept"`.
   - Nếu chưa kiểm thử trên mạch thực, ghi rõ `status: "Untested"`.
