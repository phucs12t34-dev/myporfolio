export const jetbotIssues = [
  {
    id: "BUG-01",
    date: "[DATE TO BE ADDED]",
    severity: "Medium",
    component: "Kinematics Euler Integration",
    description: "Khi đổi hướng đột ngột từ tiến sang lùi, mô hình 3D bị giật nhẹ tại khung hình chuyển tiếp.",
    expectedBehavior: "Gia tốc chuyển động mượt mà theo hàm quán tính quán tính (Damping / Lerp).",
    actualBehavior: "Vận tốc nhảy bậc (Step function) làm góc quay thay đổi tức thời.",
    rootCause: "Chưa áp dụng hàm nội suy tuyến tính (Linear Interpolation - lerp) cho giá trị vận tốc điều khiển.",
    debuggingProcess: "Kiểm tra biểu đồ vận tốc theo thời gian, phát hiện đạo hàm gia tốc bị vô hạn tại điểm đảo chiều.",
    solution: "Bổ sung hằng số damping: `current_v += (target_v - current_v) * 0.15` trong mỗi requestAnimationFrame.",
    verification: "Chuyển động xe trở nên êm ái, chân thực như có khối lượng vật lý thực tế.",
    status: "Fixed"
  }
];
