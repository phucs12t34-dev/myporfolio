import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCw, Network, Cpu, Compass, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * DsaGraphViewer - Interactive 3D Algorithmic Data Structure & Graph Visualizer
 * Built strictly adhering to web3d-integration-patterns (Pattern 1: Layered Separation):
 * - Procedural 3D Segment Tree / Binary Heap & Balanced Tree Mesh
 * - Dynamic Pulse Traversal along graph edges
 * - Telemetry HUD overlay with live Algorithmic Complexity metrics (O(log N), O(alpha(N)), O((V+E)log V))
 * - Mouse-driven damped orbit and smooth animation loop with strict WebGL disposal lifecycle
 */
export default function DsaGraphViewer() {
  const mountRef = useRef(null);
  const [activeAlgorithm, setActiveAlgorithm] = useState("segtree"); // 'segtree' | 'dsu' | 'dijkstra'
  const [isTraversing, setIsTraversing] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [metrics, setMetrics] = useState({
    nodeCount: 15,
    treeDepth: 4,
    activeNode: "Node #1 (Root)",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(4N)",
    operation: "Range Query [2, 6]",
  });

  // Mutable refs for render-loop synchronization without WebGL re-mounting
  const traversingRef = useRef(isTraversing);
  const autoRotateRef = useRef(autoRotate);
  const algorithmRef = useRef(activeAlgorithm);
  const cameraControlsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0x9b5cff, 2.8, 30);
    purplePointLight.position.set(5, 6, 6);
    scene.add(purplePointLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 2.2, 25);
    cyanPointLight.position.set(-6, -4, 4);
    scene.add(cyanPointLight);

    // 3. Grid Plane
    const grid = new THREE.GridHelper(14, 20, 0x9b5cff, 0x1f1f2e);
    grid.position.y = -3.2;
    scene.add(grid);

    // 4. Graph Hierarchy Group
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Procedural Tree Structure (15 nodes of 4-level balanced binary tree)
    const nodePositions = [];
    const nodeMeshes = [];
    const edges = [];

    const levels = 4;

    for (let depth = 0; depth < levels; depth++) {
      const countInLevel = Math.pow(2, depth);
      const y = 2.2 - depth * 1.5;
      const totalWidth = Math.min(10, 2.8 * Math.pow(1.8, levels - depth - 1));
      const stepX = countInLevel > 1 ? totalWidth / (countInLevel - 1) : 0;

      for (let i = 0; i < countInLevel; i++) {
        const x = countInLevel === 1 ? 0 : -totalWidth / 2 + i * stepX;
        const z = Math.sin(i * 1.5) * 0.4;
        nodePositions.push(new THREE.Vector3(x, y, z));
      }
    }

    // Materials
    const baseNodeMat = new THREE.MeshStandardMaterial({
      color: 0x181826,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x9b5cff,
      emissiveIntensity: 0.25,
    });

    const rootNodeMat = new THREE.MeshStandardMaterial({
      color: 0x9b5cff,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0xb994ff,
      emissiveIntensity: 0.9,
    });

    const nodeGeo = new THREE.SphereGeometry(0.32, 20, 20);

    nodePositions.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(nodeGeo, idx === 0 ? rootNodeMat : baseNodeMat.clone());
      mesh.position.copy(pos);
      mesh.userData = { id: idx + 1, depth: Math.floor(Math.log2(idx + 1)) };
      graphGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Create Edge Lines connecting parent (i) to left (2i+1) and right (2i+2)
    const edgeLinePositions = [];
    for (let i = 0; i < nodePositions.length; i++) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < nodePositions.length) {
        edgeLinePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
        edgeLinePositions.push(nodePositions[left].x, nodePositions[left].y, nodePositions[left].z);
        edges.push({ from: i, to: left });
      }
      if (right < nodePositions.length) {
        edgeLinePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
        edgeLinePositions.push(nodePositions[right].x, nodePositions[right].y, nodePositions[right].z);
        edges.push({ from: i, to: right });
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgeLinePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x9b5cff,
      transparent: true,
      opacity: 0.45,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    graphGroup.add(edgeLines);

    // Traveling energy pulse sphere along edges
    const pulseGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pulseSphere = new THREE.Mesh(pulseGeo, pulseMat);
    graphGroup.add(pulseSphere);

    // 5. Interactive Orbit & Mouse Damping
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.2;
    let targetRotX = 0.15;
    let currentRotY = 0.2;
    let currentRotX = 0.15;
    let currentRadius = 9.5;
    let targetRadius = 9.5;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      targetRotY += deltaX * 0.007;
      targetRotX = Math.max(-0.4, Math.min(0.8, targetRotX + deltaY * 0.007));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
      targetRotY += deltaX * 0.007;
      targetRotX = Math.max(-0.4, Math.min(0.8, targetRotX + deltaY * 0.007));
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // External camera angle controls exposed via ref
    cameraControlsRef.current = {
      setAngles: (yaw, pitch) => {
        targetRotY = yaw;
        targetRotX = pitch;
      },
      reset: () => {
        targetRotY = 0.2;
        targetRotX = 0.15;
        targetRadius = 9.5;
      },
      zoom: (delta) => {
        targetRadius = Math.max(6, Math.min(14, targetRadius + delta));
      }
    };

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 6. Page Visibility API check
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 7. Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();
    let activeEdgeIndex = 0;
    let pulseProgress = 0;
    let telemetryTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (autoRotateRef.current && !isDragging) {
        targetRotY += delta * 0.25;
      }

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRadius += (targetRadius - currentRadius) * 0.08;

      camera.position.x = Math.sin(currentRotY) * Math.cos(currentRotX) * currentRadius;
      camera.position.z = Math.cos(currentRotY) * Math.cos(currentRotX) * currentRadius;
      camera.position.y = Math.sin(currentRotX) * currentRadius + 0.5;
      camera.lookAt(0, 0, 0);

      // Traversal pulse animation
      if (traversingRef.current && edges.length > 0) {
        pulseProgress += delta * 2.2;
        if (pulseProgress >= 1) {
          pulseProgress = 0;
          activeEdgeIndex = (activeEdgeIndex + 1) % edges.length;
        }
        const edge = edges[activeEdgeIndex];
        const startPos = nodePositions[edge.from];
        const endPos = nodePositions[edge.to];
        pulseSphere.position.lerpVectors(startPos, endPos, pulseProgress);

        const pulseScale = 1 + Math.sin(elapsed * 10) * 0.25;
        pulseSphere.scale.set(pulseScale, pulseScale, pulseScale);
      }

      // Subtle floating levitation on entire tree
      graphGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Telemetry update throttled
      telemetryTimer += delta;
      if (telemetryTimer > 0.25) {
        telemetryTimer = 0;
        const currentAlg = algorithmRef.current;
        if (currentAlg === "segtree") {
          const activeIdx = edges[activeEdgeIndex]?.to || 1;
          setMetrics({
            nodeCount: 15,
            treeDepth: 4,
            activeNode: `Tree Node #${activeIdx + 1} [Segment ${activeIdx % 4}, ${(activeIdx % 4) + 2}]`,
            timeComplexity: "O(log N)",
            spaceComplexity: "O(4N)",
            operation: `Query Segment Update [${(activeIdx * 2) % 8}, ${((activeIdx * 2) % 8) + 2}]`,
          });
        } else if (currentAlg === "dsu") {
          setMetrics({
            nodeCount: 15,
            treeDepth: 2,
            activeNode: "Set Leader: Node #1",
            timeComplexity: "O(alpha(N)) ~ O(1)",
            spaceComplexity: "O(N) parent/rank",
            operation: "Find with Path Compression & Union by Rank",
          });
        } else {
          setMetrics({
            nodeCount: 15,
            treeDepth: 4,
            activeNode: `Relaxing Vertex #${(activeEdgeIndex % 15) + 1}`,
            timeComplexity: "O((V + E) log V)",
            spaceComplexity: "O(V + E) Adjacency",
            operation: "Priority Queue Min-Heap Extracted",
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Strict WebGL Disposal Lifecycle (Pattern 1 Cleanup)
    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      nodeGeo.dispose();
      edgeGeo.dispose();
      pulseGeo.dispose();
      grid.geometry.dispose();

      baseNodeMat.dispose();
      rootNodeMat.dispose();
      edgeMat.dispose();
      pulseMat.dispose();
      grid.material.dispose();
      nodeMeshes.forEach((m) => m.material.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleAlgorithmChange = (alg) => {
    setActiveAlgorithm(alg);
    algorithmRef.current = alg;
  };

  const handleToggleTraverse = () => {
    setIsTraversing((prev) => {
      traversingRef.current = !prev;
      return !prev;
    });
  };

  const handleToggleAutoRotate = () => {
    setAutoRotate((prev) => {
      autoRotateRef.current = !prev;
      return !prev;
    });
  };

  return (
    <div className="relative w-full h-full min-h-[380px] bg-[#07070B] rounded-2xl border border-purple-500/30 overflow-hidden flex flex-col justify-between shadow-2xl">
      {/* Top HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-mono text-xs font-bold text-white">C++ DSA 3D VISUALIZER</span>
          <span className="font-mono text-[10px] text-purple-400 border-l border-white/10 pl-2">
            WEB3D PATTERN 1
          </span>
        </div>

        {/* Algorithm Preset Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md pointer-events-auto">
          <button
            onClick={() => handleAlgorithmChange("segtree")}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              activeAlgorithm === "segtree"
                ? "bg-purple-600/40 text-purple-200 border border-purple-500/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Segment Tree
          </button>
          <button
            onClick={() => handleAlgorithmChange("dsu")}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              activeAlgorithm === "dsu"
                ? "bg-purple-600/40 text-purple-200 border border-purple-500/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            DSU
          </button>
          <button
            onClick={() => handleAlgorithmChange("dijkstra")}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
              activeAlgorithm === "dijkstra"
                ? "bg-purple-600/40 text-purple-200 border border-purple-500/50"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Dijkstra
          </button>
        </div>
      </div>

      {/* WebGL 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full flex-1 cursor-grab active:cursor-grabbing relative min-h-[260px]"
        title="Kéo chuột để xoay cấu trúc 3D"
      />

      {/* Bottom Telemetry & Controls HUD Layer */}
      <div className="p-3 sm:p-4 bg-gradient-to-t from-black via-black/85 to-transparent z-20 space-y-3">
        {/* Complexity & Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left font-mono text-xs">
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-[10px] text-[#686571] uppercase block">Time Complexity</span>
            <span className="text-cyan-300 font-bold">{metrics.timeComplexity}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-[10px] text-[#686571] uppercase block">Space / Memory</span>
            <span className="text-purple-300 font-bold">{metrics.spaceComplexity}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5 col-span-2">
            <span className="text-[10px] text-[#686571] uppercase block">Active Traversal Focus</span>
            <span className="text-emerald-300 font-semibold truncate block">
              {metrics.activeNode}
            </span>
          </div>
        </div>

        {/* Interactive Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleTraverse}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all ${
                isTraversing
                  ? "bg-purple-600/30 text-purple-200 border-purple-500/40 shadow-sm"
                  : "bg-white/5 text-[#A6A2AF] border-white/10 hover:text-white"
              }`}
            >
              {isTraversing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTraversing ? "Tạm dừng xung" : "Duyệt cây"}</span>
            </button>

            <button
              onClick={handleToggleAutoRotate}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all ${
                autoRotate
                  ? "bg-purple-600/30 text-purple-200 border-purple-500/40"
                  : "bg-white/5 text-[#A6A2AF] border-white/10 hover:text-white"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{autoRotate ? "Tự xoay" : "Khóa góc"}</span>
            </button>

            <button
              onClick={() => cameraControlsRef.current?.reset()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Đặt lại góc nhìn camera"
            >
              Reset
            </button>
          </div>

          <div className="font-mono text-[11px] text-[#686571] hidden sm:block">
            Kéo chuột để xoay cây 3 chiều • C++20 Cache-Friendly
          </div>
        </div>
      </div>
    </div>
  );
}
