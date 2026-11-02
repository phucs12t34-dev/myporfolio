# DEVELOPER PORTFOLIO & ENGINEERING JOURNAL

Một không gian cá nhân số cao cấp dành cho lập trình viên đam mê cấu trúc dữ liệu, giải thuật C++ (DSA / Competitive Programming), thị giác máy tính AI và hệ thống nhúng / mô phỏng Web3D.

Dự án được xây dựng theo thẩm mỹ **Dark Minimalist Futuristic (#050505 + Electric Purple Accent)** kết hợp mô phỏng Web3D tương tác theo chuẩn **web3d-integration-patterns** và hệ thống **Ultra-Detailed Project Development Journal**.

---

## 🚀 TÍNH NĂNG NỔI BẬT

1. **Thẩm mỹ Dark Futuristic & Web3D Tương tác:**
   - Nền không gian 3 chiều Three.js WebGL với trường hạt hình học (geometric particle constellation) phản ứng theo chuột và cuộn trang.
   - Khối hình học cybernetic icosahedron đa diện lơ lửng, tối ưu hóa 60 FPS với cơ chế dọn dẹp bộ nhớ chống rò rỉ.
   - Tự động nhận biết tùy chọn trợ năng giảm chuyển động (`prefers-reduced-motion`).

2. **Terminal Hero Đa Tương tác:**
   - Bảng điều khiển cảm hứng terminal với hiệu ứng gõ phím chân thực.
   - Hỗ trợ gõ lệnh tương tác trực tiếp (`help`, `stack`, `dsa`, `projects`, `status`, `c++`, `clear`) hoặc bấm phím lệnh nhanh.

3. **Bố cục Bento Grid Đậm chất Công nghệ:**
   - Thiết kế các khối thẻ thông tin theo tỷ lệ bất đối xứng cân bằng.
   - Phân loại rõ ràng: Giới thiệu, Kỹ năng, Dự án thực chiến, Đang học tập, Cột mốc thành tích, Học vấn, Liên hệ.

4. **Hệ thống Nhật ký Phát triển Kỹ thuật Chuyên sâu (Project Journal - 2 Cấp độ):**
   - **Level 1 (Public UI):** Modal xem chi tiết dự án với các tab: Phiên Dev Log, Quyết định kiến trúc ADR, Bug & Issue Tracker, Kiểm thử thực nghiệm, Lộ trình Roadmap.
   - **Level 2 (Engineering Markdown):** Bộ 7 tài liệu Markdown chuẩn mực đặt tại thư mục `/docs/`.

5. **Hệ thống Quản lý Dữ liệu Tập trung & Bảng Tùy chỉnh Nhanh (Dev Drawer):**
   - 100% nội dung cá nhân được quản lý qua file `src/data/portfolio.js` và `src/data/projects/`.
   - Có sẵn nút "Tùy biến" góc trên cùng bên phải màn hình để thay đổi và xem trước trực tiếp trên giao diện.

---

## 📂 CẤU TRÚC DỰ ÁN

```text
myporfolio/
├── docs/                               # Level 2 Engineering Documentation
│   ├── PROJECT_JOURNAL.md              # Tổng quan hệ thống nhật ký
│   ├── DEVELOPMENT_TIMELINE.md         # Dòng thời gian các phiên làm việc
│   ├── TECHNICAL_DECISIONS.md          # Sổ tay quyết định kiến trúc (ADR)
│   ├── BUGS_AND_ISSUES.md              # Lịch sử gỡ lỗi và phân tích nguyên nhân
│   ├── TESTING_AND_VALIDATION.md       # Báo cáo kiểm thử thực nghiệm
│   ├── FUTURE_ROADMAP.md               # Lộ trình kỹ thuật tương lai
│   └── JOURNAL_WRITING_GUIDE.md        # Quy chuẩn ghi chép phiên làm việc mới
├── public/
│   └── favicon.svg                     # Logo monogram công nghệ cao
├── src/
│   ├── components/                     # Các thành phần giao diện modular
│   │   ├── Navbar.jsx                  # Thanh điều hướng dính, logo monogram
│   │   ├── Web3DBackground.jsx         # Three.js WebGL canvas nền tương tác
│   │   ├── HeroSection.jsx             # Hero 2 cột với terminal
│   │   ├── HeroTerminal.jsx            # Terminal mô phỏng có thể gõ lệnh
│   │   ├── AboutSection.jsx            # Bento card giới thiệu & triết lý
│   │   ├── SkillsSection.jsx           # Bảng kỹ năng phân loại, không dùng % ảo
│   │   ├── ProjectsSection.jsx         # Thư viện dự án bento có bộ lọc
│   │   ├── ProjectModal.jsx            # Modal chi tiết kiến trúc dự án
│   │   ├── JournalModal.jsx            # Giao diện Level 1 Project Journal
│   │   ├── CurrentlyLearningSection.jsx# Các chủ đề đang đào sâu (DSA, 3D, IoT)
│   │   ├── AchievementsSection.jsx     # Thành tích & cột mốc giải thưởng
│   │   ├── CertificationsSection.jsx   # Chứng chỉ chuyên môn
│   │   ├── EducationSection.jsx        # Lộ trình học vấn & nghiên cứu
│   │   ├── ContactSection.jsx          # Form liên hệ & kênh kết nối
│   │   ├── Footer.jsx                  # Footer tối giản, tự cập nhật năm
│   │   ├── CustomizationDrawer.jsx     # Bảng tùy biến xem trước trực tiếp
│   │   └── Icons.jsx                   # Bộ icon SVG vector chuẩn
│   ├── data/
│   │   ├── portfolio.js                # CẤU HÌNH TRỌNG TÂM CỦA TOÀN TRANG
│   │   └── projects/                   # Dữ liệu độc lập của từng dự án
│   │       ├── index.js                # Tổng hợp danh sách dự án
│   │       ├── safeiron-ai/            # Dự án SafeIron AI (IoT + Vision)
│   │       ├── jetbot-simulation/      # Dự án Robot JetBot Web3D Digital Twin
│   │       ├── dsa-cp-toolkit/         # Dự án Thư viện C++ DSA & Stress Tester
│   │       └── vli10-lab/              # Dự án Phòng Thí nghiệm Vật lý 10 Ảo
│   ├── styles/
│   │   └── index.css                   # Tailwind styles, glassmorphism, scrollbar
│   ├── App.jsx                         # Main component điều phối trạng thái
│   └── main.jsx                        # Entry point React 18
├── index.html                          # Meta SEO, Google Fonts JetBrains Mono
├── package.json                        # Vite, React, Three.js, Lucide, Tailwind
├── tailwind.config.js                  # Bảng màu Dark Futuristic & Electric Purple
└── vite.config.js                      # Chunk splitting tối ưu dung lượng
```

---

## 🛠️ HƯỚNG DẪN CÀI ĐẶT & CHẠY LOCAL

Yêu cầu máy tính đã cài đặt **Node.js** (khuyến nghị phiên bản 18+ hoặc 20+).

```bash
# 1. Đi đến thư mục dự án
cd myporfolio

# 2. Cài đặt các thư viện cần thiết
npm install

# 3. Chạy môi trường phát triển (Dev Server)
npm run dev
```
Mở trình duyệt truy cập `http://localhost:3000` để trải nghiệm website.

---

## 📦 HƯỚNG DẪN BUILD BẢN PRODUCTION

```bash
# Biên dịch mã nguồn thành bản đóng gói tĩnh tối ưu
npm run build

# Xem thử bản production tại local
npm run preview
```
Toàn bộ mã nguồn hoàn thiện sẽ được tạo ra trong thư mục `dist/`, sẵn sàng triển khai lên Vercel, Netlify, hoặc GitHub Pages.

---

## 📝 12 BƯỚC TÙY CHỈNH NỘI DUNG DÀNH CHO CHỦ SỞ HỮU

Tất cả thông tin được thiết kế dạng biến để bạn dễ dàng sửa đổi trong file `src/data/portfolio.js`:

### 1. Cách đổi tên hiển thị
Mở `src/data/portfolio.js`, tìm trường `personal.name`:
```javascript
name: "Họ và Tên của Bạn", // Thay đổi tại đây
```

### 2. Cách đổi Monogram Logo
Tìm trường `personal.initials`:
```javascript
initials: "NVA", // 2-3 chữ cái viết tắt của bạn
```

### 3. Cách đổi Tiêu đề chính Hero (Heading)
Tìm trường `personal.tagline` và `personal.role`:
```javascript
role: "Sinh viên CNTT & Đam mê Thuật toán C++",
tagline: "Xây dựng những sản phẩm có chiều sâu kỹ thuật.",
```

### 4. Cách thêm một Dự án mới
1. Tạo một thư mục con trong `src/data/projects/ten-du-an/`.
2. Tạo 6 file: `project.js`, `journal.js`, `decisions.js`, `issues.js`, `tests.js`, `roadmap.js`.
3. Import và xuất trong `src/data/projects/index.js`.
*(Xem mẫu chuẩn tại thư mục `src/data/projects/safeiron-ai/`)*.

### 5. Cách gắn hình ảnh cho Dự án
Mỗi dự án đều có trường `bannerUrl` hoặc sử dụng banner hình học công nghệ cao mặc định. Để thêm hình ảnh:
- Đặt ảnh vào thư mục `public/projects/ten-anh.png`.
- Trong file `project.js`, thêm thuộc tính: `imageUrl: "/projects/ten-anh.png"`.

### 6. Cách thêm một Kỹ năng mới
Mở `src/data/portfolio.js`, thêm vào mảng `skills`:
```javascript
{
  category: "Ngôn ngữ Lập trình",
  items: [
    { name: "Rust", level: "Đang học", note: "Memory safety without garbage collection" }
  ]
}
```

### 7. Cách thêm Thành tích / Giải thưởng
Mở `src/data/portfolio.js`, thêm vào mảng `achievements`:
```javascript
{
  title: "Giải Nhì Hội thi Tin học Trẻ",
  organization: "Tỉnh đoàn tổ chức",
  date: "2026",
  description: "Bảng thi lập trình giải thuật thuật toán C++ nâng cao.",
  credentialUrl: "https://..."
}
```

### 8. Cách thêm Chứng chỉ
Mở `src/data/portfolio.js`, thêm vào mảng `certifications`:
```javascript
{
  name: "CS50x: Introduction to Computer Science",
  issuer: "Harvard University / edX",
  date: "2026",
  credentialId: "CS50-123456",
  verificationUrl: "https://..."
}
```

### 9. Cách thêm Liên kết Mạng xã hội
Tìm đối tượng `personal.socialLinks`:
```javascript
socialLinks: {
  github: "https://github.com/username-cua-ban",
  linkedin: "https://linkedin.com/in/username-cua-ban",
  email: "email-that-cua-ban@gmail.com",
}
```

### 10. Cách đổi Avatar cá nhân
Nếu bạn muốn dùng ảnh chân dung thật thay cho Monogram công nghệ cao:
- Đặt file ảnh của bạn vào `public/avatar.jpg`.
- Mở `src/data/portfolio.js`, điền: `avatarUrl: "/avatar.jpg"`.

### 11. Cách thay đổi Gam màu nhấn (Accent Color)
Toàn bộ màu nhấn được định nghĩa trong `tailwind.config.js`:
```javascript
accent: {
  DEFAULT: '#9333ea', // Đổi mã hex màu tím chủ đạo
  glow: '#a855f7',
  cyan: '#38bdf8'    // Màu nhấn thứ cấp
}
```

### 12. Hướng dẫn Deploy Website lên Internet (Miễn phí)
- **Cách 1 (Vercel - Khuyên dùng):** Cài đặt CLI `npm i -g vercel`, gõ lệnh `vercel` tại thư mục dự án và chọn Yes.
- **Cách 2 (Netlify):** Kéo thả thư mục `dist/` (sau khi chạy `npm run build`) vào Netlify Drop.
- **Cách 3 (GitHub Pages):** Thêm cấu hình base path trong `vite.config.js` và tạo GitHub Action deploy tự động.

---

## 🔒 NGUYÊN TẮC BẢO VỆ DỮ LIỆU & AN TOÀN

- Website không sử dụng bất kỳ API key bí mật nào ở phía client.
- Form liên hệ có cơ chế mở an toàn ứng dụng email khách (`mailto:`) mà không yêu cầu server backend phức tạp.
- Mọi dữ liệu mẫu đều được đánh dấu minh bạch dạng `[ADD YOUR INFORMATION]` để đảm bảo tính trung thực tuyệt đối trong hồ sơ học thuật.
