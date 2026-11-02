export const dsaProject = {
  id: "dsa-cp-toolkit",
  title: "C++ Competitive Programming & DSA Algorithmic Toolkit",
  shortDescription: "Bộ thư viện giải thuật chuẩn C++17/20, bộ sinh test đối chiếu tự động (Stress Tester) và giáo trình lộ trình học thuật toán phục vụ kỳ thi học sinh giỏi & ICPC.",
  category: "Algorithms & C++ DSA",
  status: "Completed",
  period: "2026",
  technologies: ["C++17 / C++20", "STL Containers", "Segment Tree with Lazy", "Fenwick (BIT)", "DSU", "Dijkstra", "Stress Testing (Bash/Python)"],
  githubUrl: "https://github.com/",
  demoUrl: "",
  featured: true,
  summary: "Một bộ công cụ lập trình thi đấu toàn diện được xây dựng bằng C++ hiện đại. Bao gồm các cấu trúc dữ liệu kinh điển được tối ưu hóa bộ nhớ đệm (cache-friendly), template fast I/O, hệ thống sinh test ngẫu nhiên đối chiếu giữa thuật toán chuẩn O(N log N) và thuật toán trâu O(N^2) để tìm ra phản ví dụ (corner cases) nhanh chóng.",
  highlights: [
    "Thư viện Segment Tree hỗ trợ Lazy Propagation cho các bài toán Range Update / Range Query",
    "Disjoint Set Union (DSU) với nén đường đi (Path Compression) và gộp theo hạng (Union by Rank) đạt độ phức tạp O(alpha(N))",
    "Script tự động Stress Testing đối chiếu kết quả tìm lỗi tràn số nguyên, tràn mảng và TLE"
  ],
  architectureOverview: "Cấu trúc gồm 4 phần: `templates/` (fast I/O, modulo arithmetic), `data_structures/` (SegTree, BIT, Trie, DSU), `algorithms/` (Graph, DP, String KMP/Z), và `tester/` (gen.py, brute.cpp, sol.cpp, stress.ps1)."
};
