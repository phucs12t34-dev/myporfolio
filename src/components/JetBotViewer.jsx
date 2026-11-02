import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Play, Pause, Radio, Activity, ShieldCheck, Zap, Compass, Maximize2 } from "lucide-react";

/**
 * JetBotViewer - Interactive 3D Digital Twin Viewer
 * Built strictly adhering to web3d-integration-patterns (Pattern 1: Layered Separation):
 * - Procedural Hard-surface JetBot 3D model (Chassis, Differential Drive Wheels, Caster, Camera, RPLiDAR A1)
 * - Dynamic LiDAR Laser Raycast Cloud (BufferGeometry lines)
 * - Telemetry HUD overlay with live Kinematics metrics (Linear v, Angular w, LiDAR min distance)
 * - State management with mutable useRefs preventing WebGL context recreation on UI toggle
 * - Mouse-driven damped orbit and smooth animation loop with strict WebGL disposal lifecycle
 */
export default function JetBotViewer({ isExpanded = false, onClose = null }) {
  const mountRef = useRef(null);
  const [isDriving, setIsDriving] = useState(true);
  const [lidarEnabled, setLidarEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [telemetry, setTelemetry] = useState({
    linearVel: "0.24",
    angularVel: "0.12",
    lidarMinDist: "0.48",
    obstacleDetected: false,
    heading: 45,
  });

  // Mutable refs for render-loop synchronization without WebGL re-mounting
  const drivingRef = useRef(isDriving);
  const lidarRef = useRef(lidarEnabled);
  const autoRotateRef = useRef(autoRotate);
  const cameraControlsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.5, 3.8, 5.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const purpleRimLight = new THREE.PointLight(0x9b5cff, 2.5, 20);
    purpleRimLight.position.set(-5, 4, -4);
    scene.add(purpleRimLight);

    const cyanUnderLight = new THREE.PointLight(0x38bdf8, 1.5, 15);
    cyanUnderLight.position.set(3, -1, 3);
    scene.add(cyanUnderLight);

    // 3. Environment Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x9b5cff, 0x1f1f2e);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 4. JetBot Robot Root Group
    const robotGroup = new THREE.Group();
    robotGroup.position.y = 0.05;
    scene.add(robotGroup);

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x14141d,
      metalness: 0.85,
      roughness: 0.25,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x9b5cff,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x9b5cff,
      emissiveIntensity: 0.2,
    });

    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      roughness: 0.85,
      metalness: 0.1,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const lidarBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f2a,
      metalness: 0.9,
      roughness: 0.3,
    });

    const lidarTurretMat = new THREE.MeshStandardMaterial({
      color: 0x9b5cff,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x9b5cff,
      emissiveIntensity: 0.4,
    });

    // 4a. Chassis Base
    const chassisGeo = new THREE.BoxGeometry(1.6, 0.45, 2.2);
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.y = 0.55;
    robotGroup.add(chassisMesh);

    // Top Decker Plate
    const deckGeo = new THREE.BoxGeometry(1.5, 0.08, 2.0);
    const deckMesh = new THREE.Mesh(deckGeo, accentMat);
    deckMesh.position.y = 0.82;
    robotGroup.add(deckMesh);

    // Jetson Nano Heatsink
    const heatsinkGeo = new THREE.BoxGeometry(0.8, 0.25, 0.9);
    const heatsinkMesh = new THREE.Mesh(heatsinkGeo, chassisMat);
    heatsinkMesh.position.set(0, 0.98, -0.2);
    robotGroup.add(heatsinkMesh);

    // Camera Sensor Mount
    const cameraMountGeo = new THREE.BoxGeometry(0.35, 0.35, 0.25);
    const cameraMount = new THREE.Mesh(cameraMountGeo, accentMat);
    cameraMount.position.set(0, 0.85, 1.05);
    robotGroup.add(cameraMount);

    const cameraLensGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);
    const cameraLensMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cameraLens = new THREE.Mesh(cameraLensGeo, cameraLensMat);
    cameraLens.rotation.x = Math.PI / 2;
    cameraLens.position.set(0, 0.85, 1.18);
    robotGroup.add(cameraLens);

    // 4b. Differential Drive Left & Right Wheels
    const wheelRadius = 0.48;
    const wheelThickness = 0.24;
    const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelThickness, 24);
    const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.5, wheelRadius * 0.5, wheelThickness + 0.02, 16);

    // Left Wheel
    const leftWheelGroup = new THREE.Group();
    leftWheelGroup.position.set(0.95, wheelRadius, 0.25);
    const leftWheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
    leftWheelMesh.rotation.z = Math.PI / 2;
    const leftRimMesh = new THREE.Mesh(rimGeo, rimMat);
    leftRimMesh.rotation.z = Math.PI / 2;
    leftWheelGroup.add(leftWheelMesh);
    leftWheelGroup.add(leftRimMesh);
    robotGroup.add(leftWheelGroup);

    // Right Wheel
    const rightWheelGroup = new THREE.Group();
    rightWheelGroup.position.set(-0.95, wheelRadius, 0.25);
    const rightWheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
    rightWheelMesh.rotation.z = Math.PI / 2;
    const rightRimMesh = new THREE.Mesh(rimGeo, rimMat);
    rightRimMesh.rotation.z = Math.PI / 2;
    rightWheelGroup.add(rightWheelMesh);
    rightWheelGroup.add(rightRimMesh);
    robotGroup.add(rightWheelGroup);

    // Rear Ball Caster
    const casterGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const casterMesh = new THREE.Mesh(casterGeo, rimMat);
    casterMesh.position.set(0, 0.2, -0.85);
    robotGroup.add(casterMesh);

    // 4c. Active RPLiDAR A1 Sensor
    const lidarBaseGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.22, 20);
    const lidarBase = new THREE.Mesh(lidarBaseGeo, lidarBaseMat);
    lidarBase.position.set(0, 1.2, 0.35);
    robotGroup.add(lidarBase);

    const lidarTurretGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.2, 20);
    const lidarTurret = new THREE.Mesh(lidarTurretGeo, lidarTurretMat);
    lidarTurret.position.set(0, 1.4, 0.35);
    robotGroup.add(lidarTurret);

    // 4d. 360° LiDAR Laser Ray Field
    const rayCount = 48;
    const rayPositions = new Float32Array(rayCount * 6);
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const dist = 2.4 + Math.sin(i * 3) * 0.8;
      rayPositions[i * 6] = 0;
      rayPositions[i * 6 + 1] = 0;
      rayPositions[i * 6 + 2] = 0;
      rayPositions[i * 6 + 3] = Math.cos(angle) * dist;
      rayPositions[i * 6 + 4] = 0;
      rayPositions[i * 6 + 5] = Math.sin(angle) * dist;
    }
    const rayGeometry = new THREE.BufferGeometry();
    rayGeometry.setAttribute("position", new THREE.BufferAttribute(rayPositions, 3));

    const rayMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const lidarRays = new THREE.LineSegments(rayGeometry, rayMaterial);
    lidarTurret.add(lidarRays);

    // 5. Interactive Orbit Controls & Mouse Damping
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.8;
    let targetRotX = 0.3;
    let currentRotY = 0.8;
    let currentRotX = 0.3;
    let targetRadius = 6.2;
    let currentRadius = 6.2;

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

      targetRotY += deltaX * 0.008;
      targetRotX = Math.max(0.05, Math.min(1.35, targetRotX + deltaY * 0.008));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile devices
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
      targetRotY += deltaX * 0.008;
      targetRotX = Math.max(0.05, Math.min(1.35, targetRotX + deltaY * 0.008));
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Expose camera presets via cameraControlsRef
    cameraControlsRef.current = {
      setAngles: (yaw, pitch) => {
        targetRotY = yaw;
        targetRotX = pitch;
      },
      reset: () => {
        targetRotY = 0.8;
        targetRotX = 0.3;
        targetRadius = 6.2;
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

    // Page Visibility API check
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 6. Animation Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();
    let telemetryTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Auto-orbit camera or lerp mouse
      if (autoRotateRef.current && !isDragging) {
        targetRotY += delta * 0.35;
      }

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRadius += (targetRadius - currentRadius) * 0.08;

      camera.position.x = Math.sin(currentRotY) * Math.cos(currentRotX) * currentRadius;
      camera.position.z = Math.cos(currentRotY) * Math.cos(currentRotX) * currentRadius;
      camera.position.y = Math.sin(currentRotX) * currentRadius + 0.8;
      camera.lookAt(0, 0.6, 0);

      // Rotate wheels if driving simulated
      if (drivingRef.current) {
        const driveSpeed = delta * 4.5;
        leftWheelMesh.rotation.x += driveSpeed;
        rightWheelMesh.rotation.x += driveSpeed;

        // Micro vibration for kinematics realism
        robotGroup.position.y = 0.05 + Math.sin(elapsed * 12) * 0.004;
      }

      // Spin LiDAR Turret at 10Hz
      if (lidarRef.current) {
        lidarTurret.rotation.y += delta * 12.0;
        lidarRays.visible = true;
      } else {
        lidarRays.visible = false;
      }

      // Update HUD telemetry at throttled 5Hz interval
      telemetryTimer += delta;
      if (telemetryTimer > 0.2) {
        telemetryTimer = 0;
        const simDistance = 0.35 + Math.abs(Math.sin(elapsed * 0.8)) * 1.8;
        const isD = drivingRef.current;
        setTelemetry({
          linearVel: isD ? (0.22 + Math.sin(elapsed) * 0.05).toFixed(2) : "0.00",
          angularVel: isD ? (Math.cos(elapsed * 0.6) * 0.15).toFixed(2) : "0.00",
          lidarMinDist: simDistance.toFixed(2),
          obstacleDetected: simDistance < 0.6,
          heading: Math.floor((currentRotY * (180 / Math.PI)) % 360 + 360) % 360,
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Strict Cleanup Lifecycle (Pattern 1 Resource Management)
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

      // Dispose Geometries
      chassisGeo.dispose();
      deckGeo.dispose();
      heatsinkGeo.dispose();
      cameraMountGeo.dispose();
      cameraLensGeo.dispose();
      wheelGeo.dispose();
      rimGeo.dispose();
      casterGeo.dispose();
      lidarBaseGeo.dispose();
      lidarTurretGeo.dispose();
      rayGeometry.dispose();
      gridHelper.geometry.dispose();

      // Dispose Materials
      chassisMat.dispose();
      accentMat.dispose();
      wheelMat.dispose();
      rimMat.dispose();
      lidarBaseMat.dispose();
      lidarTurretMat.dispose();
      rayMaterial.dispose();
      cameraLensMat.dispose();
      gridHelper.material.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run ONCE on mount for absolute render isolation!

  const handleToggleDriving = () => {
    setIsDriving((prev) => {
      drivingRef.current = !prev;
      return !prev;
    });
  };

  const handleToggleLidar = () => {
    setLidarEnabled((prev) => {
      lidarRef.current = !prev;
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
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono text-xs font-bold text-white">JETBOT DIGITAL TWIN</span>
          <span className="font-mono text-[10px] text-purple-400 border-l border-white/10 pl-2">
            WEB3D PATTERN 1
          </span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md pointer-events-auto font-mono text-xs">
          <span className="text-[#A6A2AF]">LiDAR:</span>
          <span className={telemetry.obstacleDetected ? "text-rose-400 font-bold" : "text-emerald-400"}>
            {telemetry.obstacleDetected ? "CẢNH BÁO VẬT CẢN" : "SAFE ROUTE"}
          </span>
        </div>
      </div>

      {/* WebGL 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full flex-1 cursor-grab active:cursor-grabbing relative min-h-[260px]"
        title="Kéo chuột để xoay góc nhìn 3D"
      />

      {/* Bottom Telemetry & Controls HUD Layer */}
      <div className="p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-3">
        {/* Telemetry Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left font-mono text-xs">
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-[10px] text-[#686571] uppercase block">Linear Speed</span>
            <span className="text-cyan-300 font-bold">{telemetry.linearVel} m/s</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-[10px] text-[#686571] uppercase block">Angular w</span>
            <span className="text-purple-300 font-bold">{telemetry.angularVel} rad/s</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-[10px] text-[#686571] uppercase block">LiDAR Min Range</span>
            <span className={telemetry.obstacleDetected ? "text-rose-400 font-bold" : "text-emerald-300"}>
              {telemetry.lidarMinDist} m
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-[10px] text-[#686571] uppercase block">Heading Yaw</span>
            <span className="text-amber-300 font-bold">{telemetry.heading}°</span>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleDriving}
              className={"px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all " +
                (isDriving
                  ? "bg-purple-600/30 text-purple-200 border-purple-500/40 shadow-sm"
                  : "bg-white/5 text-[#A6A2AF] border-white/10 hover:text-white")}
            >
              {isDriving ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isDriving ? "Dừng bánh xe" : "Chạy mô phỏng"}</span>
            </button>

            <button
              onClick={handleToggleLidar}
              className={"px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all " +
                (lidarEnabled
                  ? "bg-cyan-600/30 text-cyan-200 border-cyan-500/40 shadow-sm"
                  : "bg-white/5 text-[#A6A2AF] border-white/10 hover:text-white")}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{lidarEnabled ? "LiDAR 360° Bật" : "LiDAR Tắt"}</span>
            </button>

            <button
              onClick={handleToggleAutoRotate}
              className={"px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all " +
                (autoRotate
                  ? "bg-purple-600/30 text-purple-200 border-purple-500/40"
                  : "bg-white/5 text-[#A6A2AF] border-white/10 hover:text-white")}
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
            Kéo chuột để xoay 360° • Three.js WebGL 60FPS
          </div>
        </div>
      </div>
    </div>
  );
}
