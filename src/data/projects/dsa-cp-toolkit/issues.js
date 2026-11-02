export const dsaIssues = [
  {
    id: "BUG-01",
    date: "[DATE TO BE ADDED]",
    severity: "Critical",
    component: "Modulo Arithmetic Library",
    description: "Tràn số nguyên âm khi thực hiện phép trừ modulo: `(a - b) % MOD` sinh ra số âm trong C++.",
    expectedBehavior: "Kết quả luôn thuộc đoạn [0, MOD - 1].",
    actualBehavior: "Khi a < b, `(a - b) % MOD` trả về số âm, dẫn đến kết quả sai hoàn toàn.",
    rootCause: "Toán tử `%` trong C++ đối với số âm giữ nguyên dấu âm (khác với định nghĩa đồng dư toán học).",
    debuggingProcess: "Stress test phát hiện nghiệm âm khi input có a = 2, b = 5, MOD = 1e9+7.",
    solution: "Cập nhật hàm trừ chuẩn: `inline long long subMod(long long a, long long b, long long m) { return (a - b % m + m) % m; }`.",
    verification: "Chạy 10,000 cặp số ngẫu nhiên; toàn bộ kết quả đều không âm.",
    status: "Fixed"
  }
];
