# KIẾN TRÚC TÍCH HỢP WEB3D TOÀN DIỆN (WEB3D INTEGRATION PATTERNS)
> **Engineering Architecture Guide & Meta-Skill Specification**  
> Dựa trên tiêu chuẩn kỹ năng `$web3d-integration-patterns` áp dụng cho Developer Portfolio, Robotics Digital Twin và C++ DSA Visualizer.

---

## 1. TỔNG QUAN & BỐI CẢNH (OVERVIEW & INTEGRATION COMBINATIONS)

Trong các ứng dụng Web hiện đại, việc kết hợp giữa đồ họa 3D tương tác thời gian thực (WebGL/Three.js) và hệ sinh thái giao diện người dùng (React / DOM / CSS) đòi hỏi một kiến trúc được tính toán kỹ lưỡng nhằm tránh:
- Tụt FPS hoặc giật lag do xung đột render loop.
- Rò rỉ bộ nhớ VRAM GPU khi unmount component trong SPA.
- Re-render không cần thiết khi state UI thay đổi.

Hệ thống phân loại **5 mô hình tích hợp cốt lõi (5 Core Integration Patterns)**:
1. **Pattern 1: Layered Separation (Three.js WebGL Canvas + React UI Overlay)** — *Kiến trúc chủ đạo của Portfolio này*.
2. **Pattern 2: Unified Declarative Component (React Three Fiber + Motion/Drei)** — *Khai báo React-first*.
3. **Pattern 3: Hybrid Architecture (R3F + GSAP Timelines)** — *Hoạt ảnh timeline phức tạp*.
4. **Pattern 4: Physics-Based 3D (R3F + React Spring / Cannon)** — *Tương tác vật lý tự nhiên*.
5. **Pattern 5: High-Performance Particle Engine (Raw Three.js Instancing + Raycast)** — *Hệ thống hạt mật độ lớn*.

---

## 2. CHI TIẾT 5 MÔ HÌNH KIẾN TRÚC (THE 5 CORE ARCHITECTURE PATTERNS)

### Pattern 1: Layered Separation (Three.js Canvas + React UI Overlay)
**Áp dụng:** `Web3DBackground.jsx`, `JetBotViewer.jsx`, `DsaGraphViewer.jsx`.

**Kiến trúc:**
```
┌──────────────────────────────────────────────────────────────────────────┐
│                            BROWSER VIEWPORT                              │
├──────────────────────────────────────────────────────────────────────────┤
│  LAYER 2: REACT UI OVERLAY (z-index: 10, relative/fixed)                 │
│  - Navigation, Terminal, Bento Grid, Journal Modal, Telemetry HUD        │
│  - Nhận sự kiện người dùng (click, input, filter)                       │
├──────────────────────────────────────────────────────────────────────────┤
│  LAYER 1: WEB3D CANVAS SCENE (z-index: 0, fixed/absolute)                │
│  - WebGLRenderer độc lập, PerspectiveCamera, Orbit Controls              │
│  - Render Loop riêng biệt với Page Visibility API                        │
│  - Giao tiếp với UI thông qua Mutable Refs (không gây re-mount canvas)  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Ưu điểm:**
- Render Isolation tuyệt đối: Khi người dùng gõ vào Terminal hoặc bấm chuyển tab modal, React chỉ re-render DOM ảo ở Layer 2, hoàn toàn KHÔNG phá hủy hay re-mount canvas WebGL ở Layer 1.
- Thân thiện SEO & Khả năng tiếp cận (Accessibility): DOM ngữ nghĩa nằm ở trên cùng.
- Bundle size tối ưu: Chỉ dùng thư viện gốc `three`, không cõng thêm wrapper.

---

### Pattern 2: Unified Declarative Component (React Three Fiber + Motion)
**Áp dụng:** Khi dự án cần xây dựng các 3D scene mang tính thành phần hóa sâu sắc, chia sẻ context trực tiếp với React state tree.

```jsx
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';

