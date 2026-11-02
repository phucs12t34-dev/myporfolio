export const dsaDecisions = [
  {
    id: "ADR-01",
    date: "[DATE TO BE ADDED]",
    title: "Sử dụng Mảng Tĩnh 4*N vs Con trỏ Động (Dynamic Pointer SegTree)",
    status: "Accepted",
    context: "Chọn cấu trúc cài đặt Segment Tree cho các bài toán giới hạn bộ nhớ và thời gian khắt khe.",
    alternatives: ["Con trỏ động (Node* left, right)", "Mảng phẳng 1 chiều kích thước 4*N", "Segment Tree trên mảng Fenwick BIT"],
    selectedSolution: "Mảng phẳng 1 chiều kích thước 4*N",
    reasoning: "Mảng phẳng 1 chiều liên tục trong bộ nhớ RAM, tận dụng tối đa cơ chế L1/L2 CPU Cache hit, tốc độ duyệt nhanh hơn 2-3 lần so với nhảy con trỏ ngẫu nhiên và không sợ rò rỉ bộ nhớ (memory leak).",
    tradeoffs: "Tốn dung lượng bộ nhớ cố định 4*N.",
    consequences: "Thích hợp cho 95% bài toán CP có N <= 2e5."
  }
];
