export const vli10Issues = [
  {
    id: "BUG-01",
    date: "[DATE TO BE ADDED]",
    severity: "Low",
    component: "Stopwatch Trigger Logic",
    description: "Khi kéo xe trượt ngược lên đỉnh máng trượt, đồng hồ bị kích hoạt sai chiều.",
    expectedBehavior: "Đồng hồ chỉ ghi nhận khi xe chuyển động xuôi theo chiều dương của máng nghiêng.",
    actualBehavior: "Tấm chắn sáng đi qua cổng quang theo bất kỳ hướng nào đều bật timer.",
    rootCause: "Sự kiện phát hiện va chạm chỉ kiểm tra tọa độ X mà chưa kiểm tra dấu của vector vận tốc `v_x > 0`.",
    debuggingProcess: "In giá trị vận tốc tại thời điểm giao cắt cổng quang.",
    solution: "Thêm điều kiện `if (car.vx > 0.01 && intersects(car, gate)) trigger();`.",
    verification: "Kéo xe trượt qua lại tự do; chỉ tính giờ khi xe lao xuống dốc.",
    status: "Fixed"
  }
];