function InteractiveNode({ active }) {
  return (
    <motion.mesh
      animate={{ scale: active ? 1.4 : 1.0, rotateY: active ? Math.PI : 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={active ? '#38bdf8' : '#9b5cff'} />
    </motion.mesh>
  );
}
```

---

### Pattern 3: Hybrid Architecture (R3F + GSAP Timelines)
**Áp dụng:** Phù hợp cho các chuỗi hoạt ảnh cinematic có kịch bản (storytelling scroll), đồng bộ giữa camera di chuyển và các đoạn text dẫn chuyện.

```jsx
useEffect(() => {
  const tl = gsap.timeline({ scrollTrigger: { trigger: '#hero', scrub: 1 } });
  tl.to(camera.position, { x: 5, y: 2, z: 8, ease: 'power2.inOut' })
    .to(targetMesh.rotation, { y: Math.PI * 2, ease: 'none' }, 0);
  return () => tl.kill();
}, []);
```

---

### Pattern 4: Physics-Based 3D (R3F + React Spring / Cannon)
**Áp dụng:** Cho các hiệu ứng tương tác có quán tính, phản lực đàn hồi tự nhiên (chạm nhả, lò xo, va đập chướng ngại vật).

---

### Pattern 5: High-Performance Particle Engine (Raw Instancing + Raycast)
**Áp dụng:** Hiển thị hàng chục nghìn điểm đám mây điểm (LiDAR Point Cloud) hoặc các chòm sao với chi phí draw call duy nhất (`THREE.InstancedMesh` hoặc `THREE.Points` với `BufferGeometry`).

---

## 3. CÁC QUY CHUẨN TỐI ƯU HIỆU NĂNG (PERFORMANCE STANDARDS)

### 1. Đồng bộ Render Loop & Page Visibility API
Không lãng phí xung nhịp GPU khi tab người dùng không hiển thị:
```javascript
let isTabVisible = !document.hidden;
document.addEventListener("visibilitychange", () => {
  isTabVisible = !document.hidden;
});

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  if (!isTabVisible) return; // Dừng render ngay khi tab ẩn
  renderer.render(scene, camera);
};
```

### 2. Device Pixel Ratio (DPR) Clamping
Màn hình Retina 3x-4x sẽ làm nổ số pixel shading. Giới hạn nghiêm ngặt ở mức 1.75:
```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
```

### 3. State Synchronization qua Mutable Refs (Tránh Anti-Pattern Re-mount)
**Lỗi kinh điển:** Đưa reactive state (`isDriving`, `lidarEnabled`) vào dependency array của `useEffect` khởi tạo Three.js. Hậu quả: Mỗi lần click button, toàn bộ canvas bị gỡ, GPU buffer giải phóng rồi cấp phát lại, camera nhảy giật.
**Giải pháp chuẩn Pattern 1:**
```javascript
const drivingRef = useRef(isDriving);
// Button click:
const toggleDriving = () => {
  setIsDriving(prev => {
    drivingRef.current = !prev;
    return !prev;
  });
};
// useEffect Three.js chỉ chạy 1 lần:
useEffect(() => {
  // animate loop đọc trực tiếp drivingRef.current
}, []); // dependency array rỗng!
```

### 4. Quy trình Giải phóng VRAM GPU Triệt để (Disposal Lifecycle)
```javascript
return () => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("resize", handleResize);
  // Dispose Geometries
  geometries.forEach(g => g.dispose());
  // Dispose Materials
  materials.forEach(m => m.dispose());
  // Dispose Renderer & gỡ DOM
  renderer.dispose();
  if (container.contains(renderer.domElement)) {
    container.removeChild(renderer.domElement);
  }
};
```

---

## 4. MA TRẬN QUYẾT ĐỊNH (DECISION MATRIX)

| Bài toán | Stack Đề xuất | Lý do kỹ thuật |
| :--- | :--- | :--- |
| **Developer Portfolio có UI tương tác nhiều** | **Pattern 1 (Three.js + React UI)** | Tách biệt render, DOM thuần cho SEO, bundle nhỏ gọn |
| **Robotics Digital Twin (JetBot)** | **Pattern 1 + Telemetry HUD** | Hiển thị HUD thời gian thực 5Hz mà không làm đơ WebGL 60FPS |
| **C++ DSA Tree / Graph Visualizer** | **Pattern 1 + Procedural Buffer** | Xung truyền năng lượng linh hoạt, giải phóng bộ nhớ sạch |
| **Scrolltelling Landing Page** | **Pattern 3 (Three.js + GSAP ScrollTrigger)** | Scrubbing theo trục scroll cực kỳ chính xác |
| **Interactive 3D Configurator** | **Pattern 2 (R3F + Motion)** | Khai báo trực quan theo state component của React |

---

## 5. CÁC MODULE TRIỂN KHAI TRONG DỰ ÁN NÀY

1. **`Web3DBackground.jsx`:**
   - Khung hình học Cybernetic Icosahedron bán kính 7.2.
   - Vành đai Gimbal Astrolabe xoay độc lập trên 2 trục.
   - Lưới hạt Additive Blending 135 điểm với texture tỏa sáng tự sinh.
   - Damped Mouse Parallax với hệ số lerp 0.045.

2. **`JetBotViewer.jsx` (Digital Twin):**
   - Khung gầm Hard-surface với Jetson Nano heatsink và Camera sensor.
   - Bánh xe dẫn động vi sai (Differential Drive) quay theo vận tốc mô phỏng.
   - Cảm biến RPLiDAR A1 quay 10Hz với 48 tia laser raycast động.
   - Telemetry HUD hiển thị $v$, $\omega$, khoảng cách tối thiểu đến chướng ngại vật.

3. **`DsaGraphViewer.jsx` (C++ DSA 3D Visualizer):**
   - Cây nhị phân phân cấp 4 tầng (15 nodes) đại diện cho Segment Tree / Binary Heap.
   - Mô phỏng xung điện truyền tải dọc theo các cạnh đồ thị (Tree traversal pulse).
   - Đo lường độ phức tạp thuật toán thời gian thực: $O(\log N)$, $O(\alpha(N))$, $O((V+E) \log V)$.
