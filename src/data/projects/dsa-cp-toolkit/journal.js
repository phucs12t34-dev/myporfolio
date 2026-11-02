export const dsaJournal = [
  {
    session: "01",
    date: "[DATE TO BE ADDED]",
    status: "Completed",
    title: "Chuẩn hóa Template C++ Thi đấu & Xây dựng Segment Tree với Lazy",
    objectives: "Thiết kế template C++ tối ưu tốc độ vào/ra (`fast_io`) và cài đặt Segment Tree hỗ trợ cộng đoạn và tìm max/sum đoạn.",
    initialSituation: "Thường xuyên bị TLE do `std::cin` chậm và code Segment Tree viết lại từ đầu mỗi kỳ thi tốn nhiều thời gian và dễ bug.",
    workPerformed: [
      "Viết template `fast_io`: `ios_base::sync_with_stdio(false); cin.tie(NULL);`.",
      "Xây dựng struct `LazySegTree` dạng template generic: hỗ trợ toán tử kết hợp `merge()` và toán tử cập nhật trễ `apply()`.",
      "Hiện thực đầy đủ các hàm: `build()`, `push_down()`, `update_range()`, `query_range()`.",
      "Kiểm thử với các bài toán kinh điển trên VNOJ, CSES và Codeforces."
    ],
    technicalDetails: "Mảng cây kích thước `4 * N` được phân bổ tĩnh để tránh cấp phát bộ nhớ động liên tục (dynamic allocation overhead). Sử dụng phép dịch bit `(id << 1)` và `(id << 1 | 1)` để truy cập con trái và con phải.",
    problemsEncountered: "Lỗi quên `push_down` trước khi truy vấn nhánh con dẫn đến kết quả sai lệch khi có nhiều truy vấn lồng nhau.",
    troubleshooting: "Viết hàm helper `push(int id, int l, int r)` luôn được gọi ở dòng đầu tiên của `update` và `query` nếu `l != r`.",
    results: "Vượt qua toàn bộ 100% test cases của bài toán Range Update Queries trên CSES trong thời gian 0.12s.",
    lessonsLearned: "Cơ chế Lazy Propagation bắt buộc phải bảo đảm tính kết hợp (associativity) giữa các giá trị trễ tích lũy.",
    remainingIssues: "Cần tích hợp thêm kỹ thuật nén tọa độ tự động (Coordinate Compression).",
    nextObjectives: "Xây dựng tool Stress Testing tự động bằng script PowerShell/Python."
  },
  {
    session: "02",
    date: "[DATE TO BE ADDED]",
    status: "Completed",
    title: "Phát triển Hệ thống Stress Testing tự động",
    objectives: "Tự động hóa quá trình sinh test ngẫu nhiên để phát hiện test case làm sai thuật toán tối ưu trong vòng 5 giây.",
    initialSituation: "Khi nộp bài bị Wrong Answer ở test lớn bí mật, lập trình viên thường mất hàng giờ suy đoán mò.",
    workPerformed: [
      "Viết script sinh dữ liệu ngẫu nhiên `generator.py` có khả năng sinh đồ thị liên thông, mảng số nguyên lớn, chuỗi ký tự.",
      "Viết file `brute.cpp` giải thuật ngây thơ (Brute Force O(N^2) hoặc O(2^N)) nhưng chắc chắn đúng.",
      "Viết script chạy vòng lặp kiểm tra: biên dịch cả 2 file, nạp cùng input, so sánh diff output.",
      "Thử nghiệm tìm ra corner case: N = 1, các phần tử trùng nhau hoàn toàn, và giá trị âm lớn nhất."
    ],
    technicalDetails: "Script dừng lại ngay lập tức khi phát hiện dòng output khác biệt và lưu lại file `input_failed.txt` để lập trình viên chỉ việc bấm F5 debug trong VS Code.",
    problemsEncountered: "Trường hợp bài toán có nhiều nghiệm hợp lệ (Multiple Valid Answers / Special Judge) thì so sánh diff văn bản thuần túy sẽ báo lỗi giả.",
    troubleshooting: "Bổ sung tùy chọn `checker.cpp` để thẩm định tính hợp lệ của nghiệm thay vì chỉ so sánh chuỗi.",
    results: "Bộ công cụ đã giúp tìm ra hơn 10 lỗi biên kinh điển trong quá trình luyện tập thuật toán nâng cao.",
    lessonsLearned: "Stress testing là vũ khí tối thượng của lập trình viên thi đấu để bảo đảm độ tin cậy tuyệt đối trước khi submit.",
    remainingIssues: "Cần bổ sung giao diện hiển thị bảng tiến độ luyện tập DSA.",
    nextObjectives: "Kết nối dữ liệu bài tập vào dự án Roadmap DSA C++ tương tác."
  }
];
